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
  estimatedPickupDate: string;
  estimatedDropOffDate: string;
  fare: number;
}
export interface IProductType {
  productTypeId: number;
  name: string;
  price: number;
  quantity: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  isCargoItemsStackable: boolean;
  isIncludingItemsARGood: boolean;
}

export interface IGoodsType {
  id: number;
  nameEnglish: string;
}

export interface ICreateBayan {
  receivedDate: string;
  expectedDeliveryDate: string;
  vehicleId: number;
  fare: number;
  tradable: boolean;
  senderName: string;
  senderPhone: string;
  senderCityId: number;
  senderAddress: string;
  recipientName: string;
  recipientPhone: string;
  recipientCityId: number;
  recipientAddress: string;
  itemUnitId: number;
  itemValid: boolean;
  itemQuantity: number;
  goodTypeId: number;
  weight: number;
  dimentions: string;
}

export interface TripData {
  id: number;
  tripId: number;
  data: string;
}

interface Waybill {
  Id: number;
  BayanId: number;
  WaybillId: number;
  SenderName: string;
  SenderFullAddress: string;
  RecipientName: string;
  RecipientFullAddress: string;
}

export interface TripData {
  Id: number;
  Waybills: Waybill[];
}
