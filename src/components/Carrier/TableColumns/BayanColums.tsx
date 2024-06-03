import { ColumnDef } from '@tanstack/react-table';
import IconShare from '../../../assets/icons/ic-file-earmark.svg';
import IconPrint from '../../../assets/icons/ic-printer.svg';
import { IBayanItem } from '../../../interface/carrier';

interface BayanActionProps {
  onPrintBayan: (tripId: number) => void;
}
export const BayanColumns = ({ onPrintBayan }: BayanActionProps): ColumnDef<IBayanItem>[] => [
  {
    accessorKey: 'tripId',
    header: 'Trip',
  },
  {
    accessorKey: 'senderName',
    header: 'Sender',
  },
  {
    accessorKey: 'senderFullAddress',
    header: 'Sender Address',
  },
  {
    accessorKey: 'recipientName',
    header: 'Recipient',
  },
  {
    accessorKey: 'recipientFullAddress',
    header: 'Recipient Address',
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <div className="action-container" style={{ justifyContent: 'start' }}>
          <div>
            <img src={IconShare} />
            <span style={{ color: '#27AE60' }}>Share</span>
          </div>
          <div style={{ marginLeft: '10px' }} onClick={() => onPrintBayan(row.original.tripId)}>
            <img src={IconPrint} />
            <span style={{ color: '#F48031' }}>Print Bayan Bill</span>
          </div>
        </div>
      );
    },
  },
];
