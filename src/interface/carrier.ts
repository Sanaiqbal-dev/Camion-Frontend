export type IBayanItem = {
  id: string;
  origin: string;
  destination: string;
  weight: string;
  type: string;
  ETA: string;
  action: string;
};
export type IDriver = {
  id: string;
  name: string;
  driverId: string;
  licenseNumber: string;
  DOB: string;
  nationality: string;
  phoneNumber: string;
  viewIqama: string;
  action: string;
};
export type IRequest = {
  id: number;
  origin: string;
  destination: string;
  weight: string;
  dimentions: string;
  EDT: string;
  action: string;
  isProposalSubmitted?: boolean;
};

export type IVehicle = {
  id: number;
  driver: string;
  vehicleType: string;
  modelYear: string;
  vehicleNumber: string;
  color: string;
  registrationNumber: string;
  IMEINumber: string;
  vehicleRegistration: string;
  action: string;
  fileName?: string;
};

export type IOrderTable = {
  id: number;
  origin: string;
  destination: string;
  weight: string;
  dimentions: string;
  ETA: string;
  status: string;
  action: string;
};
