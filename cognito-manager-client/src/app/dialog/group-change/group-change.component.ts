import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatCheckboxModule } from '@angular/material';

@Component({
  selector: 'app-group-change',
  templateUrl: './group-change.component.html',
  styleUrls: ['./group-change.component.css']
})
export class GroupChangeComponent implements OnInit {

	constructor(
		@Inject(MAT_DIALOG_DATA) public data : any,
		public matDialogRef : MatDialogRef<GroupChangeComponent>) { }

	ngOnInit() {
		console.dir(this);
		console.log(this.data.groupArr);
	}

	onClickOkButton() : void {
		this.matDialogRef.close('OK!');
	}

}
