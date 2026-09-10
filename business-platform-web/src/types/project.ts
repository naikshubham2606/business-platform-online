export interface ProjectServiceSummaryDto {
  id: number;
  name: string | null;
  slug: string | null;
}

export interface ProjectListDto {
  id: string; // uuid
  title: string | null;
  slug: string | null;
  shortDescription: string | null;
  primaryImageUrl: string | null;
  primaryImageAltText: string | null;
  services: ProjectServiceSummaryDto[] | null;
}

export interface ProjectImageDto {
  id: number;
  imageUrl: string | null;
  altText: string | null;
  isPrimary: boolean;
  displayOrder: number;
}

export interface ProjectDetailsDto {
  id: string;
  title: string | null;
  slug: string | null;
  shortDescription: string | null;
  description: string | null;
  location: string | null;
  completionDate: string | null;
  isFeatured: boolean;
  images: ProjectImageDto[] | null;
  services: ProjectServiceSummaryDto[] | null;
}
