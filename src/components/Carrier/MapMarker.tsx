import { JSXElementConstructor } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import MarkerImage from "../../assets/icons/ic-tracker.svg";
import { Image } from "react-bootstrap";

interface MapMarkerParams {
  lat: number;
  lng: number;
  infoWindowText: JSXElementConstructor;
}
export const MapMarker: React.FC<MapMarkerParams> = ({
  lat,
  lng,
  infoWindowText,
}) => {
  //   const [infowindowOpen, setInfowindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker ref={markerRef} position={{ lat: lat, lng: lng }}>
        <Pin><Image src={MarkerImage}/></Pin>
      </AdvancedMarker>
      <InfoWindow anchor={marker} maxWidth={200}>
        {infoWindowText}
      </InfoWindow>
    </>
  );
};
