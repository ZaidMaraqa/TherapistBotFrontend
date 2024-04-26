import React from "react";
import { Gauge } from "@mui/x-charts/Gauge";
import { Box } from "@mui/material";
import { GaugeChartProps } from "../gaugeChart/gaugeChart";

export default function GaugeChart({ value,max }: GaugeChartProps) {
  return (
    <Box
      sx={{
        width: "13.5rem",
        height: "13.5rem",
        position: "relative",
        fontSize: "3rem",
      }}
    >
      <Gauge
        value={value}
        startAngle={0}
        endAngle={360}
        innerRadius="80%"
        outerRadius="100%"
        color="#231E5B"
        label={null}
        max={max}
      />
    </Box>
  );
}
