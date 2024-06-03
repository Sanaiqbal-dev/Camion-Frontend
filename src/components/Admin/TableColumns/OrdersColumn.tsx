import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import IconDelete from '../../../assets/icons/ic-delete.svg';
import IconDown from '../../../assets/icons/ic-down.svg';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../../../@/components/ui/dropdown-menu';
import { Button } from '../../../../@/components/ui/button';
import { IOrder } from '../../../interface/admin';
import { IOrderStatus, IOrderStatusResponseObject } from '@/interface/orderStatus';
import { IAPIResponse } from '@/interface/common';

interface OrderActionsProps {
  onDelete: (orderItemId: number) => void;
  onUpdateStatus: (id: number, statusId: number) => void;
  orderStatuses: IAPIResponse<IOrderStatusResponseObject[]> | undefined;
}

export const OrderColumns = ({ onDelete, onUpdateStatus, orderStatuses }: OrderActionsProps): ColumnDef<IOrder>[] => {
  const { t } = useTranslation(['adminOrderColumns']);

  return [
    {
      accessorKey: 'assignedCarrier',
      header: t('assignedCarrier'),
    },
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
                orderStatuses.result.map((statusItem: IOrderStatus) => (
                  <DropdownMenuItem key={statusItem.id} className="hover:tw-bg-black hover:tw-text-white" onClick={() => onUpdateStatus(item.id, statusItem.id)}>
                    {statusItem.description}
                  </DropdownMenuItem>
                ))}
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
              <img src={IconDelete} alt={t('delete')} />
              <span style={{ color: '#EB5757' }}>{t('delete')}</span>
            </div>
          </div>
        );
      },
    },
  ];
};

export default OrderColumns;
