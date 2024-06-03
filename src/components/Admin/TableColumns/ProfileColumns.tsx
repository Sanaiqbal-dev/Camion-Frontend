import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import IconTick from '../../../assets/icons/ic-submitted.svg';
import IconDeleteProfile from '../../../assets/icons/ic-delete-profile.svg';
import IconRejectProfile from '../../../assets/icons/ic-reject-profile.svg';
import { Iprofiles } from '../../../interface/admin';
import clsx from 'clsx';

interface ProfileActionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelectFile: (file: any) => void;
  onAcceptButtonClick: (id: string) => void;
  onRejectButtonClick: (id: string) => void;
  onDeactivateButtonClick: (id: string) => void;
  onDeleteButtonClick: (id: string) => void;
  isDisabled: boolean;
}

export const ProfileColumns = ({
  onSelectFile,
  onAcceptButtonClick,
  onRejectButtonClick,
  onDeactivateButtonClick,
  onDeleteButtonClick,
  isDisabled,
}: ProfileActionProps): ColumnDef<Iprofiles>[] => [
  {
    accessorKey: 'profileType',
    header: 'Profile Type',
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'email',
    header: 'Email Address',
  },
  {
    accessorKey: 'contact',
    header: 'Contact Number',
  },
  {
    accessorKey: 'company',
    header: 'Company Name',
  },
  {
    accessorKey: 'CRDocument',
    header: 'CR Document',
    cell: ({ row }) => {
      const files = row.original.crDocument || [];
      const renderOptions = () => {
        return files.map((file) => (
          <option key={file.id} value={file.id}>
            {file.fileName}
          </option>
        ));
      };
}: ProfileActionProps): ColumnDef<Iprofiles>[] => {
  const { t } = useTranslation(['adminProfileColumn']);

  return [
    {
      accessorKey: 'profileType',
      header: t('profileType'),
    },
    {
      accessorKey: 'firstName',
      header: t('firstName'),
    },
    {
      accessorKey: 'lastName',
      header: t('lastName'),
    },
    {
      accessorKey: 'email',
      header: t('emailAddress'),
    },
    {
      accessorKey: 'contact',
      header: t('contactNumber'),
    },
    {
      accessorKey: 'company',
      header: t('companyName'),
    },
    {
      accessorKey: 'CRDocument',
      header: t('crDocument'),
      cell: ({ row }) => {
        const files = row.original.crDocument || [];
        const renderOptions = () => {
          return files.map((file) => (
            <option key={file.id} value={file.id}>
              {file.fileName}
            </option>
          ));
        };

        const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
          const selectedIndex = event.target.selectedIndex;
          const selectedFile = files[selectedIndex - 1];
          if (selectedFile) {
            onSelectFile(selectedFile);
          }
        };

        return (
          <select onChange={handleChange} style={{ maxWidth: '130px' }}>
            <option value="">{t('selectDocument')}</option>
            {renderOptions()}
          </select>
        );
      },
    },
    {
      accessorKey: 'status',
      header: t('status'),
      cell: ({ row }) => {
        const status: string = row.getValue('status');
        const className_ = clsx({
          'tw-text-orange-500': status === t('notApproved'),
          'tw-text-red-500': status === t('deactivated'),
          'tw-text-green-500': status === t('active'),
        });
        return <span className={className_}>{t(status)}</span>;
      },
    },
    {
      accessorKey: 'action',
      header: t('action'),
      cell: ({ row }) => {
        const id = row.original.id;
        const status = row.getValue('status');

        return status === t('notApproved') ? (
          <div className="tw-flex tw-gap-2">
            <button
              className="table-action-btn"
              style={{
                color: '#0EBC93',
                backgroundColor: '#0EBC931A',
              }}
              onClick={() => id && onAcceptButtonClick(id)}
            disabled={isDisabled}>
              <img src={IconTick} alt={t('accept')} />
              {t('accept')}
            </button>
            <button
              className="table-action-btn"
              style={{
                color: '#EB5757',
                backgroundColor: '#EB57571A',
              }}
              onClick={() => id && onRejectButtonClick(id)}
            disabled={isDisabled}>
              <img src={IconRejectProfile} alt={t('reject')} />
              {t('reject')}
            </button>
          </div>
        ) : status === t('active') ? (
          <div>
            <button className="table-action-btn" style={{ color: '#F48031', backgroundColor: '#F480311A' }} onClick={() => id && onDeactivateButtonClick(id)} disabled={isDisabled}>
              {t('deactivate')}
            </button>
          </div>
        ) : (
          <div>
            <button
              className="table-action-btn"
              style={{
                color: '#EB5757',
                backgroundColor: '#EB57571A',
              }}
              disabled={isDisabled}
            onClick={() => id && onDeleteButtonClick(id)}>
              <img src={IconDeleteProfile} alt={t('delete')} />
              {t('delete')}
            </button>
          </div>
        );
      },
    },
  ];
};

export default ProfileColumns;
