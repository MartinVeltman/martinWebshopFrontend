export class User{
  public email: string;
  public password: string;
  public username: string;
  public id: string;

  constructor(email: string, password: string, username: string, id: string) {
    this.email = email;
    this.password = password;
    this.username = username;
    this.id = id;

  }
}
