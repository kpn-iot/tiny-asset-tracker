import Head from "next/head";
import { FC } from "react";
import { MapContainer } from "react-leaflet";
import MapContent from "./MapContent";
import { useLocQuery } from "./useLocQuery";

const Map: FC = () => {
  const { coords, update, isLoading } = useLocQuery();

  return (
    <div>
      <Head>
        <title>lora-track</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛰️</text></svg>"
        />
      </Head>
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
