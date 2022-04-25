import { DivIcon, LatLngTuple, polygon } from "leaflet";
import { FC, useEffect, useState } from "react";
import { TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import { Item } from "../lib/types";

const DEFAULT_CENTER: LatLngTuple = [52, 5.1];

const TILES_LAYER_DEFAULT =
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILES_LAYER_BW = "https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png";
// Source: https://leaflet-extras.github.io/leaflet-providers/preview/
const TILES_LAYER_DARK =
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

interface Props {
  coords: Item[];
}

const MapContent: FC<Props> = ({ coords }) => {
  const [marker, setMarker] = useState<Item | null>(null);
  const [count, setCount] = useState(0);
  const map = useMap();

  useEffect(() => {
    const updateBoundsAndMarker = () => {
      if (coords.length > 0) {
        const newPoly = polygon(coords.map(({ loc }) => loc));
        map.fitBounds(newPoly.getBounds());
        const last = coords[coords.length - 1];
        setMarker(last);
        const sameCoords = coords.filter(({loc}) => {
          return loc[0] === marker?.loc[0] && loc[1] === marker.loc[1];
        });
        setCount(sameCoords.length);
      }
    };

    updateBoundsAndMarker();
  }, [coords, map, marker]);

  const countBadge =
    count > 0
      ? `<div style='color: white; display: block; background-color: red; border-radius: 50%; position: absolute; height: 1rem; width: 1rem; right: 0; text-align: center;'>${count}</div>`
      : "";

  // https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png
  // <img src="https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png" class="leaflet-marker-icon leaflet-zoom-animated leaflet-interactive" alt="Marker" tabindex="0" role="button" style="margin-left: -12px; margin-top: -41px; width: 25px; height: 41px; transform: translate3d(844px, 401px, 0px); z-index: 401;"></img>
  const customMarker: DivIcon = new DivIcon({
    className: "my-div",
    html: `<div style="position: relative">
    <img src="https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png" class="leaflet-marker-icon leaflet-zoom-animated leaflet-interactive" alt="Marker" tabindex="0" role="button" />
    ${countBadge}
    </div>`,
  });

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={TILES_LAYER_DARK}
      />
      <Polyline positions={coords.map((coord) => coord.loc)} />
      {marker && (
        <Marker position={marker.loc} icon={customMarker}>
          <Popup>{new Date(marker.time).toLocaleString("nl-nl")}</Popup>
        </Marker>
      )}
    </>
  );
};

export default MapContent;
