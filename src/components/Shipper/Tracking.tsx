import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { MapMarker } from "../Carrier/MapMarker";
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
      lng: 46.796315045962444,
      lat: 24.725669644462503,
      title: "Marker 1",
      icon: "",
      shipp: (
        <div>
          <span style={{ fontWeight: "800" }}>Ahmed Yasir</span>
          <br /> 5675 LSD
        </div>
      ),
    },
    {
      lng: 46.815,
      lat: 24.666,
      title: "Marker 2",
      icon: "",
      content: (
        <div style={{ backgroundColor: "#FFF" }}>
          <span style={{ fontWeight: "800" }}>Ahmed Yasir</span>
          <br /> 5675 LSD
        </div>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          width: "430px",
          height: "285px",
          borderRadius: "16px 0px 0px 0px",
          position: "absolute",
          zIndex: "2",
          backgroundColor: "#FFF",
          padding: "20px",
          margin: "20px 0 0 20px",
        }}
      >
        <span
          style={{
            fontFamily: "Roboto",
            fontSize: "18px",
            fontWeight: "600",
            lineHeight: "21.09px",
            textAlign: "left",
            color: "#0060B8",
          }}
        >
          Order Details
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "16px",
            marginTop: "20px",
          }}
        >
          <div style={{ fontWeight: "600" }}>Order number</div>
          <div>CA12M0998</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "16px",
          }}
        >
          <div style={{ fontWeight: "600" }}>Origin:</div>
          <div>Qatar</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "16px",
          }}
        >
          <div style={{ fontWeight: "600" }}>Distination:</div>
          <div>Saudi Arabia</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "16px",
          }}
        >
          <div style={{ fontWeight: "600" }}>Weight</div>
          <div>25.6kG</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "16px",
          }}
        >
          <div style={{ fontWeight: "600" }}>Dimensions:</div>
          <div>25x30x25</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "16px",
          }}
        >
          <div style={{ fontWeight: "600" }}>Estimated Delivery Date:</div>
          <div>CA12M0998</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "16px",
          }}
        >
          <div style={{ fontWeight: "600" }}>Order number</div>
          <div>25-Sep-2024</div>
        </div>
      </div>
      <APIProvider apiKey={mapApiKey}>
        <Map
          defaultCenter={position}
          defaultZoom={13}
          mapId="9b0a2c44ded1af0e"
          style={{
            width: "100vw",
            height: "100vh",
            zIndex: "0",
            position: "relative",
          }}
        >
          {markers.map((item) => (
            <MapMarker
              lat={item.lat}
              lng={item.lng}
              shipperTrackingInfo={
                <div
                  style={{
                    height: "40px",
                    width: "140px",
                    backgroundColor: "#FFF",
                    borderRadius: "30px",
                    justifyContent: "center",
                    padding: "10px",
                  }}
                >
                  Al Manar
                  <br /> Some where in Arabia
                </div>
              }
            />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
};

export default Tracking;
