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
import { IShipmentDetails } from "@/interface/proposal";
import { useGetProposalQuery } from "@/services/proposal";

interface CreateNewRequestModalProps {
  show: boolean;
  handleClose: () => void;
  isEdit: boolean;
  proposalId?: number;

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
  proposalId,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: proposalItem } = useGetProposalQuery({ id: proposalId });

  const forms = [
    { icon: PalletIcon, label: "Pallet", component: PalletForm },
    { icon: BoxIcon, label: "Box", component: BoxForm },
    { icon: VehicleIcon, label: "Truck", component: AddTruckForm },
    { icon: OtherIcon, label: "Other", component: OtherForm },
  ];

  const handleFormClick = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (proposalItem) {
      console.log(proposalItem);
      const shipmentTypeName =
        proposalItem.result.shipmentTypes.shipmentTypeName;
      const index = forms.findIndex((form) => form.label === shipmentTypeName);
      if (index !== -1) {
        setActiveIndex(index);
      }
    }
  }, [isEdit, proposalId, proposalItem]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size={"sm"}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <div style={{ display: "flex", gap: "20px", marginLeft: "-35%" }}>
          {forms.map((form, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onClick={() => handleFormClick(index)}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "71px",
                  height: "69px",
                  borderRadius: "8px",
                  border:
                    activeIndex === index
                      ? "1px solid blue"
                      : "1px #7B787880 solid",
                  padding: "20px",
                }}
              >
                <Image src={form.icon} />
              </div>
              <span style={{ marginLeft: "10px" }}>{form.label}</span>
            </div>
          ))}
        </div>
        <Modal.Title>Fill in the other shipment details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {React.createElement(forms[activeIndex].component, {
          isEdit:
            proposalItem?.result.shipmentTypes.shipmentTypeName ===
            forms[activeIndex].label,
          proposalObject:
            proposalItem?.result.shipmentTypes.shipmentTypeName ===
            forms[activeIndex].label
              ? proposalItem.result
              : undefined,
          onSubmitShipmentForm: handleFormDataSubmission,
        })}
      </Modal.Body>
    </Modal>
  );
};

export default CreateNewUser;
