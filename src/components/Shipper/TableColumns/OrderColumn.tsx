import { useTranslation } from 'react-i18next';
import { ColumnDef } from '@tanstack/react-table';
import DeleteIcon from '../../../assets/icons/ic-delete.svg';
import IconTrackOrder from '../../../assets/icons/ic-vehicle.svg';
import IconTrackOrderDisabled from '../../../assets/icons/ic-vehicle-disabled.svg';
import { IOrderTable } from '@/interface/shipper';

interface OrderActionsProps {
  onDelete: (orderItemId: number) => void;
  onTrackOrder: (orderItemId: number) => void;
}

export const OrderColumns = ({ onDelete, onTrackOrder }: OrderActionsProps): ColumnDef<IOrderTable>[] => {
  const { t } = useTranslation(['orderColumn', 'common']);

  return [
    {
      accessorKey: 'trackingId',
      header: t('orderColumn:trackingHeader'),
    },
    {
      accessorKey: 'origin',
      header: t('common:originHeader'),
    },
    {
      accessorKey: 'destination',
      header: t('common:destinationHeader'),
    },
    {
      accessorKey: 'weight',
      header: t('common:weightHeader'),
    },
    {
      accessorKey: 'type',
      header: t('orderColumn:typeHeader'),
    },
    {
      accessorKey: 'ETA',
      header: t('common:etaHeader'),
    },
    {
      accessorKey: 'status',
      header: t('common:statusHeader'),
      cell: ({ row }) => {
        const statusVal = row.original.status;
        return (
          <span
            className={
              statusVal == 'Pending'
                ? 'tw-text-red-600'
                : statusVal == 'In Progress'
                  ? 'tw-text-orange-400'
                  : statusVal == 'Ready To Load'
                    ? 'tw-text-green-700'
                    : statusVal == 'Driver Assigned'
                      ? 'tw-text-blue-600'
                      : 'tw-text-black'
            }>
            {t(`${statusVal.toLowerCase()}`)}
          </span>
        );
      },
    },
    {
      accessorKey: 'action',
      header: t('common:actionHeader'),
      cell: ({ row }) => {
        let isEnabled = row.original.status === 'Driver Assigned';
        return (
          <div className="action-container" style={{ justifyContent: 'start' }}>
            <div onClick={() => onDelete(row.original.id)}>
              <img src={DeleteIcon} alt={t('common:deleteAction')} />
              <span style={{ color: '#EB5757' }}>{t('common:deleteAction')}</span>
            </div>
            <div onClick={() => isEnabled && onTrackOrder(row.original.id)}>
              <img src={isEnabled ? IconTrackOrder : IconTrackOrderDisabled} alt={t('trackAction')} />
              <span className={isEnabled ? 'trackingEnabled' : 'trackingDisabled'}>{t('trackAction')}</span>
            </div>
          </div>
        );
      },
    },
  ];
};
