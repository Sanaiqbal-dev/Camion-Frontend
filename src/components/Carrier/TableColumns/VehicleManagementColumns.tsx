import { ColumnDef } from '@tanstack/react-table';
import IconEdit from '../../../assets/icons/ic-edit.svg';
import IconDelete from '../../../assets/icons/ic-delete.svg';
import IconDriver from '../../../assets/icons/ic-driver.svg';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { IVehicle } from '../../../interface/carrier';

export const VehicleManagementColumns = ({
  assignDriver,
  editVehicle,
  deleteVehicle,
  onViewDocumentClick,
}: {
  assignDriver: (id: number) => void;
  editVehicle: (id: number) => void;
  deleteVehicle: (id: number) => void;
  onViewDocumentClick: (id: number) => void;
}): ColumnDef<IVehicle>[] => [
  {
    accessorKey: 'driverName',
    header: 'Driver Name',
    cell: ({ row }) => {
      return (
        <div
          className={clsx({
            'tw-text-red-600': !row.original.driver,
          })}>
          {row.original.driver ?? 'Driver Not Assign'}
        </div>
      );
    },
  },
  {
    accessorKey: 'vehicleType',
    header: 'Vehicle Type',
    cell: ({ row }) => {
      return <div>{row.original.vehicleType.typeName}</div>;
    },
  },
  {
    accessorKey: 'modelYear',
    header: 'Model Year',
  },
  {
    accessorKey: 'numberPlate',
    header: 'Vehihcle Number',
    cell: ({ row }) => {
      return <div>{row.original.numberPlate}</div>;
    },
  },
  {
    accessorKey: 'color',
    header: 'Color',
  },

  {
    accessorKey: 'registrationNumber',
    header: 'Registration Number',
  },

  {
    accessorKey: 'imeiNumber',
    header: 'IMEI Number',
  },

  {
    accessorKey: 'vehicleRegistration',
    header: 'Vehicle Registration',
    cell: ({ row }) => {
      const vehicleId = row.original.id;

      return (
        <div onClick={() => onViewDocumentClick(vehicleId)}>
          <Link to={''}>View Document</Link>
        </div>
      );
    },
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <div className="action-container" style={{ justifyContent: 'start' }}>
          <div
            onClick={() => {
              editVehicle(row.original.id);
            }}>
            <img src={IconEdit} />
            <span style={{ color: '#27AE60' }}>Edit</span>
          </div>
          <div onClick={() => deleteVehicle(row.original.id)}>
            <img src={IconDelete} />
            <span style={{ color: '#EB5757' }}>Delete</span>
          </div>
          <div
            id="assign-driver"
            onClick={() => {
              assignDriver(row.original.id);
            }}>
            <img src={IconDriver} />
            <span style={{ color: '#0060B8' }}>Assign Driver</span>
          </div>
        </div>
      );
    },
  },
];
