import { ReactNode } from 'react';
import { AdvancedMarker, InfoWindow, Pin, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import MarkerImage from '../../assets/icons/ic-tracker.svg';
import { Image } from 'react-bootstrap';

interface MapMarkerParams {
  lat: number;
  lng: number;
  numberPlate?: string;
  driver?: string;
  shipperTrackingInfo?: ReactNode;
  infoWindowText?: JSX.Element;
}
export const MapMarker: React.FC<MapMarkerParams> = ({ lat, lng, numberPlate, driver, shipperTrackingInfo }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker ref={markerRef} position={{ lat: lat, lng: lng }}>
        {shipperTrackingInfo ? (
          <Pin>{shipperTrackingInfo}</Pin>
        ) : (
          <Pin>
            <Image src={MarkerImage} />
          </Pin>
        )}
      </AdvancedMarker>
      {shipperTrackingInfo == undefined && (
        <InfoWindow anchor={marker} maxWidth={200}>
          <div className="custom-marker">
            <span style={{ fontWeight: '800' }}>{driver}</span>
            <br /> {numberPlate}
          </div>
        </InfoWindow>
      )}
    </>
  );
};
