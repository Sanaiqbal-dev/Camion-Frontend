import { ColumnDef } from '@tanstack/react-table';
import DeleteIcon from '../../../assets/icons/ic-delete.svg';
import EditIcon from '../../../assets/icons/ic-edit.svg';
import { IUserManagement } from '../../../interface/common';

interface UserActionsProps {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}
export const UserManagementShipperColumns = ({ onEdit, onDelete }: UserActionsProps): ColumnDef<IUserManagement>[] => [
  {
    accessorKey: 'userName',
    header: 'User Name',
    cell: ({ row }) => {
      return <div>{row.original.fullName}</div>;
    },
  },
  {
    accessorKey: 'email',
    header: 'Email Address',
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <div className="action-container" style={{ justifyContent: 'start' }}>
          <div onClick={() => onEdit(row.original.id)}>
            <img src={EditIcon} />
            <span style={{ color: '#27AE60' }}>Edit</span>
          </div>
          <div onClick={() => onDelete(row.original.id)}>
            <img src={DeleteIcon} />
            <span style={{ color: '#EB5757' }}>Delete</span>
          </div>
        </div>
      );
    },
  },
];
