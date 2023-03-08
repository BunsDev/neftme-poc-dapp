export default class Challenge {
  private user: string;

  private user_challenged: string;

  private challenge_resource: string;

  private challenge_resource_type: string;

  private extra_description: string;

  private value: number;

  private hidden: boolean;


  constructor(
    user: string,
    user_challenged: string,
    challenge_resource: string,
    challenge_resource_type: string,
    extra_description: string,
    value: number,
    hidden: boolean
  ) {
    this.user = user;
    this.user_challenged = user_challenged;
    this.challenge_resource = challenge_resource;
    this.extra_description = extra_description;
    this.challenge_resource_type = challenge_resource_type;
    this.value = value;
    this.hidden = hidden;
  }

  setChallengeResourceType(challenge_resource_type: string) {
    this.challenge_resource_type = challenge_resource_type;
  }

  setUser(user: string) {
    this.user = user;
  }

  setUserChallenged(userChallenged: string) {
    this.user_challenged = userChallenged;
  }

  setChallengeResource(challenge_resource: string) {
    this.challenge_resource = challenge_resource;
  }

  setDescription(extra_description: string) {
    this.extra_description = extra_description;
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

  getChallengeResource(): string {
    return this.challenge_resource;
  }

  getChallengeResourceType(): string {
    return this.challenge_resource_type;
  }

  getDescription(): string {
    return this.extra_description;
  }

  getValue(): number {
    return this.value;
  }

  getHidden(): boolean {
    return this.hidden;
  }
}

