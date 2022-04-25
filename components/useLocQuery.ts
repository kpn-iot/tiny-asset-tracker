import { useEffect, useState } from "react";
import { Item, QueryType } from "./types";

const UPDATE_INTERVAL = 1000 * 60 * 60; // 1000 ms / 60 seconds / 60 minutes = 1x per hour

// TODO remove type=24h
const getCoords = async (type: string) => {
  const result = await fetch(`/api/coords?type=${type}`);
  const json: { data: Item[] } = await result.json();
  //   console.log(json);
  return json.data;
};

export const useLocQuery = () => {
  const [coords, setCoords] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [queryType, setQueryType] = useState<QueryType>("24h");

  const update = async (type: string): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await getCoords(type);
      if (result.length > 0) {
        setCoords(result);
      }
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const toggleQueryType = () => {
    const newType = queryType === "all" ? "24h" : "all";
    setQueryType(newType);
    update(newType);
  };

  useEffect(() => {
    update(queryType);
    // Auto-update
    const interval = setInterval(() => {
      update(queryType);
    }, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return { coords, update, isLoading, toggleQueryType, queryType };
};
