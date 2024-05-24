import { ColumnDef } from '@tanstack/react-table';
import IconDelete from '../../../assets/icons/ic-delete.svg';
import { IOrder } from '../../../interface/admin';
import { useGetOrderStatusesQuery } from '@/services/orderStatus';
import { DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { DropdownMenu, Button } from 'react-bootstrap';

interface OrderActionsProps {
  onDelete: (orderItemId: number) => void;
  onUpdateStatus: (id: number, statusId: number) => void;
}
export const OrderColumns = ({ onDelete, onUpdateStatus }: OrderActionsProps): ColumnDef<IOrder>[] => [
  {
    accessorKey: 'assignedCarrier',
    header: 'Assigned Carrier',
  },
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
    accessorKey: 'dimentions',
    header: 'Dimensions',
  },
  {
    accessorKey: 'ETA',
    header: 'ETA',
  },

  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const item = row.original;
     
      const { data: orderStatuses } = useGetOrderStatusesQuery();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              {/* <span className="sr-only tw-flex tw-gap-1">{item.status ? item.status : noItemSeleted}</span> */}
              {item.status}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="tw-flex tw-flex-col tw-gap-2 tw-p-2" align="end">
              {orderStatuses &&
                orderStatuses.result.map((statusItem: any) => {
                  return (
                    <DropdownMenuItem
                      key={statusItem.id}
                      defaultValue={item.status && item.status}
                      className="hover:tw-bg-black hover:tw-text-white"
                      onClick={() => onUpdateStatus(item.id, statusItem.id)}>
                      {statusItem.description}
                    </DropdownMenuItem>
                  );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <div className="action-container" style={{ justifyContent: 'start' }}>
          <div onClick={() => onDelete(row.original.id)}>
            <img src={IconDelete} />
            <span style={{ color: '#EB5757' }}>Delete</span>
          </div>
        </div>
      );
    },
  },
];
