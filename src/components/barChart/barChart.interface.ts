export interface DataPoint {
    month: string;
    sessions: number;
    [key: string]: string | number | null | undefined;
  }
  
export interface TickPlacementBarsProps {
    dataset: DataPoint[];
  }