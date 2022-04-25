import { LatLngTuple } from "leaflet";

export interface Item {
  loc: LatLngTuple;
  time: string;
}

export type QueryType = "24h" | "all";