export class User{
  public email: string;
  public password: string;
  public username: string;
  public orderValue: number;
  public id: string;


  constructor(email: string, password: string, username: string, orderValue: number, id: string) {
    this.email = email;
    this.password = password;
    this.username = username;
    this.orderValue = orderValue;
    this.id = id;

  }
}
