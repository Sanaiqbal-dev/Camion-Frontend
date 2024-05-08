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
  id: number;
  driverName: string;
  driverId: string;
  licenseNumber: string;
  DOB: string;
  nationality: string;
  mobileNumber: string;
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
};

export type IVehicle = {
  id: string;
  driverName: string;
  vehicleType: string;
  modelYear: string;
  vehicleNumber: string;
  color: string;
  registrationNumber: string;
  IMEINumber: string;
  vehicleRegistration: string;
  action: string;
};

export type IOrder = {
  id: string;
  origin: string;
  destination: string;
  weight: string;
  dimentions: string;
  ETA: string;
  status: string;
  action: string;
};
