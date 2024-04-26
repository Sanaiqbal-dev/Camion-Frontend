import { Accordion, Image } from "react-bootstrap";
import CamionLogo from "../../assets/icons/ic-smallCamionlogo.svg";
import IconDashboard from "../../assets/icons/ic-dashboard.svg";
import IconOrderManagment from "../../assets/icons/ic-order-management.svg";
import IconRequest from "../../assets/icons/ic-request.svg";
import IconOrder from "../../assets/icons/ic-orders.svg";
import SettingIcon from "../../assets/icons/ic-settingIcon.svg";
import LogoutIcon from "../../assets/icons/ic-logoutIcon.svg";

import { NavLink } from "react-router-dom";

const ShipperSider = () => {
  return (
    <div className="text-light pt-5 sidebar" id="sidebar-container">
      <Image src={CamionLogo} alt="logo" style={{ margin: "0 auto" }} />
      <Accordion defaultActiveKey="0" id="accordionExample">
        <NavLink
          key={"Dashboard"}
          to={"/shipper/shipperdashboard"}
          className={({ isActive }) =>
            isActive ? "selected-navlink" : undefined
          }
        >
          <Accordion.Item className="dashboard-item" eventKey="0">
            <Accordion.Header>
              <div
                className="accordion-not-collapsing-item"
                style={{ gap: "12px" }}
              >
                <Image src={IconDashboard} />
                Dashboard
              </div>
            </Accordion.Header>
          </Accordion.Item>
        </NavLink>
        <Accordion.Item className="order-management-item" eventKey="2">
          <Accordion.Header>
            <div
              className="accordion-not-collapsing-item"
              style={{ gap: "12px" }}
            >
              <Image src={IconOrderManagment} />
              Order Management
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <NavLink
              key={"Orders"}
              to={"/shipper/shipperorders"}
              className={({ isActive }) =>
                isActive ? "selected-navlink" : undefined
              }
            >
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <div
                    className="accordion-not-collapsing-item"
                    style={{ gap: "12px" }}
                  >
                    <Image src={IconOrder} />
                    <span>Orders</span>
                  </div>
                </h2>
              </div>
            </NavLink>
            <NavLink
              key={"Requests"}
              to={"/Shipper/shipperrequests"}
              className={({ isActive }) =>
                isActive ? "selected-navlink" : undefined
              }
            >
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <div
                    className="accordion-not-collapsing-item"
                    style={{ gap: "12px" }}
                  >
                    <Image src={IconRequest} />
                    <span>Requests</span>
                  </div>
                </h2>
              </div>
            </NavLink>
            <NavLink
              key={"Proposals"}
              to={"/shipper/proposals"}
              className={({ isActive }) =>
                isActive ? "selected-navlink" : undefined
              }
            >
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <div
                    className="accordion-not-collapsing-item"
                    style={{ gap: "12px" }}
                  >
                    <Image src={IconRequest} />
                    <span>Proposals</span>
                  </div>
                </h2>
              </div>
            </NavLink>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div style={{ paddingLeft: "20px", position: "absolute", top: "82%" }}>
        <NavLink
          key={""}
          to={""}
          className={({ isActive }) =>
            isActive ? "selected-navlink" : undefined
          }
        >
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <div
                className="accordion-not-collapsing-item"
                style={{ gap: "12px" }}
              >
                <Image src={SettingIcon} />
                <span
                  style={{
                    fontWeight: "600px",
                    fontSize: "24px",
                  }}
                >
                  Settings
                </span>
              </div>
            </h2>
          </div>
        </NavLink>
        <NavLink
          key={""}
          to={""}
          className={({ isActive }) =>
            isActive ? "selected-navlink" : undefined
          }
        >
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <div
                className="accordion-not-collapsing-item"
                style={{ gap: "12px" }}
              >
                <Image src={LogoutIcon} />
                <span
                  style={{
                    color: "#FF3939",
                    fontWeight: "600px",
                    fontSize: "24px",
                  }}
                >
                  Logout
                </span>
              </div>
            </h2>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default ShipperSider;
