import { Pager } from './common';
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
  destinationDistrictName : string;
  shipmentType: string;
  weight: string;
  dimensions: string;
  preferredDeliveryDate: Date;
  createdById?: number;
  createdDate: Date;
  updatedById?: number;
  updatedDate: Date;
}

export interface IShipmentType {
  id: number;
  shipmentTypeName: string;
}
export interface ITruckTypes{
  id: number:
  name:string;
}


export interface IProposalIndex extends IProposal {

		 proposalLabel: string;
		 aspNetUserLabel?:	any;

}

export interface IProposalSingle extends IProposal {

		 aspNetUserLabel?:	any;

}

export interface ProposalPager extends Pager {
	results: IProposalIndex[];
}
export interface ProposalIndexQuery extends Pager {
		 createdById : 	number;
		 updatedById : 	number;

}
export interface IProposalSearch {
		id?:	number;
		searchTerm?:	string;


}