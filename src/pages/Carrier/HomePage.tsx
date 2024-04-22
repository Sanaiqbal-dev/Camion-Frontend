import { Navigate, Outlet, useLocation } from "react-router-dom";
import CarrierSider from "../../components/CarrierSider";
import ProfileIcon from "../../assets/icons/ic-profile.svg";
import NotificationIcon from "../../assets/icons/ic-notification.svg";
import MenuIcon from "../../assets/icons/ic-menu.svg";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";

const HomePage = () => {
  const token = useSelector((state: any) => state.session.token);
  const currentRouteLocation = useLocation();
  const pageTitleMap = [
    { pathname: "/dashboard", title: "Dashboard" },
    { pathname: "/tracking", title: "Tracking" },
    { pathname: "/requests", title: "Requests" },
    { pathname: "/orders", title: "Orders" },
    { pathname: "/drivermanagement", title: "Driver Management" },
    { pathname: "/vehiclemanagement", title: "Vehicle Management" },
    { pathname: "/bayan", title: "Bayan" },
  ];
  const GetPageTitle = () => {
    const pageObject = pageTitleMap.find(
      (page) => page.pathname === currentRouteLocation.pathname
    );

    return pageObject?.title ? pageObject.title : "";
  };
  const toggleSidebar = () => {};

  if (!token){
  return <Navigate to="/login" state={{ from: { currentRouteLocation } }} replace />;
  }
    return (
      <div className="wrapper">
        <CarrierSider />
        <div className="content-container col m-1 m-sm-2 m-md-3 m-xl-5 gap-1 gap-sm-2 gap-md-3 gap-lg-5 gap-xl-5">
          <div className="burger-menu">
            <span onClick={toggleSidebar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                ></path>
              </svg>
            </span>
          </div>
          <header className="page-title bg-transparent d-flex justify-content-between align-items-center">
            <span style={{ fontWeight: "700", color: "#535353" }}>
              {GetPageTitle()}
            </span>

            <div className="menu-group ml-3 d-flex flex-row-reverse justify-content-center align-items-center">
              <Image className="profile-img" src={ProfileIcon} />
              <Image
                className="notification-icon"
                src={NotificationIcon}
                alt="Notifications"
                width="22"
                height="22"
              />
              <Image
                className="menu-icon"
                src={MenuIcon}
                alt="Menu"
                width="22"
                height="22"
              />
            </div>
          </header>
          <div className="mt-4">
            <Outlet />
          </div>
        </div>
      </div>
    );
};

export default HomePage;
