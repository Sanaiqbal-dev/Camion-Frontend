import { ColumnDef } from '@tanstack/react-table';
import IconEdit from '../../../assets/icons/ic-edit.svg';
import IconDelete from '../../../assets/icons/ic-delete.svg';
import { Link } from 'react-router-dom';
import { IDriver } from '../../../interface/carrier';

interface DriverActionProps {
  onDeleteDriver: (id: number) => void;
  onUpdateDriver: (id: number) => void;
  onIqamaDownloadClick: (id: number) => void;
}

export const DriverManagementColumns = ({ onDeleteDriver, onUpdateDriver, onIqamaDownloadClick }: DriverActionProps): ColumnDef<IDriver>[] => [
  {
    accessorKey: 'name',
    header: 'Driver Name',
  },
  {
    accessorKey: 'iqamaId',
    header: 'Driver ID/Iqama',
  },
  {
    accessorKey: 'licenseNumber',
    header: 'License Number',
  },
  {
    accessorKey: 'dob',
    header: 'Date Of Birth',
  },
  {
    accessorKey: 'nationality',
    header: 'Nationality',
  },

  {
    accessorKey: 'phoneNumber',
    header: 'Mobile Number',
  },

  {
    accessorKey: 'viewIqama',
    header: 'Iqama/Id',
    cell: ({ row }) => {
      const driverId = row.original.id;

      return (
        <div onClick={() => onIqamaDownloadClick(parseInt(driverId))}>
          <Link to={''}>View Iqama/ID</Link>
        </div>
      );
    },
  },

  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const driverId = row.original.id;
      return (
        <div className="action-container" style={{ justifyContent: 'start' }}>
          <div onClick={() => onUpdateDriver(parseInt(driverId))}>
            <img src={IconEdit} />
            <span style={{ color: '#27AE60' }}>Edit</span>
          </div>
          <div onClick={() => onDeleteDriver(parseInt(driverId))}>
            <img src={IconDelete} />
            <span style={{ color: '#EB5757' }}>Delete</span>
          </div>
        </div>
      );
    },
  },
];
