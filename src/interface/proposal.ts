import { Pager } from "./common";
export interface IProposal {
  id: number;
  originBuildingNo: string;
  originStreetName: string;
  originCityName: string;
  originZipCode: string;
  originAdditionalNo: string;
  originUnitNo: string;
  originDistrictName: string;
  destinationBuildingNo: string;
  destinationStreetName: string;
  destinationCityName: string;
  destinationZipCode: string;
  destinationAdditionalNo: string;
  destinationUnitNo: string;
  destinationDistrictName: string;
  shipmentTypeId: number;
  shipmentQuantity: number;
  length: number|null;
  width: number|null;
  height: number|null;
  isCargoItemsStackable: boolean;
  isIncludingItemsADRGood: boolean;
  weight: string|null;
   createdBy: string|null;
  createdDate?: Date|null;
  updatedBy: string|null;
  updatedDate:Date|null;
  otherName?: string;
  dimensions: string;
  preferredDeliveryDate: Date|null;
  shipmentTruckType:IShipmentTruckType[];
  userId:string;
  proposalId:number;

}

export interface IProposalResponseData extends IProposal{
  shipmentTypes:IShipmentType;
  createdById: string;
  updatedById:string|null;    
  truckShipmentDetail: ITruckShipmentDetails;
}
export interface IShipmentTruckType {
  noOfTruck: number;
  truckTypeId: number;
}
export interface IShipmentType {
  id: number;
  shipmentTypeName: string;
}
export interface ITruckTypes {
  id: number;
  name: string;
}

export interface IShipmentDetails {
  numberOfPallets?: number | undefined;
  numberOfBoxes?: number | undefined;
  length?: number | undefined;
  width?: number | undefined;
  height?: number | undefined;
  weightPerItem?: string | undefined;
  shipmentTruckType?: IShipmentTruckType[] | undefined;
  otherType?: string | undefined;
  isCargoItemsStackable?: boolean | undefined;
  isIncludingItemsADRGood?: boolean | undefined;
}

export interface IProposalIndex extends IProposal {
  proposalLabel: string;
  aspNetUserLabel?: any;
}

export interface IProposalSingle extends IProposal {
  aspNetUserLabel?: any;
}

export interface ProposalPager extends Pager {
  results: IProposalIndex[];
}

export interface ProposalResult{
  total:number;
  currentPage:number;
  showCount:number;
  pageCount:number;
  result:IProposalResponseData[];
}
export interface IProposalResponseObject{
  statusCode:number;
  result: ProposalResult;
}
export interface ProposalIndexQuery extends Pager {
  createdById: number;
  updatedById: number;
}
export interface IProposalSearch {
  id?: number;
  searchTerm?: string;
}

export interface ITruckShipmentDetails{
  id:number;
  noOfTrucks:number;
  truckTypeId:number;
  proposalId:number;
}