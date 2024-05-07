import { IAppUser, Pager } from "./common";
import { IOrderStatus } from "./orderStatus";
import { IProposal, IShipmentType } from "./proposal";
export interface IOrder {
  id: number;
  proposalId: number;
  proposal?: IProposal | null;
  vehicleId: number | null;
  vehicleAssignedById: string | null;
  appUser: IAppUser;
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
  orderCreatedBy: IAppUser;
  orderCreatedDate: string;
  orderUpdatedById: string | null;
  orderUpdatedBy: IAppUser;
  orderUpdatedDate: string;
  orderTruckShipmentdetail: string | null;
}

export interface IOrderDetailIndex extends IOrder {
  orderDetailId: number;
  orderDetailLabel: string;
  orderLabel: any;
  aspNetUserLabel?: any;
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
