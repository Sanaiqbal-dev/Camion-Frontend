import { Modal, Image } from 'react-bootstrap';
import PalletIcon from '../../assets/icons/ic-pallet.svg';
import BoxIcon from '../../assets/icons/ic-boxIcon.svg';
import CaseIcon from '../../assets/icons/ic-suitcase.svg';
import EachIcon from '../../assets/icons/ic-each.svg';
import ContainerIcon from '../../assets/icons/ic-container.svg';
import KGIcon from '../../assets/icons/ic-kilo.svg';
import TonIcon from '../../assets/icons/ic-ton.svg';
import React, { useEffect, useState } from 'react';
import { IShipmentDetails } from '@/interface/proposal';
import { useGetProposalQuery } from '@/services/proposal';
import ShipmentForm from './ShipmentForm';
import { useGetShipmentTypesQuery } from '@/services/shipmentType';
import { useTranslation } from 'react-i18next';

interface ShipmentDetailModalProps {
  show: boolean;
  handleClose: () => void;
  isEdit: boolean;
  proposalId?: number;

  handleFormDataSubmission: (data: IShipmentDetails) => void;
}
const ShipmentDetail: React.FC<ShipmentDetailModalProps> = ({ show, handleClose, handleFormDataSubmission, isEdit, proposalId }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: proposalItem } = useGetProposalQuery({ id: proposalId });

  const shipmentData = useGetShipmentTypesQuery();
  const [shipmentId, setShipmentId] = useState<number>();
  const { t } = useTranslation(['shipmentForm']);
  useEffect(() => {
    if (shipmentData.data?.result) {
      setShipmentId(shipmentData.data.result[0].id);
    }
  }, [shipmentData]);
  const forms = [
    { icon: EachIcon, label: 'Each', shipmentId: 1 },
    { icon: TonIcon, label: 'Ton', shipmentId: 2 },
    { icon: PalletIcon, label: 'Pallet', shipmentId: 3 },
    { icon: BoxIcon, label: 'Box', shipmentId: 4 },
    { icon: KGIcon, label: 'KG', shipmentId: 5 },
    { icon: CaseIcon, label: 'Case', shipmentId: 6 },
    { icon: ContainerIcon, label: 'Container', shipmentId: 7 },
  ];

  const handleFormClick = (shipmentType: number, index: number) => {
    setShipmentId(shipmentType);
    setActiveIndex(index);
  };

  const handleSubmit = (data: IShipmentDetails) => {
    if (shipmentId) {
      const updatedData = { ...data, shipmentTypeId: shipmentId };
      handleFormDataSubmission(updatedData);
    }
  };
  useEffect(() => {
    if (proposalItem) {
      console.log(proposalItem);
      const shipmentTypeId = proposalItem.result.shipmentTypeId;
      const index = forms.findIndex((form) => form.shipmentId === shipmentTypeId);
      if (index !== -1) {
        setActiveIndex(index);
      }
    }
  }, [isEdit, proposalId, proposalItem]);

  return (
    <Modal show={show} onHide={handleClose} centered size={'sm'} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <div style={{ display: 'flex', gap: '20px' }}>
          {forms.map((form, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              onClick={() => handleFormClick(form.shipmentId, index)}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '71px',
                  height: '69px',
                  borderRadius: '8px',
                  border: activeIndex === index ? '1px solid #0060B8' : '1px #7B787880 solid',
                  padding: '20px',
                }}>
                <Image src={form.icon} />
              </div>
              <span style={{ marginLeft: '10px' }}>{form.label}</span>
            </div>
          ))}
        </div>
        <Modal.Title>{t('fillInShipmentDetails')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ShipmentForm
          isEdit={isEdit}
          proposalObject={proposalItem?.result}
          onSubmitShipmentForm={(data) => {
            handleSubmit(data);
          }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ShipmentDetail;
