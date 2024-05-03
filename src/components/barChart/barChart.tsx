import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import {TickPlacementBarsProps} from "../barChart/barChart.interface"

const valueFormatter = (value: number | null) => `${value}`;

const chartSetting = {
  yAxis: [
    {
      label: 'Sessions',
      min: 0,
      max: 20,
    },
  ],
  series: [
    {
      dataKey: 'sessions',
      label: 'Sessions',
      valueFormatter,
      color: '#231E5B',
    },
  ],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

const TickPlacementBars: React.FC<TickPlacementBarsProps> = ({ dataset }) => {
  const [tickLabelPlacement, setTickLabelPlacement] = React.useState<'middle' | 'tick'>('middle');

  return (
    <div style={{ width: '100%' }}>
      <BarChart
        dataset={dataset}
        xAxis={[
          {
            scaleType: 'band',
            dataKey: 'month',
            tickLabelPlacement,
          },
        ]}
        {...chartSetting}
      />
    </div>
  );
};

export default TickPlacementBars;