import { ColumnDef } from '@tanstack/react-table';
import IconShare from '../../../assets/icons/ic-file-earmark.svg';
import IconPrint from '../../../assets/icons/ic-printer.svg';
import { IBayanItem } from '../../../interface/carrier';

export const BayanColumns: ColumnDef<IBayanItem>[] = [
  {
    accessorKey: 'origin',
    header: 'Origin',
  },
  {
    accessorKey: 'destination',
    header: 'Destination',
  },
  {
    accessorKey: 'weight',
    header: 'Weight',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'ETA',
    header: 'ETA',
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: () => {
      return (
        <div className="action-container" style={{ justifyContent: 'start' }}>
          <div>
            <img src={IconShare} />
            <span style={{ color: '#27AE60' }}>Share</span>
          </div>
          <div style={{ marginLeft: '10px' }}>
            <img src={IconPrint} />
            <span style={{ color: '#F48031' }}>Print Bayan Bill</span>
          </div>
        </div>
      );
    },
  },
];
