import { useState, useEffect } from 'react';
import { useAppSelector } from '@/state';
import ActivateProfile from './Modals/ActivateProfile';
import ShipperSider from './Shipper/ShipperSider';
import { useNavigate } from 'react-router-dom';
import CarrierSider from './Carrier/CarrierSider';

export const ProfilePage = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const session = useAppSelector((state) => state.session);

  const navigate = useNavigate();

  useEffect(() => {
    if (session.isCompanyAccount) {
      if (session?.user.role === 'Carrier') {
        navigate('/carrier/dashboard');
      } else if (session?.user.role === 'Shipper') {
        navigate('/shipper/shipperdashboard');
      } else {
        navigate('/admin/Profiles');
      }
    }

    if (!session.isCompanyAccount && !location.pathname.includes(`${session?.user.role.toLowerCase()}/profile`)) {
      navigate(`${session?.user.role.toLowerCase()}/profile`);
    }
  }, []);

  return (
    <div className="wrapper tw-bg-[#F3F3F3]">
      {session?.user.role === 'Shipper' ? <ShipperSider /> : <CarrierSider />}

      <div className="content-container col px-1 pt-4 px-sm-2 px-md-3 px-xl-5">
        <header className="page-title bg-transparent">
          <div className="menu-group ml-3 d-flex flex-row-reverse justify-content-center align-items-center">
            {!session?.isCompanyAccount && (
              <div className="tw-flex tw-w-full tw-justify-center tw-align-middle tw-p-2 tw-rounded-md tw-bg-red-400">
                <span className="tw-text-lg">
                  To activate your profile please complete your profile details,{' '}
                  <strong className="tw-underline hover:tw-cursor-pointer hover:tw-text-white tw-transition-all tw-duration-200" onClick={() => setShowProfileModal(true)}>
                    Click Here
                  </strong>
                </span>
              </div>
            )}
          </div>
        </header>
        <ActivateProfile show={showProfileModal} handleClose={() => setShowProfileModal(false)} submitProfileInfo={() => setShowProfileModal(false)} />
      </div>
    </div>
  );
};
