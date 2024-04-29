import { CommonSelect, Pager, IFile } from './common';
export interface IOrder {

		id:	number;
		proposalId:	number;
		vehicleAssignedById?:	number;
		vehicleId:	number;
		orderStatusId:	number;

}

export interface IOrderIndex extends IOrder {

		 orderLabel: string;
		 proposalLabel:	any;
		 aspNetUserLabel?:	any;
		 vehicleLabel:	any;
		 orderStatusLabel:	any;

}

export interface IOrderSingle extends IOrder {

		 proposalLabel:	any;
		 aspNetUserLabel?:	any;
		 vehicleLabel:	any;
		 orderStatusLabel:	any;

}

export interface OrderPager extends Pager {
	results: IOrderIndex[];
}
export interface OrderIndexQuery extends Pager {
		 proposalId : 	number;
		 vehicleAssignedById : 	number;
		 vehicleId : 	number;
		 orderStatusId : 	number;

}
export interface IOrderSearch {
		id?:	number;
		searchTerm?:	string;


}