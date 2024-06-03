import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { MapMarker } from '../ui/MapMarker';
import { useEffect, useState } from 'react';
import { useGetOrderTrackingsQuery } from '@/services/tracking';
import { IMarkers } from '@/interface/common';

const Tracking = () => {
  const [mapApiKey, setMapApiKey] = useState(undefined);
  const [markers, setMarkers] = useState<IMarkers[]>([]);
  const [position, setPosition] = useState({ lat: 24.686111, lng: 46.827661 });

  const { data: orderTracking, isLoading: isLoadingOrderTracking } = useGetOrderTrackingsQuery({});
  useEffect(() => {
    setMapApiKey(import.meta.env.VITE_GOOGLE_MAP_API_KEY);
    console.log('import.meta.env.VITE_GOOGLE_MAP_API_KEY', import.meta.env.VITE_GOOGLE_MAP_API_KEY);
  }, []);
  useEffect(() => {
    if (!isLoadingOrderTracking) {
      setMarkers(orderTracking);
      if (orderTracking?.length > 0) {
        setPosition({ lat: orderTracking[0].latitude, lng: orderTracking[0].longitude });
      }
    }
  }, [isLoadingOrderTracking]);

  return (
    <APIProvider apiKey={mapApiKey}>
      <Map
        defaultCenter={position}
        defaultZoom={13}
        mapId="9b0a2c44ded1af0e"
        style={{
          width: 'calc(100vw - 360px)',
          height: 'calc(100vh - 90px)',
          marginTop: '15px',
          position: 'absolute',
        }}>
        {markers.map((item) => (
          <MapMarker lat={item.latitude} lng={item.longitude} driver={item.driver} numberPlate={item.numberPlate} />
        ))}
      </Map>
    </APIProvider>
  );
};

export default Tracking;
