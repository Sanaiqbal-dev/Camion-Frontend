import { IAppUser, Pager } from "./common";
import { IOrderStatus } from "./orderStatus";
import { IProposal, IShipmentType } from "./proposal";
export interface IOrder {
  id: number;
  proposalId: number;
  vehicleId: number | null;
  vehicleAssignedById: string | null;
  orderStatusId: number | null;
  orderStatus: IOrderStatus;
  orderDetailId: number | null;
  orderDetail: IOrderDetail;
  proposalQuotedById: string;
  orderCreatedById: string;
  isDeleted: boolean;
}

export interface IOrderDetail {
  id: number;
  orderId: number;
  originBuildingNo: string | null;
  originStreetName: string | null;
  originCityName: string | null;
  originZipCode: string | null;
  originAdditionalNo: string | null;
  originUnitNo: string | null;
  originDistrictName: string | null;
  destinationBuildingNo: string | null;
  destinationStreetName: string | null;
  destinationCityName: string | null;
  destinationZipCode: string | null;
  destinationAdditionalNo: string | null;
  destinationDistrictName: string | null;
  destinationUnitNo: string | null;
  shipmentTypeId: number | null;
  shipmentTypes: IShipmentType;
  shipmentQuantity: number | null;
  length: number | null;
  width: number | null;
  height: number | null;
  isCargoItemsStackable: boolean;
  isIncludingItemsARGood: boolean;
  weight: string | null;
  otherName: string | null;
  preferredDeliveryDate: string | null;
  orderCreatedById: string | null;
  orderCreatedDate: string;
  orderUpdatedById: string | null;
  orderUpdatedDate: string;
  orderTruckShipmentdetail: ITruckShipmentDetails | null;
}

export interface IOrderDetailIndex extends IOrder {
  orderDetailId: number;
  orderDetailLabel: string;
  orderLabel: any;
  aspNetUserLabel?: any;
}



export interface OrderResult {
  total: number;
  currentPage: number;
  showCount: number;
  result: IOrder[];
}
export interface IProposalResponseObject {
  statusCode: number;
  result: OrderResult;
  message?: string;
  data?: any;
}


export interface IOrderDetailSingle extends IOrder {
  orderLabel: any;
  aspNetUserLabel?: any;
}

export interface OrderDetailPager extends Pager {
  results: IOrderDetailIndex[];
}
export interface OrderDetailIndexQuery extends Pager {
  orderId: number;
  orderAcceptedById: number;
}
export interface IOrderDetailSearch {
  id?: number;
  searchTerm?: string;
}


export interface ITruckShipmentDetails {
  id: number;
  noOfTrucks: number;
  truckTypeId: number;
  orderId: number;
}