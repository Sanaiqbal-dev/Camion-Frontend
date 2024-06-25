import { useTranslation } from 'react-i18next';
import { ColumnDef } from '@tanstack/react-table';
import DeleteIcon from '../../../assets/icons/ic-delete.svg';
import EditIcon from '../../../assets/icons/ic-edit.svg';
import { IUserManagement } from '../../../interface/common';

interface UserActionsProps {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const UserManagementShipperColumns = ({ onEdit, onDelete }: UserActionsProps): ColumnDef<IUserManagement>[] => {
  const { t } = useTranslation(['userColumn']);

  return [
    {
      accessorKey: 'userName',
      header: t('userName'),
      cell: ({ row }) => {
        return <div>{row.original.fullName}</div>;
      },
    },
    {
      accessorKey: 'email',
      header: t('emailAddress'),
    },
    {
      accessorKey: 'action',
      header: t('action'),
      cell: ({ row }) => {
        return (
          <div className="action-container" style={{ justifyContent: 'start' }}>
            <div onClick={() => onEdit(row.original.userId)}>
              <img src={EditIcon} />
              <span style={{ color: '#27AE60' }}>{t('edit')}</span>
            </div>
            <div onClick={() => onDelete(row.original.userId)}>
              <img src={DeleteIcon} />
              <span style={{ color: '#EB5757' }}>{t('delete')}</span>
            </div>
          </div>
        );
      },
    },
  ];
};

export default UserManagementShipperColumns;
