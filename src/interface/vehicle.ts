export interface ICustomAPIRes<T> {
  result: T;
  statusCode: number;
}

interface IVehicleType {
  id: number;
  name: string;
}

export type TVehicleTypeList = IVehicleType[];
