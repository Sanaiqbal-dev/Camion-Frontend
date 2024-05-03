import { Modal, Image } from "react-bootstrap";
import PalletIcon from "../../assets/icons/ic-pallet.svg";
import BoxIcon from "../../assets/icons/ic-boxIcon.svg";
import VehicleIcon from "../../assets/icons/ic-vehicle.svg";
import OtherIcon from "../../assets/icons/ic-othersIcon.svg";
import React, { useState } from "react";
import PalletForm from "./PalletForm";
import BoxForm from "./BoxForm";
import AddTruckForm from "./AddTruckForm";
import OtherForm from "./OtherForm";
import { IShipmentDetails } from "@/interface/proposal";


interface CreateUserModalProps {
  show: boolean;
  handleClose: () => void;
  handleFormDataSubmission: (data: IShipmentDetails) => void;
}

const CreateNewUser: React.FC<CreateUserModalProps> = ({
  show,
  handleClose,
  handleFormDataSubmission,
}) => {
  const [showPalletForm, setShowPalletForm] = useState(true);
  const [showBoxForm, setShowBoxForm] = useState(false);
  const [showTruckForm, setShowTruckForm] = useState(false);
  const [showOtherForm, setShowOtherForm] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const palletFormClick = (index: number) => {
    setActiveIndex(index);
    setShowPalletForm(true);
    setShowBoxForm(false);
    setShowTruckForm(false);
    setShowOtherForm(false);
  };
  const boxFormClicked = (index: number) => {
    setActiveIndex(index);
    setShowPalletForm(false);
    setShowBoxForm(true);
    setShowTruckForm(false);
    setShowOtherForm(false);
  };

  const truckFormClicked = (index: number) => {
    setActiveIndex(index);
    setShowPalletForm(false);
    setShowBoxForm(false);
    setShowTruckForm(true);
    setShowOtherForm(false);
  };
  const otherFormClicked = (index: number) => {
    setActiveIndex(index);
    setShowPalletForm(false);
    setShowBoxForm(false);
    setShowTruckForm(false);
    setShowOtherForm(true);
  };

  return (
    <Modal show={show} onHide={handleClose} centered size={"sm"}>
      <Modal.Header
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <Modal.Title>Fill in the other shipment details</Modal.Title>
        <div style={{ display: "flex", gap: "20px", marginLeft: "-35%" }}>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "71px",
                height: "69px",
                borderRadius: "8px",
                border:
                  activeIndex === 0 ? "1px solid blue" : "1px #7B787880 solid",
                padding: "20px",
              }}
              onClick={() => palletFormClick(0)}
            >
              <Image src={PalletIcon} />
            </div>
            <span style={{ marginLeft: "10px" }}>Pallet</span>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "71px",
                height: "69px",
                borderRadius: "8px",
                border:
                  activeIndex === 1 ? "1px solid blue" : "1px #7B787880 solid",
                padding: "20px",
              }}
              onClick={() => boxFormClicked(1)}
            >
              <Image src={BoxIcon} />
            </div>
            <span style={{ marginLeft: "10px" }}>Box</span>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "71px",
                height: "69px",
                borderRadius: "8px",
                border:
                  activeIndex === 2 ? "1px solid blue" : "1px #7B787880 solid",
                padding: "20px",
              }}
              onClick={() => truckFormClicked(2)}
            >
              <Image src={VehicleIcon} />
            </div>
            <span style={{ marginLeft: "10px" }}>Truck</span>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "71px",
                height: "69px",
                borderRadius: "8px",
                border:
                  activeIndex === 3 ? "1px solid blue" : "1px #7B787880 solid",
                padding: "20px",
              }}
              onClick={() => otherFormClicked(3)}
            >
              <Image src={OtherIcon} />
            </div>
            <span style={{ marginLeft: "10px" }}>Other</span>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body>
        {showPalletForm && (
          <PalletForm onSubmitShipmentForm={handleFormDataSubmission} />
        )}
        {showBoxForm && (
          <BoxForm onSubmitShipmentForm={handleFormDataSubmission} />
        )}
        {showTruckForm && (
          <AddTruckForm onSubmitShipmentForm={handleFormDataSubmission} />
        )}
        {showOtherForm && (
          <OtherForm onSubmitShipmentForm={handleFormDataSubmission} />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default CreateNewUser;
