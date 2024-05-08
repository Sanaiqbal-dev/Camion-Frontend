export interface INewRequest {
  buildingNumber: string;
  streetName: string;
  districtName: string;
  cityName: string;
  zipCode: string;
  additionalNumber: string;
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
};

export type IOrderTable = {
  id: string;
  trackingId: string;
  origin: string;
  destination: string;
  weight: string;
  type: string;
  ETA: string;
  status: string;
  action: string;
};