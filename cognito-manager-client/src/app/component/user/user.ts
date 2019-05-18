export class User {
  Username: string;
  Attributes: [{
    sub: string,
    email_verified: boolean,
    email: string
  }];
  UserStatus: string;
  Enabled: boolean;
  UserCreateDate: Date;
  UserLastModifiedDate: Date;
  GroupName: string;
  Groups: Group[];
}

export class Group {
  GroupName: string;
  CreationDate: Date;
  LastModifiedDate: Date;
}