import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { MapMarker } from "../ui/MapMarker";
import React, { useEffect, useState } from "react";
import { IOrderDetail } from "@/interface/orderDetail";
import { useLocation } from "react-router-dom";

interface IShipperTracking {
  orderObject?: IOrderDetail;
}
const ShipperTracking: React.FC<IShipperTracking> = () => {
  const [mapApiKey, setMapApiKey] = useState("");
  // const [selectedOrder, setSelectedOrder] = useState<IOrderDetail>();

  const location = useLocation();
  const { state } = location;

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
          borderRadius: "16px",
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
          <div>{state.orderObject && state.orderObject.id}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "16px",
          }}
        >
          <div style={{ fontWeight: "600" }}>Origin:</div>
          <div>{state.orderObject && state.orderObject.originCity.name}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "16px",
          }}
        >
          <div style={{ fontWeight: "600" }}>Distination:</div>
          <div>
            {state.orderObject && state.orderObject.destinationCity.name}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "16px",
          }}
        >
          <div style={{ fontWeight: "600" }}>Weight</div>
          <div>{state.orderObject && state.orderObject.weight}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "16px",
          }}
        >
          <div style={{ fontWeight: "600" }}>Dimensions:</div>
          <div>
            {state.orderObject &&
              state.orderObject.length +
                "x" +
                state.orderObject.width +
                "x" +
                state.orderObject.height}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "16px",
          }}
        >
          <div style={{ fontWeight: "600" }}>Estimated Delivery Date:</div>
          <div>
            {state.orderObject && state.orderObject.preferredDeliveryDate
              ? state.orderObject.preferredDeliveryDate
              : "-"}
          </div>
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

export default ShipperTracking;
