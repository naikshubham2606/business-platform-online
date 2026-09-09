/**
 * TypeScript interfaces mirroring the backend business DTO shapes.
 *
 * These are derived directly from the Swagger schema at:
 *   GET https://localhost:44350/swagger/v1/swagger.json
 *
 * All string fields are nullable: true in the schema — reflected here.
 * Update this file if backend DTOs change.
 */

export interface BusinessProfileDto {
  /** Business display name. nullable in Swagger. */
  businessName: string | null;
  /** Short marketing description shown in hero / footer. nullable. */
  shortDescription: string | null;
  /** Longer about/overview text. nullable. */
  aboutDescription: string | null;
}

export interface BusinessBrandingDto {
  /** Business display name (duplicated in branding for convenience). nullable. */
  businessName: string | null;
  /** Relative or absolute path to the logo image. nullable. */
  logoPath: string | null;
  /** Relative or absolute path to the favicon image. nullable. */
  faviconPath: string | null;
  /** Marketing tagline. nullable. */
  tagline: string | null;
}

export interface BusinessContactDto {
  phoneNumber: string | null;
  alternatePhone: string | null;
  email: string | null;
  websiteUrl: string | null;
  addressLine: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  whatsAppNumber: string | null;
}
