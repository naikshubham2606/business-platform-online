export interface AboutUsHighlightDto {
  id: number;
  title: string | null;
  description: string | null;
  icon: string | null;
  displayOrder: number;
}

export interface AboutUsValueDto {
  id: number;
  title: string | null;
  description: string | null;
  icon: string | null;
  displayOrder: number;
}

export interface AboutUsStatisticDto {
  id: number;
  label: string | null;
  value: string | null;
  suffix: string | null;
  description: string | null;
  displayOrder: number;
}

export interface AboutUsDto {
  heroImageUrl: string | null;
  heroImageAltText: string | null;
  introductionTitle: string | null;
  introduction: string | null;
  storyTitle: string | null;
  story: string | null;
  missionTitle: string | null;
  mission: string | null;
  visionTitle: string | null;
  vision: string | null;
  approachTitle: string | null;
  approach: string | null;
  experienceTitle: string | null;
  experienceText: string | null;
  closingTitle: string | null;
  closingText: string | null;
  highlights: AboutUsHighlightDto[] | null;
  values: AboutUsValueDto[] | null;
  statistics: AboutUsStatisticDto[] | null;
}
