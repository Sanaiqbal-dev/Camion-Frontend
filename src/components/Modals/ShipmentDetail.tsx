import { Modal, Image } from 'react-bootstrap';
import PalletIcon from '../../assets/icons/ic-pallet.svg';
import BoxIcon from '../../assets/icons/ic-boxIcon.svg';
import VehicleIcon from '../../assets/icons/ic-vehicle.svg';
import OtherIcon from '../../assets/icons/ic-othersIcon.svg';
import React, { useEffect, useState } from 'react';
import { IShipmentDetails, IShipmentType } from '@/interface/proposal';
import { useGetProposalQuery } from '@/services/proposal';
import ShipmentForm from './ShipmentForm';
import { useGetShipmentTypesQuery } from '@/services/shipmentType';

interface ShipmentDetailModalProps {
  show: boolean;
  handleClose: () => void;
  isEdit: boolean;
  proposalId?: number;

  handleFormDataSubmission: (data: IShipmentDetails, shipmentTypeId_: number) => void;
}
const ShipmentDetail: React.FC<ShipmentDetailModalProps> = ({ show, handleClose, handleFormDataSubmission, isEdit, proposalId }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: proposalItem } = useGetProposalQuery({ id: proposalId });

  const shipmentData = useGetShipmentTypesQuery();
  const [shipmentTypes, setShipmentTypes] = useState<IShipmentType[]>();
  const [shipmentId, setShipmentId] = useState<number>();
  useEffect(() => {
    if (shipmentData.data?.result) {
      setShipmentTypes(shipmentData.data.result);
      setShipmentId(shipmentData.data.result[0].id);
    }
  }, [shipmentData]);
  const forms = [
    { icon: PalletIcon, label: 'Pallet' },
    { icon: BoxIcon, label: 'Box' },
    { icon: VehicleIcon, label: 'Truck' },
    { icon: OtherIcon, label: 'Other' },
  ];

  const handleFormClick = (shipmentType: string) => {
    const shipmentTypeItem = shipmentTypes?.find((item: IShipmentType) => item.name === shipmentType);
    console.log(shipmentTypeItem?.id);
    setShipmentId(shipmentTypeItem?.id);
  };

  const handleSubmit = (data: IShipmentDetails) => {
    shipmentId && handleFormDataSubmission(data, shipmentId);
  };
  useEffect(() => {
    if (proposalItem) {
      console.log(proposalItem);
      const shipmentTypeName = proposalItem.result.shipmentTypes.shipmentTypeName;
      const index = forms.findIndex((form) => form.label === shipmentTypeName);
      if (index !== -1) {
        setActiveIndex(index);
      }
    }
  }, [isEdit, proposalId, proposalItem]);

  return (
    <Modal show={show} onHide={handleClose} centered size={'sm'} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <div style={{ display: 'flex', gap: '20px', marginLeft: '-35%' }}>
          {forms.map((form, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              onClick={() => handleFormClick(form.label)}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '71px',
                  height: '69px',
                  borderRadius: '8px',
                  border: activeIndex === index ? '1px solid blue' : '1px #7B787880 solid',
                  padding: '20px',
                }}>
                <Image src={form.icon} />
              </div>
              <span style={{ marginLeft: '10px' }}>{form.label}</span>
            </div>
          ))}
        </div>
        <Modal.Title>Fill in the other shipment details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ShipmentForm
          isEdit={proposalItem?.result.shipmentTypes.shipmentTypeName === forms[activeIndex].label}
          proposalObject={proposalItem?.result.shipmentTypes.shipmentTypeName === forms[activeIndex].label ? proposalItem.result : undefined}
          onSubmitShipmentForm={(data) => {
            handleSubmit(data);
          }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ShipmentDetail;
