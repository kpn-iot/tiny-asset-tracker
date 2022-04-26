import { FC } from "react";
import { MapContainer } from "react-leaflet";
import MapContent from "./MapContent";
import { useLocQuery } from "./useLocQuery";

const Map: FC = () => {
  const { coords, update, isLoading } = useLocQuery();

  return (
    <div>
      <MapContainer
        zoom={20}
        //   scrollWheelZoom={false}
      >
        <MapContent coords={coords} />
      </MapContainer>
      <div className="custom-controls">
        <button onClick={() => update()} disabled={isLoading}>
          update
        </button>
      </div>
    </div>
  );
};

export default Map;
