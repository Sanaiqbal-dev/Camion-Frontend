import { useTranslation } from 'react-i18next';
import { ColumnDef } from '@tanstack/react-table';
import DeleteIcon from '../../../assets/icons/ic-delete.svg';
import EditIcon from '../../../assets/icons/ic-edit.svg';
import ProposalIcon from '../../../assets/icons/ic-proposal.svg';
import { IRequestTable } from '@/interface/shipper';

interface RequestActionsProps {
  onEdit: (proposalItemId: number) => void;
  onDelete: (proposalItemId: number) => void;
  onProposalList: (proposalItemId: number) => void;
}

export const RequestColumns = ({ onEdit, onDelete, onProposalList }: RequestActionsProps): ColumnDef<IRequestTable>[] => {
  const { t } = useTranslation(['requestColumns', 'common']);

  return [
    {
      accessorKey: 'origin',
      header: t('common:originHeader'),
    },
    {
      accessorKey: 'destination',
      header: t('common:destinationHeader'),
    },
    {
      accessorKey: 'weight',
      header: t('common:weightHeader'),
    },
    {
      accessorKey: 'dimentions',
      header: t('common:dimensionHeader'),
    },
    {
      accessorKey: 'ETA',
      header: t('common:etaHeader'),
    },
    {
      accessorKey: 'action',
      header: t('common:actionHeader'),
      cell: ({ row }) => {
        return (
          <div className="action-container" style={{ justifyContent: 'start', gap: '20px' }}>
            <div onClick={() => onEdit(row.original.id)}>
              <img src={EditIcon} alt={t('editAction')} />
              <span style={{ color: '#27AE60' }}>{t('editAction')}</span>
            </div>
            <div onClick={() => onDelete(row.original.id)}>
              <img src={DeleteIcon} alt={t('common:deleteAction')} />
              <span style={{ color: '#EB5757' }}>{t('common:deleteAction')}</span>
            </div>
            <div onClick={() => onProposalList(row.original.id)}>
              <img src={ProposalIcon} alt={t('proposalsAction')} />
              <span style={{ color: '#F2994A' }}>{t('proposalsAction')}</span>
            </div>
          </div>
        );
      },
    },
  ];
};
