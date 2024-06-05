export interface Iprofiles {
  id: string;
  profileType: string;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  company: string;
  crDocument: IFileResponseData[];
  status: string | undefined;
  action?: string;
}

export interface IOrder {
  id: number;
  assignedCarrier: string;
  origin: string;
  destination: string;
  weight: string;
  dimentions: string;
  ETA: string;
  status: string;
  action: string;
}

// export interface IReport{
//   id:number;
//   userType:string;
//   shipperName:string;
//   contact: string;
//   email:string;
//   activeOrders:number;
//   report:string;

// }
export interface IAdminUser {
  id: string;
  userName: string;
  email: string;
  password: string;
  action: string;
}

export interface IFileResponseData {
  absolutePath: string;
  createdById: string;
  fileName: string;
  fileTypeId: number;
  id: number;
  relativePath: string;
}
export interface IProfileResponseData {
  companyAccountStatus: number;
  companyId: number;
  companyName: string;
  contactNumber: string | null;
  emailAddress: string;
  files: IFileResponseData[];
  firstName: string;
  isCompanyAccountActive: boolean;
  lastName: string;
  profiletype: string | null;
  userId: string;
}
export interface ICreateSubUserResponse {
  error?: {
    data?: {
      errors?: Array<{
        code: string;
        description: string;
      }>;
      statusCode?: number;
    };
    status?: number;
  };
  data?: any;
}

export interface ISubUser {
  userId: string;
  fullName: string;
  email: string;
}
