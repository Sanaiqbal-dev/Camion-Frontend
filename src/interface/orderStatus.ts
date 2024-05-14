import { Pager } from './common';
export interface IOrderStatus {
  id: number;
  description: string;
}

export interface IOrderStatusIndex extends IOrderStatus {
  orderStatusLabel: string;
}

export interface IOrderStatusSingle extends IOrderStatus {}

export interface OrderStatusPager extends Pager {
  results: IOrderStatusIndex[];
}
export interface OrderStatusIndexQuery extends Pager {}
export interface IOrderStatusSearch {
  id?: number;
  searchTerm?: string;
}

export interface IOrderStatusResponseObject {
  statusCode: number;
  result: IOrderStatus[];
}
