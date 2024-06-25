import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import IconDownload from '../../../assets/icons/ic-download.svg';
import { IReport } from '@/interface/reports';
import { IDownloadState } from '@/interface/common';
import LoadingAnimation from '@/components/ui/LoadingAnimation';

interface ReportActionProps {
  onDownloadReport: (userId: string) => void;
  documentDownloading?: IDownloadState;
}

export const ReportsColumn = ({ onDownloadReport, documentDownloading }: ReportActionProps): ColumnDef<IReport>[] => {
  const { t } = useTranslation(['adminReportColumn']);

  return [
    {
      accessorKey: 'userType',
      header: t('userType'),
    },
    {
      accessorKey: 'name',
      header: t('shipperName'),
    },
    {
      accessorKey: 'contactNumber',
      header: t('contactNumber'),
    },
    {
      accessorKey: 'emailAddress',
      header: t('emailAddress'),
    },
    {
      accessorKey: 'noOfActiveOrders',
      header: t('noOfActiveOrders'),
    },
    {
      accessorKey: 'report',
      header: t('report'),
      cell: ({ row }) => {
        return documentDownloading?.status == true && documentDownloading?.id == row.original.userId ? (
          <LoadingAnimation />
        ) : (
          <button className="table-action-btn" style={{ backgroundColor: '#0060B81A' }} onClick={() => onDownloadReport(row.original.userId)}>
            <img src={IconDownload} />
            <span style={{ color: '#0060B8' }}>{t('downloadReport')}</span>
          </button>
        );
      },
    },
  ];
};
