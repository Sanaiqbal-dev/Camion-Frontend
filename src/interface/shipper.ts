export interface INewRequest {
  buildingNumber: string;
  streetName: string;
  districtId: number;
  cityId: number;
  zipCode: number;
  additionalNumber: number;
  unitNo: string;
}

export interface IRequestTable {
  id: number;
  origin: string;
  destination: string;
  weight: string;
  dimentions: string;
  ETA: string;
  action: string;
}

export type IOrderTable = {
  id: number;
  trackingId: string;
  origin: string;
  destination: string;
  weight: string;
  type: string;
  ETA: string;
  status: string;
  action: string;
};
