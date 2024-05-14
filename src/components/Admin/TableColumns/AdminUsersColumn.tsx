import { ColumnDef } from '@tanstack/react-table';
import IconEdit from '../../../assets/icons/ic-edit.svg';
import IconDelete from '../../../assets/icons/ic-delete.svg';
import { IUserManagement } from '@/interface/common';

interface AdminUserActionsProps {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const AdminUsersColumn = ({ onEdit, onDelete }: AdminUserActionsProps): ColumnDef<IUserManagement>[] => [
  {
    accessorKey: 'userName',
    header: 'User Name',
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
            <img src={IconEdit} />
            <span style={{ color: '#27AE60' }}>Edit</span>
          </div>
          <div onClick={() => onDelete(row.original.id)}>
            <img src={IconDelete} />
            <span style={{ color: '#EB5757' }}>Delete</span>
          </div>
        </div>
      );
    },
  },
];
