export interface MasterDataDto {
  id: number;
  name: string;
  description: string | null;
  displayOrder: number;
}

export interface MeasurementUnitDto extends MasterDataDto {
  shortName: string;
  unitType: string | null;
}

export interface QuoteRequestCreateDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  whatsAppNumber: string | null;
  preferredContactMethodId: number | null;

  propertyTypeId: number;
  propertySize: number | null;
  propertySizeUnitId: number | null;

  workAreaTypeId: number | null;
  workAreaLength: number | null;
  workAreaWidth: number | null;
  workAreaDimensionUnitId: number | null;

  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string | null;
  country: string;
  postalCode: string | null;

  projectDescription: string;
  existingSiteDescription: string | null;

  preferredStartDate: string | null; // ISO format date string
  urgencyTypeId: number | null;

  serviceIds: number[];
}

export interface QuoteRequestResponseDto {
  id: string;
  requestNumber: string;
  status: string;
  createdDateTime: string;
}
