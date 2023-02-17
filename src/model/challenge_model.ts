export default class Challenge {
  private user: string;

  private user_challenged: string;

  private nft: string;

  private description: string;

  private value: number;

  private hidden: boolean;


  constructor(
    user: string,
    user_challenged: string,
    nft: string,
    description: string,
    value: number,
    hidden: boolean
  ) {
    this.user = user;
    this.user_challenged = user_challenged;
    this.nft = nft;
    this.description = description;
    this.value = value;
    this.hidden = hidden;
  }

  getUser(): string {
    return this.user;
  }

  getUserChallenged(): string {
    return this.user_challenged;
  }

  getNft(): string {
    return this.nft;
  }

  getDescription(): string {
    return this.description;
  }

  getValue(): number {
    return this.value;
  }

  getHidden(): boolean {
    return this.hidden;
  }
}

