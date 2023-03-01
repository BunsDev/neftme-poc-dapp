export default class UserModelClass {
  private username: string;


  constructor(
    username: string
  ) {
    this.username = username;
  }

  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }


}

