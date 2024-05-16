import { ColumnDef } from '@tanstack/react-table';
import IconDownload from '../../../assets/icons/ic-download.svg';
import { IReport } from '@/interface/reports';

interface ReportActionProps {
  onDownloadReport: (userId: string) => void;
}
export const ReportsColumn = ({ onDownloadReport }: ReportActionProps): ColumnDef<IReport>[] => [
  {
    accessorKey: 'userType',
    header: 'User Type',
  },
  {
    accessorKey: 'name',
    header: 'Shipper Name',
  },
  {
    accessorKey: 'contactNumber',
    header: 'Contact Number',
  },
  {
    accessorKey: 'emailAddress',
    header: 'Email Address',
  },
  {
    accessorKey: 'noOfActiveOrders',
    header: 'Number of Active Orders',
  },
  {
    accessorKey: 'report',
    header: 'Report',
    cell: ({ row }) => {
      return (
        <button className="table-action-btn" style={{ backgroundColor: '#0060B81A' }} onClick={() => onDownloadReport(row.original.userId)}>
          <img src={IconDownload} />
          <span style={{ color: '#0060B8' }}>Download Report</span>
        </button>
      );
    },
  },
];
