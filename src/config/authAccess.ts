export type Action = 'view' | 'edit' | 'add' | 'delete' | 'upload' | 'detail';

type ObjectAccessRights = {
  [object: string]: Action[];
};

type AccessRights = {
  [scope: string]: ObjectAccessRights;
};

export const accessRights: AccessRights = {
  aspNetUser: {
    vehicle: ['view', 'edit', 'add', 'delete', 'upload', 'detail'],
    aspNetUser: ['view', 'edit', 'add', 'delete', 'upload', 'detail'],
    driver: ['view', 'edit', 'add', 'delete', 'upload', 'detail'],
    company: ['view', 'edit', 'add', 'delete', 'upload', 'detail'],
    driverAssignment: ['view', 'edit', 'add', 'delete', 'upload', 'detail'],
    orderDetail: ['view', 'edit', 'add', 'delete', 'upload', 'detail'],
    fileType: ['view', 'edit', 'add', 'delete', 'upload', 'detail'],
    order: ['view', 'edit', 'add', 'delete', 'upload', 'detail'],
    orderStatus: ['view', 'edit', 'add', 'delete', 'upload', 'detail'],
    orderVehicleTracking: ['view', 'edit', 'add', 'delete', 'upload', 'detail'],
    proposalQuotation: ['view', 'edit', 'add', 'delete', 'upload', 'detail'],
    proposal: ['view', 'edit', 'add', 'delete', 'upload', 'detail'],
  },
};
