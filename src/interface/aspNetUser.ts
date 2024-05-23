import { Pager } from './common';
export interface IAspNetUser {
  id: number;
  firstName: string;
  passwordHash?: string;
  lastName: string;
  isVerified: boolean;
  companyId?: number;
  securityStamp?: string;
  email?: string;
  normalizedEmail?: string;
  emailConfirmed: boolean;
  userName?: string;
  concurrencyStamp?: string;
  normalizedUserName?: string;
  phoneNumber?: string;
  twoFactorEnabled: boolean;
  lockoutEnd?: string;
  phoneNumberConfirmed: boolean;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  role?: string;
}

export interface IAspNetUserIndex extends IAspNetUser {
  aspNetUserLabel: string;
  companyLabel?: any;
}

export interface IAspNetUserSingle extends IAspNetUser {
  companyLabel?: any;
}

export interface AspNetUserPager extends Pager {
  results: IAspNetUserIndex[];
}
export interface AspNetUserIndexQuery extends Pager {
  companyId: number;
}
export interface IAspNetUserSearch {
  id?: number;
  searchTerm?: string;
}
export interface AspNetUserLoginRequest {
  username: string;
  password: string;
}

export interface AspNetUserLoginResponse {
  user: IAspNetUser;
  token: string;
}

export interface ILoginResponse {
  token: string;
  expiration: string;
  isCompanyAccount: boolean;
  role: 'Admin' | 'Carrier' | 'Shipper';
  userId: string;
  message: string;
}

export interface AspNetUserProfile {
  id: string;
  firstName: string;
  passwordHash?: string;
  lastName: string;
  isVerified: boolean;
  companyId?: number;
  securityStamp?: string;
  email?: string;
  normalizedEmail?: string;
  emailConfirmed: boolean;
  userName?: string;
  concurrencyStamp?: string;
  normalizedUserName?: string;
  phoneNumber?: string;
  twoFactorEnabled: boolean;
  lockoutEnd?: string;
  phoneNumberConfirmed: boolean;
  lockoutEnabled: boolean;
  accessFailedCount: number;
}
