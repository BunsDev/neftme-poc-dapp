// eslint-disable-next-line import/prefer-default-export
export class NFTModelClass {
  private resource: string;

  private resource_type: string;

  private location: string;

  private description: string;

  // IF IMAGE == NULL
  // IF VIDEO == THUMBNAIL OF VIDEO
  // IF AUDIO == DEFAULT IMAGE
  private extraResource: string;

  private communityPercentage: number;

  constructor(
    resource: string,
    resource_type: string,
    location: string,
    description: string,
    extraResource: string,
    communityPercentage: number
  ) {
    this.resource = resource;
    this.resource_type = resource_type;
    this.location = location;
    this.description = description;
    this.extraResource = extraResource;
    this.communityPercentage = communityPercentage;
  }

  setCommunityPercentage(percentage: number) {
    this.communityPercentage = percentage;
  }

  setResource(resource: string) {
    this.resource = resource;
  }

  setResourceType(resourceType: string) {
    this.resource_type = resourceType;
  }

  setLocation(location: string) {
    this.location = location;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setExtraResource(extraResource: string) {
    this.extraResource = extraResource;
  }

  getResource(): string {
    return this.resource;
  }

  getResourceType(): string {
    return this.resource_type;
  }

  getLocation(): string {
    return this.location;
  }

  getDescription(): string {
    return this.description;
  }

  getextraResource(): string {
    return this.extraResource;
  }

  getCommunityPercentage(): number {
    return this.communityPercentage;
  }
}
