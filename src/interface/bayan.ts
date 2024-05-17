import { ITruckTypes } from '@/interface/proposal';
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

export interface IShippingInfo{
  temprature:string;
  truckType:number;
  estimatedPickupDate: string;
  estimatedDropOffDate:string;
  fare:number;
}
export interface IProductType {
  productType: IGoodsType;
  name:string;
  price:number;
  quantity:number;
  weight:string;
}

export interface IGoodsType{
  id:number;
  name:string;
}