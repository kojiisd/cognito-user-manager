import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatCheckboxModule, MatTableDataSource } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';


import { UserService } from './../../user/user.service';
import { AuthService } from './../../auth/auth.service';
import { User, Group } from './user';
import { GroupChangeComponent } from './../../dialog/group-change/group-change.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private token: string;
  users: User[];
  groups: Group[];
  group: string;
  group_result: string;
  displayedColumns = ['No', 'ID', 'Email', 'Enable', 'Status', 'Group', 'CreatedDate', 'UpdatedDate', 'Operation'];

  constructor(
    private userService: UserService,
    private auth: AuthService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.auth.getIdToken().then(res => {
      this.token = res.signInUserSession.idToken.jwtToken;
        this.userService.getGroups(this.token).subscribe(result => {
          this.groups = result;
        });
      });

  }

  User(): void {
    if (!this.group) {
      alert("グループを選択してください。");
      return;
    }
    this.userService.getUsers(this.token, this.group).subscribe(result => {
      this.users = result;
      this.users.forEach((user, index) => {
          // user.GroupName = this.group;
          if (!user.Groups || Object.keys(user.Groups).length == 0) {
            user.GroupName = "-";
          } else {
            user.GroupName = "";
            user.Groups.forEach((group, index) => {
              user.GroupName += "," + group.GroupName;
            });
            user.GroupName = user.GroupName.slice(1);
          }
        });
    });
  }

  Approve(user): void {
    if(confirm("ユーザ：" + user.Username + "を承認しますか？")) {
      this.userService.approveUser(user.Username, this.token).subscribe(res => {
        if(res['HTTPStatusCode'] == 200) {
          alert("承認が成功しました。");
          user['UserStatus'] = "CONFIRMED";
        } else {
          alert("承認中にエラーが発生しました。再度承認処理を行ってください。");
        }
      });
    }
  }

  Enable(user): void {
    if(confirm("ユーザ：" + user.Username + "を有効化しますか？")) {
      this.userService.enableUser(user.Username, this.token).subscribe(res => {
        if(res['HTTPStatusCode'] == 200) {
          alert("有効化が成功しました。");
          user['Enabled'] = true;
        } else {
          alert("有効化中にエラーが発生しました。再度有効化処理を行ってください。");
        }
      });
    }
  }

  Disable(user): void {
    if(confirm("ユーザ：" + user.Username + "を無効化しますか？")) {
      this.userService.disableUser(user.Username, this.token).subscribe(res => {
        if(res['HTTPStatusCode'] == 200) {
          alert("無効化が成功しました。");
          user['Enabled'] = false;
        } else {
          alert("無効化中にエラーが発生しました。再度無効化処理を行ってください。");
        }
      });
    }
  }

  Delete(user, index): void {
    if(confirm("ユーザ：" + user.Username + "を削除しますか？")) {
      this.userService.deleteUser(user.Username, this.token).subscribe(res => {
        if(res['HTTPStatusCode'] == 200) {
          alert("削除が成功しました。");
          this.users.splice(index, 1);
        } else {
          alert("無効化中にエラーが発生しました。再度無効化処理を行ってください。");
        }
      });
    }
  }

  GroupChange(groups): void {
    let groupNameArr = [];
    if (groups) {
      for (let group of groups) {
        groupNameArr.push(group.GroupName);
      }
    }

    console.log(groupNameArr);
    let dialog = this.matDialog.open(GroupChangeComponent, {
      'data' : {'groupArr': groupNameArr,
                'allGroups': this.groups },
			'height' : '300px',
			'width' : '400px',
			'disableClose' : false
		});
		dialog.afterClosed().subscribe( (result) => {
			console.log('afterClosed');
			console.log(result);
			this.group_result = result;
		});
  }

}
