import { ColumnDef } from '@tanstack/react-table';
import IconSubmitted from '../../../assets/icons/ic-submitted.svg';
import { IRequest } from '../../../interface/carrier';
import { useTranslation } from 'react-i18next';

interface RequestActionProps {
  onSubmitProposal: (id: number) => void;
}

export const RequestColumns = ({ onSubmitProposal }: RequestActionProps): ColumnDef<IRequest>[] => {
  const { t } = useTranslation(['requestColumn']);

  return [
    {
      accessorKey: 'origin',
      header: t('origin'),
    },
    {
      accessorKey: 'destination',
      header: t('destination'),
    },
    {
      accessorKey: 'weight',
      header: t('weight'),
    },
    {
      accessorKey: 'dimentions',
      header: t('dimensions'),
    },
    {
      accessorKey: 'EDT',
      header: t('edt'),
    },
    {
      accessorKey: 'action',
      header: t('action'),
      cell: ({ row }) => {
        const isProposalSubmitted = row.original.isProposalSubmitted;

        return (
          <button
            onClick={() => !isProposalSubmitted && onSubmitProposal(row.original.id)}
            className={isProposalSubmitted ? 'proposal-btn submitted-proposal' : 'proposal-btn submit-proposal'}
            id="submit-proposal-btn">
            {isProposalSubmitted && <img src={IconSubmitted} />}
            {isProposalSubmitted ? t('proposalSubmitted') : t('submitProposal')}
          </button>
        );
      },
    },
  ];
};
