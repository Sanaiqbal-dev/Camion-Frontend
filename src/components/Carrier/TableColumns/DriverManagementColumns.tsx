import { ColumnDef } from '@tanstack/react-table';
import IconEdit from '../../../assets/icons/ic-edit.svg';
import IconDelete from '../../../assets/icons/ic-delete.svg';
import { Link } from 'react-router-dom';
import { IDriver } from '../../../interface/carrier';
import { useTranslation } from 'react-i18next';
import LoadingAnimation from '@/components/ui/LoadingAnimation';

interface DriverActionProps {
  onDeleteDriver: (id: number) => void;
  onUpdateDriver: (id: number) => void;
  onIqamaDownloadClick: (id: number) => void;
  iqamaDownloading: boolean;
}

export const DriverManagementColumns = ({ onDeleteDriver, onUpdateDriver, onIqamaDownloadClick, iqamaDownloading }: DriverActionProps): ColumnDef<IDriver>[] => {
  const { t } = useTranslation(['driverManagementColumn']);

  return [
    {
      accessorKey: 'name',
      header: t('driverName'),
    },
    {
      accessorKey: 'iqamaId',
      header: t('driverIdIqama'),
    },
    {
      accessorKey: 'licenseNumber',
      header: t('licenseNumber'),
    },
    {
      accessorKey: 'dob',
      header: t('dateOfBirth'),
    },
    {
      accessorKey: 'driverNationality.name',
      header: t('nationality'),
    },
    {
      accessorKey: 'phoneNumber',
      header: t('mobileNumber'),
    },
    {
      accessorKey: 'viewIqama',
      header: t('viewIqamaId'),
      cell: ({ row }) => {
        const driverId = row.original.id;

        return iqamaDownloading ? (
          <LoadingAnimation />
        ) : (
          <div
            onClick={() => {
              if (row.original.fileName !== t('noFileUploaded')) onIqamaDownloadClick(parseInt(driverId));
            }}>
            <Link to={''} className={`${row.original.fileName === t('noFileUploaded') ? 'tw-text-gray-400 tw-cursor-default' : ''}`}>
              {t('viewIqamaId')}
            </Link>
          </div>
        );
      },
    },
    {
      accessorKey: 'action',
      header: t('action'),
      cell: ({ row }) => {
        const driverId = row.original.id;
        return (
          <div className="action-container" style={{ justifyContent: 'start' }}>
            <div onClick={() => onUpdateDriver(parseInt(driverId))}>
              <img src={IconEdit} />
              <span style={{ color: '#27AE60' }}>{t('edit')}</span>
            </div>
            <div onClick={() => onDeleteDriver(parseInt(driverId))}>
              <img src={IconDelete} />
              <span style={{ color: '#EB5757' }}>{t('delete')}</span>
            </div>
          </div>
        );
      },
    },
  ];
};
