import { Pager } from './common';
export interface IOrderDetail {

		id:	number;
		orderId:	number;
		originBuildingNo:	string;
		originStreetName:	string;
		originCityName:	string;
		originZipCode:	string;
		originAdditionalNo:	string;
		originUnitNo:	string;
		destinationBuildingNo:	string;
		destinationStreetName:	string;
		destinationCityName:	string;
		destinationZipCode:	string;
		destinationAdditionalNo:	string;
		destinationUnitNo:	string;
		shipmentType:	string;
		weight:	string;
		dimensions:	string;
		orderAcceptedDateTime:	Date;
		orderAcceptedById?:	number;

}

export interface IOrderDetailIndex extends IOrderDetail {

		 orderDetailId: number;
		 orderDetailLabel: string;
		 orderLabel:	any;
		 aspNetUserLabel?:	any;

}

export interface IOrderDetailSingle extends IOrderDetail {

		 orderLabel:	any;
		 aspNetUserLabel?:	any;

}

export interface OrderDetailPager extends Pager {
	results: IOrderDetailIndex[];
}
export interface OrderDetailIndexQuery extends Pager {
		 orderId : 	number;
		 orderAcceptedById : 	number;

}
export interface IOrderDetailSearch {
		id?:	number;
		searchTerm?:	string;


}