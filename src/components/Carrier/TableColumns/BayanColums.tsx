import { ColumnDef } from '@tanstack/react-table';
import IconShare from '../../../assets/icons/ic-file-earmark.svg';
import IconPrint from '../../../assets/icons/ic-printer.svg';
import { IBayanItem } from '../../../interface/carrier';
import { useTranslation } from 'react-i18next';
import LoadingAnimation from '@/components/ui/LoadingAnimation';
import { IDownloadState } from '@/interface/common';

interface BayanActionProps {
  onPrintBayan: (tripId: number) => void;
  bayanDownloading: IDownloadState;
}

export const BayanColumns = ({ onPrintBayan, bayanDownloading }: BayanActionProps): ColumnDef<IBayanItem>[] => {
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
        const trip_ = row.original.tripId;
        return (
          <div className="action-container" style={{ justifyContent: 'start' }}>
            <div>
              <img src={IconShare} />
              <span style={{ color: '#27AE60' }}>{t('share')}</span>
            </div>
            {bayanDownloading?.status == true && bayanDownloading?.id == trip_ ? (
              <LoadingAnimation />
            ) : (
              <div style={{ marginLeft: '10px' }} onClick={() => onPrintBayan(row.original.tripId)}>
                <img src={IconPrint} />
                <span style={{ color: '#F48031' }}>{t('printBayanBill')}</span>
              </div>
            )}
          </div>
        );
      },
    },
  ];
};
