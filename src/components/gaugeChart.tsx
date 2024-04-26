import React from "react";
import { Gauge } from "@mui/x-charts/Gauge";
import { Box } from "@mui/material";

export default function GaugeChart() {
  return (
    <Box sx={{ width: "12.5rem", height: "12.5rem" }}>
      <Gauge
        value={75}
        startAngle={0}
        endAngle={360}
        innerRadius="80%"
        outerRadius="100%"
      />
    </Box>
  );
}
