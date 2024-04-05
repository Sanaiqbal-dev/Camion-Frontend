import { Outlet, useLocation } from "react-router-dom";
import CarrierSider from "../../components/CarrierSider";

const HomePage = () => {
  const currentPageTitle = useLocation();
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

    const title = pageTitleMap[currentPageTitle.pathname];

    return title ? title : "";
  };
  const toggleSidebar = () => {};

  return (
    <div className="container-fluid g-0">
      <div
        className="d-flex flex-md-row flex-column fixed"
        style={{ height: "100vh", width: "100vw" }}
      >
        <CarrierSider />
        <div className="col main-container m-1 m-sm-2 m-md-3 m-lg-4 m-xl-5 gap-1 gap-sm-2 gap-md-3 gap-lg-5 gap-xl-5">
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
              <img
                className="profile-img"
                src="../assets/ic-profile.svg"
                alt="Profile"
              />
              <img
                className="notification-icon"
                src="../assets/ic-notification.svg"
                alt="Notifications"
                width="22"
                height="22"
              />
              <img
                className="menu-icon"
                src="../assets/ic-menu.svg"
                alt="Menu"
                width="22"
                height="22"
              />
            </div>
          </header>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
