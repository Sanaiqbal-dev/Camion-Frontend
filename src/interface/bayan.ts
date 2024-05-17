export interface IBayan {}
export interface ILocation {
  name: string;
  phoneNumber: string;
  buildingNumber: string;
  streetName: string;
  districtId: number;
  cityId: number;
  zipCode: number;
  additionalNumber?: number;
  unitNo?: string;
}

export interface IShippingInfo {
  shipmentType: number;
  temprature: string;
  estimatedPickupDate: string;
  estimatedDropOffDate: string;
  fare: number;
}
export interface IProductType {
  productType: IGoodsType;
  name: string;
  price: number;
  quantity: number;
  weight: string;
}

export interface IGoodsType {
  id: number;
  name: string;
}
