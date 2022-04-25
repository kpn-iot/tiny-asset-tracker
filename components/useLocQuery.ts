import { useEffect, useState } from "react";
import { Item } from "../lib/types";

const UPDATE_INTERVAL = 1000 * 60 * 60; // 1000 ms / 60 seconds / 60 minutes = 1x per hour

const getCoords = async () => {
  const result = await fetch(`/api/coords`);
  const json: { data: Item[] } = await result.json();
  //   console.log(json);
  return json.data;
};

export const useLocQuery = () => {
  const [coords, setCoords] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [queryType, setQueryType] = useState<QueryType>("24h");

  const update = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await getCoords();
      if (result.length > 0) {
        setCoords(result);
      }
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  // const toggleQueryType = () => {
  //   const newType = queryType === "all" ? "24h" : "all";
  //   setQueryType(newType);
  //   update(newType);
  // };

  useEffect(() => {
    update();
    // Auto-update
    const interval = setInterval(() => {
      update();
    }, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return { coords, update, isLoading };
};
