import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { MapMarker } from "../ui/MapMarker";
import { useEffect, useState } from "react";

const Tracking = () => {
  const [mapApiKey, setMapApiKey] = useState("");

  useEffect(() => {
    setMapApiKey(import.meta.env.VITE_GOOGLE_MAP_API_KEY);
  }, []);
  console.log(mapApiKey);
  const position = { lat: 24.686111, lng: 46.827661 };

  const markers = [
    {
      lng: 46.72672,
      lat: 24.75635,
      title: "Marker 1",
      icon: "assets/ic-tracker.svg",
      content: (
        <div className="custom-marker">
          <span style={{ fontWeight: "800" }}>Ahmed Yasir</span>
          <br /> 5675 LSD
        </div>
      ),
    },
    {
      lng: 46.6505,
      lat: 24.75011,
      title: "Marker 2",
      icon: "assets/ic-tracker.svg",
      content: (
        <div className="custom-marker">
          <span style={{ fontWeight: "800" }}>Ahmed Yasir</span>
          <br /> 5675 LSD
        </div>
      ),
    },
    {
      lng: 46.78216,
      lat: 24.74013,
      title: "Marker 3",
      icon: "assets/ic-tracker.svg",
      content: (
        <div className="custom-marker">
          <span style={{ fontWeight: "800" }}>Ahmed Yasir</span>
          <br /> 5675 LSD
        </div>
      ),
    },
    {
      lng: 46.67659,
      lat: 24.67463,
      title: "Marker 3",
      icon: "assets/ic-tracker.svg",
      content: (
        <div className="custom-marker">
          <span style={{ fontWeight: "800" }}>Ahmed Yasir</span>
          <br /> 5675 LSD
        </div>
      ),
    },
  ];

  return (
    <APIProvider apiKey={mapApiKey}>
      <Map
        defaultCenter={position}
        defaultZoom={13}
        mapId="9b0a2c44ded1af0e"
        style={{
          width:"calc(100vw - 360px)",
          height: "calc(100vh - 90px)",
          marginTop:"15px",
          // zIndex: "0",
          position: "absolute",
        }}
      >
        {markers.map((item) => (
          <MapMarker
            lat={item.lat}
            lng={item.lng}
            infoWindowText={item.content}
          />
        ))}
      </Map>
    </APIProvider>
  );
};

export default Tracking;
