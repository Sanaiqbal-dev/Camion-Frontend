import { Image } from "react-bootstrap";
import CamionLogo from "../../assets/images/camion-logo.svg";
import IconUser from "../../assets/icons/ic-user.svg";
import IconOrderManagement from "../../assets/icons/ic-order-management.svg";
import IconReportManagement from "../../assets/icons/ic-report-management.svg";
import IconSettings from "../../assets/icons/ic-settings.svg";
import IconLogout from "../../assets/icons/ic-logout.svg";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAuthSession } from "../../state/slice/authSlice";

const AdminSider = () => {
  const dispatch = useDispatch();

  const handleReplaceNavigate = () => {
    dispatch(clearAuthSession());
  };

  return (
    <div
      className="text-light pt-5 sidebar sidebar-admin"
      id="sidebar-container"
    >
      <div>
        <Image
          src={CamionLogo}
          alt="logo"
          height={27}
          style={{ width: "80%", margin: "0 auto" }}
        />
        <div className="accordion">
          <NavLink
            key={"User Profiles"}
            to={"/admin/profiles"}
            className={({ isActive }) =>
              isActive ? "selected-navlink" : undefined
            }
          >
            <div className="accordion-not-collapsing-item tw-flex tw-gap-3">
              <Image src={IconUser} />
              User Profiles
            </div>
          </NavLink>
          <NavLink
            key={"Order Management"}
            to={"/admin/orderManagement"}
            className={({ isActive }) =>
              isActive ? "selected-navlink" : undefined
            }
          >
            <div className="accordion-not-collapsing-item tw-flex tw-gap-3">
              <Image src={IconOrderManagement} />
              Order Management
            </div>
          </NavLink>
          <NavLink
            key={"Report Management"}
            to={"/admin/reportManagement"}
            className={({ isActive }) =>
              isActive ? "selected-navlink" : undefined
            }
          >
            <div className="accordion-not-collapsing-item tw-flex tw-gap-3">
              <Image src={IconReportManagement} />
              Report Management
            </div>
          </NavLink>
        </div>
      </div>
      <div className="accordion">
        <NavLink
          key={"Settings"}
          to={"/admin/settings"}
          className={({ isActive }) =>
            isActive ? "selected-navlink" : undefined
          }
        >
          <div className="accordion-not-collapsing-item tw-flex tw-gap-3">
            <Image src={IconSettings} />
            Settings
          </div>
        </NavLink>
        <NavLink
          key={"Logout"}
          to={"/login"}
          onClick={handleReplaceNavigate}
          className={({ isActive }) =>
            isActive ? "selected-navlink" : undefined
          }
        >
          <div className="accordion-not-collapsing-item tw-flex tw-gap-3">
            <Image src={IconLogout} />
            <span style={{ color: "#FF3939" }}>Logout</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSider;
