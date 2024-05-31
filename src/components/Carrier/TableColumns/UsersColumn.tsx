import { ColumnDef } from '@tanstack/react-table';
import IconEdit from '../../../assets/icons/ic-edit.svg';
import IconDelete from '../../../assets/icons/ic-delete.svg';
import { IUserManagement } from '../../../interface/common';
import { useTranslation } from 'react-i18next';

interface UserActionsProps {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const UsersColumn = ({ onEdit, onDelete }: UserActionsProps): ColumnDef<IUserManagement>[] => {
  const { t } = useTranslation(['userColumn']);

  return [
    {
      accessorKey: 'userName',
      header: t('userName'),
      cell: ({ row }) => {
        return <div>{row.original.userName}</div>;
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
              <img src={IconEdit} />
              <span style={{ color: '#27AE60' }}>{t('edit')}</span>
            </div>
            <div onClick={() => onDelete(row.original.userId)}>
              <img src={IconDelete} />
              <span style={{ color: '#EB5757' }}>{t('delete')}</span>
            </div>
          </div>
        );
      },
    },
  ];
};
