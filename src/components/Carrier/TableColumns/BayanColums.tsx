import { ColumnDef } from '@tanstack/react-table';
import IconShare from '../../../assets/icons/ic-file-earmark.svg';
import IconPrint from '../../../assets/icons/ic-printer.svg';
import { IBayanItem } from '../../../interface/carrier';
import { useTranslation } from 'react-i18next';

interface BayanActionProps {
  onPrintBayan: (tripId: number) => void;
}

export const BayanColumns = ({ onPrintBayan }: BayanActionProps): ColumnDef<IBayanItem>[] => {
  const { t } = useTranslation(['bayanColumn']);
  return [
    {
      accessorKey: 'tripId',
      header: t('trip'),
    },
    {
      accessorKey: 'senderName',
      header: t('sender'),
    },
    {
      accessorKey: 'senderFullAddress',
      header: t('senderAddress'),
    },
    {
      accessorKey: 'recipientName',
      header: t('recipient'),
    },
    {
      accessorKey: 'recipientFullAddress',
      header: t('recipientAddress'),
    },
    {
      accessorKey: 'action',
      header: t('action'),
      cell: ({ row }) => {
        return (
          <div className="action-container" style={{ justifyContent: 'start' }}>
            <div>
              <img src={IconShare} />
              <span style={{ color: '#27AE60' }}>{t('share')}</span>
            </div>
            <div style={{ marginLeft: '10px' }} onClick={() => onPrintBayan(row.original.tripId)}>
              <img src={IconPrint} />
              <span style={{ color: '#F48031' }}>{t('printBayanBill')}</span>
            </div>
          </div>
        );
      },
    },
  ];
};
