import { ColumnDef } from '@tanstack/react-table';
import IconEdit from '../../../assets/icons/ic-edit.svg';
import IconDelete from '../../../assets/icons/ic-delete.svg';
import { IUserManagement } from '../../../interface/common';

interface UserActionsProps {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const UsersColumn = ({ onEdit, onDelete }: UserActionsProps): ColumnDef<IUserManagement>[] => [
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
          <div onClick={() => onEdit(row.original.userId)}>
            <img src={IconEdit} />
            <span style={{ color: '#27AE60' }}>Edit</span>
          </div>
          <div onClick={() => onDelete(row.original.userId)}>
            <img src={IconDelete} />
            <span style={{ color: '#EB5757' }}>Delete</span>
          </div>
        </div>
      );
    },
  },
];
