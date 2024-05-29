import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { MapMarker } from '../ui/MapMarker';
import React, { useEffect, useState } from 'react';
import { IOrderDetail } from '@/interface/orderDetail';
import { useLocation } from 'react-router-dom';
import { useGetShipperOrderTrackingsQuery } from '@/services/tracking';
import { IMarkers } from '@/interface/common';
import { useTranslation } from 'react-i18next';

interface IShipperTracking {
  orderObject?: IOrderDetail;
}

const ShipperTracking: React.FC<IShipperTracking> = () => {
  const { t } = useTranslation(['shipperTracking']);

  const [mapApiKey, setMapApiKey] = useState('');
  const location = useLocation();
  const { orderObject } = location.state || {};
  console.log(orderObject, location);
  useEffect(() => {
    setMapApiKey(import.meta.env.VITE_GOOGLE_MAP_API_KEY);
  }, []);
  const { data: orderTracking, isLoading: isLoadingOrderTracking } = useGetShipperOrderTrackingsQuery({});

  const [markers, setMarkers] = useState<IMarkers[]>([]);
  const [position, setPosition] = useState({ lat: 24.686111, lng: 46.827661 });
  useEffect(() => {
    if (!isLoadingOrderTracking) {
      if (orderTracking.length > 0) {
        setPosition({ lat: orderTracking[0].latitude, lng: orderTracking[0].longitude });
      }
      setMarkers(orderTracking);
    }
  }, [isLoadingOrderTracking]);

  return (
    <div>
      <div
        style={{
          width: '430px',
          height: '285px',
          borderRadius: '16px',
          position: 'absolute',
          zIndex: '2',
          backgroundColor: '#FFF',
          padding: '20px',
          margin: '20px 0 0 20px',
        }}>
        <span
          style={{
            fontFamily: 'Roboto',
            fontSize: '18px',
            fontWeight: '600',
            lineHeight: '21.09px',
            textAlign: 'left',
            color: '#0060B8',
          }}>
          {t('orderDetails')}
        </span>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '16px',
            marginTop: '20px',
          }}>
          <div style={{ fontWeight: '600' }}>{t('orderNumber')}</div>
          <div>{orderObject && orderObject.id}</div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '16px',
          }}>
          <div style={{ fontWeight: '600' }}>{t('origin')}:</div>
          <div>{orderObject && orderObject.origin}</div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '16px',
          }}>
          <div style={{ fontWeight: '600' }}>{t('destination')}:</div>
          <div>{orderObject && orderObject.destination}</div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '16px',
          }}>
          <div style={{ fontWeight: '600' }}>{t('weight')}</div>
          <div>{orderObject && orderObject.weight}</div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '16px',
          }}>
          <div style={{ fontWeight: '600' }}>{t('dimensions')}:</div>
          <div>{orderObject && orderObject.dimensions}</div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '16px',
          }}>
          <div style={{ fontWeight: '600' }}>{t('estimatedDeliveryDate')}:</div>
          <div>{orderObject ? orderObject.estimatedDeliveryTime : '-'}</div>
        </div>
      </div>
      {mapApiKey && (
        <APIProvider apiKey={mapApiKey}>
          <Map
            defaultCenter={position}
            defaultZoom={13}
            mapId="9b0a2c44ded1af0e"
            style={{
              width: '100vw',
              height: '100vh',
              zIndex: '0',
              position: 'relative',
            }}>
            {markers.map((item) => (
              <MapMarker
                key={item.id} // Assuming each marker has a unique id
                lat={item.latitude}
                lng={item.longitude}
                shipperTrackingInfo={
                  <div
                    style={{
                      height: '40px',
                      width: '140px',
                      backgroundColor: '#FFF',
                      borderRadius: '30px',
                      justifyContent: 'center',
                      padding: '10px',
                    }}>
                    {item.driver}
                    <br /> {item.numberPlate}
                  </div>
                }
              />
            ))}
          </Map>
        </APIProvider>
      )}
    </div>
  );
};

export default ShipperTracking;
