import { Pager } from "./common";
export interface IProposal {
  id: number;
  originBuildingNo: string;
  originStreetName: string;
  originCityId: number;
  originCity: IPlaces;
  originZipCode: string;
  originAdditionalNo: string;
  originUnitNo: string;
  originDistrictId: number;
  originDistrict:IPlaces
  destinationBuildingNo: string;
  destinationStreetName: string;
  destinationCityId: number;
  destinationCity:IPlaces;
  destinationZipCode: string;
  destinationAdditionalNo: string;
  destinationUnitNo: string;
  destinationDistrictId: number;
  destinationDistrict:IPlaces;
  shipmentTypeId: number;
  shipmentQuantity: number;
  length: number | null;
  width: number | null;
  height: number | null;
  isCargoItemsStackable: boolean;
  isIncludingItemsARGood: boolean;
  weight: string | null;
  createdBy: string | null;
  createdDate?: Date | null;
  updatedBy: string | null;
  updatedDate: Date | null;
  otherName?: string;
  dimensions: string;
  preferredDeliveryDate: Date | null;
  shipmentTruckType: IShipmentTruckType[];
  userId: string;
  proposalId: number;
}

export interface IProposalDetailResponseData extends IProposal {
  shipmentTypes: IShipmentType;
  createdById: string;
  updatedById: string | null;
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
  isIncludingItemsARGood?: boolean | undefined;
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


export interface IProposalResponseData{
  id: number;
  origin:string;
  destination:string;
  weight: string;
  dimentions:string;
  estimatedDeliveryTime: string|null;
  hasSubmitedByMe: boolean;
}
export interface ProposalResult {
  total: number;
  currentPage: number;
  showCount: number;
  pageCount: number;
  result: IProposalResponseData[] ;
}
export interface IProposalResponseObject {
  statusCode: number;
  result: ProposalResult;
  message?: string;
  data?: any;
}
export interface IProposalDetailResponse {
  statusCode: number;
  result: IProposalDetailResponseData;
}
export interface ProposalIndexQuery extends Pager {
  createdById: number;
  updatedById: number;
}
export interface IProposalSearch {
  id?: number;
  searchTerm?: string;
}

export interface ITruckShipmentDetails {
  id: number;
  noOfTrucks: number;
  truckTypeId: number;
  proposalId: number;
}

export interface IPlacesResponseObject {
  statusCode: number;
  result: IPlaces[];
}
export interface IPlaces{
  id:number;
  name:string;
}