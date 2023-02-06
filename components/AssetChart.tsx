import { FC } from "react";
import { Item } from "../lib/types";
import { LineChart, Line, XAxis, Tooltip, YAxis } from "recharts";

export const AssetChart: FC<{ items: Item[] }> = ({ items }) => {
  const data = items.map((item) => ({
    battery: item.battery ? parseInt(item.battery, 10) : -1,
    temperature: item.temperature, // ? parseInt(item.temperature, 10) : -1,
  }));

  return (
    <div className="chart">
      <LineChart width={500} height={150} data={data}>
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="battery"
          stroke="#8884d8"
        />
        <YAxis yAxisId="left" orientation="left" label="%" width={75} />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="temperature"
          stroke="#888400"
        />
        <YAxis yAxisId="right" orientation="right" label="°C" width={75} />
        <XAxis dataKey="time" />
        <Tooltip
          formatter={(value, name) => {
            if (name === "battery") {
              return `${value}%`;
            }
            if (name === "temperature") {
              return `${value}°C`;
            }
            return value;
          }}
        />
      </LineChart>
    </div>
  );
};
