import { LatLngTuple } from "leaflet";

export interface Item {
  loc: LatLngTuple;
  time: string;
  battery: string | null;
  temperature: number | null;
}
