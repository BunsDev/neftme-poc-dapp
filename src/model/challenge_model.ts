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

  setUser(user: string) {
    this.user = user;
  }

  setUserChallenged(userChallenged: string) {
    this.user_challenged = userChallenged;
  }

  setNFT(nft: string) {
    this.nft = nft;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setValue(value: number) {
    this.value = value;
  }

  setHidden(hidden: boolean) {
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

