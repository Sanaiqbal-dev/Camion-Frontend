import { ColumnDef } from '@tanstack/react-table';
import IconEdit from '../../../assets/icons/ic-edit.svg';
import IconDelete from '../../../assets/icons/ic-delete.svg';
import IconDriver from '../../../assets/icons/ic-driver.svg';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { IVehicle } from '../../../interface/carrier';
import { useTranslation } from 'react-i18next';
import LoadingAnimation from '@/components/ui/LoadingAnimation';
import { IDownloadState } from '@/interface/common';

export const VehicleManagementColumns = ({
  assignDriver,
  editVehicle,
  deleteVehicle,
  onViewDocumentClick,
  documentDownloading,
}: {
  assignDriver: (id: number, driverId: string) => void;
  editVehicle: (id: number) => void;
  deleteVehicle: (id: number) => void;
  onViewDocumentClick: (id: number) => void;
  documentDownloading?: IDownloadState;
}): ColumnDef<IVehicle>[] => {
  const { t } = useTranslation(['vehicleManagementColumn']);

  return [
    {
      accessorKey: 'name',
      header: t('driverName'),
      cell: ({ row }) => {
        const driver = row.original.driver;
        return (
          <div
            className={clsx({
              'tw-text-red-600': !driver?.name,
            })}>
            {driver ? driver.name : t('driverNotAssigned')}
          </div>
        );
      },
    },
    {
      accessorKey: 'vehicleType',
      header: t('vehicleType'),
      cell: ({ row }) => {
        return <div>{row.original.vehicleType.typeName}</div>;
      },
    },
    {
      accessorKey: 'modelYear',
      header: t('modelYear'),
    },
    {
      accessorKey: 'numberPlate',
      header: t('vehicleNumber'),
      cell: ({ row }) => {
        return <div>{row.original.numberPlate}</div>;
      },
    },
    {
      accessorKey: 'color',
      header: t('color'),
    },
    {
      accessorKey: 'registrationNumber',
      header: t('registrationNumber'),
    },
    {
      accessorKey: 'imeiNumber',
      header: t('imeiNumber'),
    },
    {
      accessorKey: 'vehicleRegistration',
      header: t('vehicleRegistration'),
      cell: ({ row }) => {
        const vehicleId = row.original.id;
        return (documentDownloading?.status==true && documentDownloading?.id==vehicleId) ? (
          <LoadingAnimation />
        ) : (
          <div onClick={() => onViewDocumentClick(vehicleId)}>
            <Link to="">{t('viewDocument')}</Link>
          </div>
        );
      },
    },
    {
      accessorKey: 'action',
      header: t('action'),
      cell: ({ row }) => {
        return (
          <div className="action-container" style={{ justifyContent: 'start' }}>
            <div
              onClick={() => {
                editVehicle(row.original.id);
              }}>
              <img src={IconEdit} />
              <span style={{ color: '#27AE60' }}>{t('edit')}</span>
            </div>
            <div onClick={() => deleteVehicle(row.original.id)}>
              <img src={IconDelete} />
              <span style={{ color: '#EB5757' }}>{t('delete')}</span>
            </div>
            <div
              id="assign-driver"
              onClick={() => {
                assignDriver(row.original.id, row.original.driver?.id);
              }}>
              <img src={IconDriver} />
              <span style={{ color: '#0060B8' }}>{t('assignDriver')}</span>
            </div>
          </div>
        );
      },
    },
  ];
};
