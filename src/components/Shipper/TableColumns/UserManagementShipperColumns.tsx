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
  const { t } = useTranslation(['userManagementShipperColumn']);

  return [
    {
      accessorKey: 'userName',
      header: t('userNameHeader'),
      cell: ({ row }) => {
        return <div>{row.original.fullName}</div>;
      },
    },
    {
      accessorKey: 'email',
      header: t('emailAddressHeader'),
    },
    {
      accessorKey: 'action',
      header: t('actionHeader'),
      cell: ({ row }) => {
        return (
          <div className="action-container" style={{ justifyContent: 'start' }}>
            <div onClick={() => onEdit(row.original.userId)}>
              <img src={EditIcon} alt={t('editAction')} />
              <span style={{ color: '#27AE60' }}>{t('editAction')}</span>
            </div>
            <div onClick={() => onDelete(row.original.userId)}>
              <img src={DeleteIcon} alt={t('deleteAction')} />
              <span style={{ color: '#EB5757' }}>{t('deleteAction')}</span>
            </div>
          </div>
        );
      },
    },
  ];
};

export default UserManagementShipperColumns;
