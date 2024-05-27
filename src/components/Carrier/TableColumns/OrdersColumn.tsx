import { ColumnDef } from '@tanstack/react-table';
import IconAssignVehicle from '../../../assets/icons/ic-vehicle.svg';
import IconDelete from '../../../assets/icons/ic-delete.svg';
import IconPrintBill from '../../../assets/icons/ic-printer.svg';
import IconDown from '../../../assets/icons/ic-down.svg';
import { IOrderTable } from '../../../interface/carrier';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../../../@/components/ui/dropdown-menu';
import { Button } from '../../../../@/components/ui/button';
import { IAPIResponse } from '@/interface/common';
import { IOrderStatus, IOrderStatusResponseObject } from '@/interface/orderStatus';
interface OrderActionsProps {
  onDelete: (orderItemId: number) => void;
  onAssignVehicle: (orderItem: IOrderTable) => void;
  onCreateBayan: (orderItemId: number) => void;
  onPrintBayan: (orderItemId: number) => void;
  onUpdateStatus: (id: number, statusId: number) => void;
  orderStatuses: IAPIResponse<IOrderStatusResponseObject[]> | undefined;
}
export const OrderColumns = ({ onDelete, onAssignVehicle, onCreateBayan, onPrintBayan, onUpdateStatus, orderStatuses }: OrderActionsProps): ColumnDef<IOrderTable>[] => [
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
      const noItemSeleted = (
        <>
          Select Status <img src={IconDown} />
        </>
      );

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only tw-flex tw-gap-1">
                {item.status ? (
                  <>
                    {item.status} <img src={IconDown} />
                  </>
                ) : (
                  noItemSeleted
                )}
              </span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="tw-flex tw-flex-col tw-gap-2 tw-p-2" align="end">
            {orderStatuses &&
              orderStatuses.result.map((statusItem: IOrderStatus) => {
                return (
                  <DropdownMenuItem className="hover:tw-bg-black hover:tw-text-white" onClick={() => onUpdateStatus(item.id, statusItem.id)}>
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
          <div onClick={() => onAssignVehicle(row.original)}>
            <img src={IconAssignVehicle} />
            <span style={{ color: '#0060B8' }}>{row.original.vehicleId > 0 ? 'Vehicle Assigned' : 'Assign Vehicle'}</span>
          </div>
          {row.original.bayanId && (
            <div style={{ marginLeft: '10px' }} onClick={() => onPrintBayan(row.original.bayanId)}>
              <img src={IconPrintBill} />
              <span style={{ color: '#F48031' }}>Print Bayan</span>
            </div>
          )}
          {!row.original.bayanId && (
            <div style={{ marginLeft: '10px' }} onClick={() => onCreateBayan(row.original.id)}>
              <img src={IconPrintBill} />
              <span style={{ color: '#F48031' }}>Create Bayan</span>
            </div>
          )}
        </div>
      );
    },
  },
];
