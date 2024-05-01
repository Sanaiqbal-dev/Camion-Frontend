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
  role: "Admin"|"Carrier"|"Shipper";
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
