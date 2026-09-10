export interface ServiceListDto {
  id: number;
  name: string | null;
  slug: string | null;
  shortDescription: string | null;
  primaryImageUrl: string | null;
}

export interface ServiceImageDto {
  id: number;
  imageUrl: string | null;
  altText: string | null;
  isPrimary: boolean;
  displayOrder: number;
}

export interface ServiceDetailsDto {
  id: number;
  name: string | null;
  slug: string | null;
  shortDescription: string | null;
  description: string | null;
  images: ServiceImageDto[] | null;
}
