import { ColumnDef } from '@tanstack/react-table';
import IconTick from '../../../assets/icons/ic-submitted.svg';
import IconDeleteProfile from '../../../assets/icons/ic-delete-profile.svg';
import IconRejectProfile from '../../../assets/icons/ic-reject-profile.svg';
import { Iprofiles } from '../../../interface/admin';
import clsx from 'clsx';

interface ProfileActionProps {
  onSelectFile: (file: any) => void;
  onAcceptButtonClick: (id: string) => void;
  onRejectButtonClick: (id: string) => void;
  onDeactivateButtonClick: (id: string) => void;
  onDeleteButtonClick: (id: string) => void;
}

export const ProfileColumns = ({
  onSelectFile,
  onAcceptButtonClick,
  onRejectButtonClick,
  onDeactivateButtonClick,
  onDeleteButtonClick,
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

      const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = event.target.selectedIndex;
        const selectedFile = files[selectedIndex - 1];
        if (selectedFile) {
          onSelectFile(selectedFile);
        }
      };

      return (
        <select onChange={handleChange} style={{ maxWidth: '130px' }}>
          <option value="">Select Document</option>
          {renderOptions()}
        </select>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status: string = row.getValue('status');
      const className_ = clsx({
        'tw-text-orange-500': status === 'Not Approved',
        'tw-text-red-500': status === 'Deactivated',
        'tw-text-green-500': status === 'Active',
      });
      return <span className={className_}>{status}</span>;
    },
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const id = row.original.id;
      const status = row.getValue('status');

      return status === 'Not Approved' ? (
        <div className="tw-flex tw-gap-2">
          <button
            className="table-action-btn"
            style={{
              color: '#0EBC93',
              backgroundColor: '#0EBC931A',
            }}
            onClick={() => id && onAcceptButtonClick(id)}>
            <img src={IconTick} alt="Accept" />
            Accept
          </button>
          <button
            className="table-action-btn"
            style={{
              color: '#EB5757',
              backgroundColor: '#EB57571A',
            }}
            onClick={() => id && onRejectButtonClick(id)}>
            <img src={IconRejectProfile} alt="Reject" />
            Reject
          </button>
        </div>
      ) : status === 'Active' ? (
        <div>
          <button className="table-action-btn" style={{ color: '#F48031', backgroundColor: '#F480311A' }} onClick={() => id && onDeactivateButtonClick(id)}>
            Deactivate
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
            onClick={() => id && onDeleteButtonClick(id)}>
            <img src={IconDeleteProfile} alt="Delete" />
            Delete
          </button>
        </div>
      );
    },
  },
];

export default ProfileColumns;
