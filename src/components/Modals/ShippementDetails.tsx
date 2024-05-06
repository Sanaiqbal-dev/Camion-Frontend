import { Modal, Image } from "react-bootstrap";
import PalletIcon from "../../assets/icons/ic-pallet.svg";
import BoxIcon from "../../assets/icons/ic-boxIcon.svg";
import VehicleIcon from "../../assets/icons/ic-vehicle.svg";
import OtherIcon from "../../assets/icons/ic-othersIcon.svg";
import React, { useEffect, useState } from "react";
import PalletForm from "./PalletForm";
import BoxForm from "./BoxForm";
import AddTruckForm from "./AddTruckForm";
import OtherForm from "./OtherForm";
import { IProposalResponseData, IShipmentDetails } from "@/interface/proposal";

interface CreateNewRequestModalProps {
  show: boolean;
  handleClose: () => void;
  isEdit: boolean;
  proposalObject?: IProposalResponseData;

  handleFormDataSubmission: (
    data: IShipmentDetails,
    shipmentType: string
  ) => void;
}

const CreateNewUser: React.FC<CreateNewRequestModalProps> = ({
  show,
  handleClose,
  handleFormDataSubmission,
  isEdit,
  proposalObject,
}) => {
  const [showPalletForm, setShowPalletForm] = useState(false);
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

  useEffect(() => {
    if (isEdit && proposalObject) {
      let shipmenttype_ = proposalObject.shipmentTypes.shipmentTypeName;
      shipmenttype_ == "Box"
        ? boxFormClicked(1)
        : shipmenttype_ == "Pallet"
        ? palletFormClick(0)
        : shipmenttype_ == "Truck"
        ? truckFormClicked(2)
        : otherFormClicked(3);
    } else {
      palletFormClick(0);
    }
  }, [isEdit]);

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
          <PalletForm
            isEdit={isEdit}
            proposalObject={proposalObject}
            onSubmitShipmentForm={handleFormDataSubmission}
          />
        )}
        {showBoxForm && (
          <BoxForm
            isEdit={isEdit}
            proposalObject={proposalObject}
            onSubmitShipmentForm={handleFormDataSubmission}
          />
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
