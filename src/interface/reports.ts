export interface IReport {
  userType: string | null;
  name: string;
  contactNumber: string;
  emailAddress: string;
  noOfActiveOrders: number;
  userId: string;
}
export interface IReportResponseObject {
  statusCode: number;
  result: IReport;
  message?: string;
  data?: any;
}
