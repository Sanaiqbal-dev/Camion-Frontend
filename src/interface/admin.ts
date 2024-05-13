export interface Iprofiles {
  id: string;
  profileType: string;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  company: string;
  CRDocument: string;
  status: string;
  action: string;
}

export interface IOrder{
  id:number;
  assignedCarrier:string;
  origin:string;
  destination:string;
  weight:string;
  dimentions:string;
  ETA:string;
  status:string;
  action:string;
}

export interface IReport{
  id:String;
  userType:string;
  shipperName:string;
  contact: string;
  email:string;
  activeOrders:string;
  report:string;

}
export interface IAdminUser{
  id:String;
  userName:String;
  email:string;
  password:string;
  action:string;
}