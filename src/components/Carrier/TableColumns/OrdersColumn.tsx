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
import { useTranslation } from 'react-i18next';

interface OrderActionsProps {
  onDelete: (orderItemId: number) => void;
  onAssignVehicle: (orderItem: IOrderTable) => void;
  onCreateBayan: (orderItemId: number) => void;
  onPrintBayan: (orderItemId: number) => void;
  onUpdateStatus: (id: number, statusId: number) => void;
  orderStatuses: IAPIResponse<IOrderStatusResponseObject[]> | undefined;
}

export const OrderColumns = ({ onDelete, onAssignVehicle, onCreateBayan, onPrintBayan, onUpdateStatus, orderStatuses }: OrderActionsProps): ColumnDef<IOrderTable>[] => {
  const { t } = useTranslation(['orderColum']);

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
      accessorKey: 'ETA',
      header: t('eta'),
    },
    {
      accessorKey: 'status',
      header: t('status'),
      cell: ({ row }) => {
        const item = row.original;
        const noItemSelected = (
          <>
            {t('selectStatus')} <img src={IconDown} />
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
                    noItemSelected
                  )}
                </span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="tw-flex tw-flex-col tw-gap-2 tw-p-2" align="end">
              {orderStatuses &&
                orderStatuses.result.map((statusItem: IOrderStatus) => {
                  return (
                    <DropdownMenuItem key={statusItem.id} className="hover:tw-bg-black hover:tw-text-white" onClick={() => onUpdateStatus(item.id, statusItem.id)}>
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
      header: t('action'),
      cell: ({ row }) => {
        return (
          <div className="action-container" style={{ justifyContent: 'start' }}>
            <div onClick={() => onDelete(row.original.id)}>
              <img src={IconDelete} />
              <span style={{ color: '#EB5757' }}>{t('delete')}</span>
            </div>
            <div onClick={() => onAssignVehicle(row.original)}>
              <img src={IconAssignVehicle} />
              <span style={{ color: '#0060B8' }}>{row.original.vehicleId > 0 ? t('vehicleAssigned') : t('assignVehicle')}</span>
            </div>
            {row.original.bayanId && (
              <div style={{ marginLeft: '10px' }} onClick={() => onPrintBayan(row.original.bayanId)}>
                <img src={IconPrintBill} />
                <span style={{ color: '#F48031' }}>{t('printBayan')}</span>
              </div>
            )}
            {!row.original.bayanId && (
              <div style={{ marginLeft: '10px' }} onClick={() => onCreateBayan(row.original.id)}>
                <img src={IconPrintBill} />
                <span style={{ color: '#F48031' }}>{t('createBayan')}</span>
              </div>
            )}
          </div>
        );
      },
    },
  ];
};
