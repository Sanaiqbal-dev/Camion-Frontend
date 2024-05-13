export interface CommonSelect {
  value: string | number;
  label: string;
}

export interface QueryPager {
  page: number;
  pageSize: number;
}
export interface Pager extends QueryPager {
  total: number;
}

export interface SelectedObj {
  objName: string | undefined;
  openDrawer: boolean;
  openModal: boolean;
  showDelete: boolean;
  hasSelected: boolean;
  primaryKeys: Record<string, any>;
  label: string;
  child?: SelectedObj;
}

export type RelationshipType = "M2M" | "O2M" | "M2O" | "" | undefined;
export interface ChildObj {
  objName: string | undefined;
  openDrawer: boolean;
  hasSelected: boolean;
  filterKeys: Record<string, any>;
  label: string;
  type: RelationshipType;
  m2MSelectedValue: CommonSelect | undefined;
}
export interface ISessionUser {
  email: string;
  role: "Admin" | "Carrier" | "Shipper";
  userId: string;
}

export interface MenuItem {
  key: string;
  label: string;
  scope: string[];
  children?: MenuItem[];
  icon?: React.ReactNode;
}

export interface IFile {
  fileList: { originFileObj: File }[];
}

export interface ILanguage {
  code: string;
  dir: "rtl" | "ltr";
}

export interface IAPIResponse<T> {
  result: any;
  success: boolean;
  content: T;
  message: string;
  pageSize: number;
  pageNumber: number;
  total: number;
}
export interface IUserManagement {
  id: string;
  userName: string;
  email: string;
  action: string;
}

export interface IFile {
  id: number;
  description: string;
}

export interface IUploadFile {
  fileType?: number;
  uploadFile: string;
}

export interface IProposalForm {
  amount: string;
  delieveryDate: string;
  otherDetails: string;
  proposalQuotationId: number;
  proposalQuotationStatusId: number;
  fileName?: string;
  filePath: string;
  purposalId: number;
  userId: string;
}

interface IFileDownload {
  filePath: string;
  fileName: string;
  fileType?: number;
}
export interface ICompanyProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyAccountStatus?: number | null;
  isCompanyAccountActive?: boolean;
  password: string;
  confirmPassword: string;
  companyName: string;
  companyId?: number;
  deleteCompanyAccount?: boolean;
  fileDownload: IFileDownload[];
  userId: string;
}

export interface IDriver {
  id?: number;
  name: string;
  iqamaId: string;
  licenseNumber: string;
  dob: string;
  nationalityId: number;
  phoneNumber: string;
  fileName: string;
  filePath: string;
  driverId: number;
}
export interface IAppUser {
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  companyId: number;
  company: ICompany;
  isManager: boolean;
}

export interface ICompany {
  id: number;
  name: string;
  nameAr: string;
  createdDate: string;
  createdById: string;
  appUser: IAppUser;
}
export interface IUser {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IPassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
