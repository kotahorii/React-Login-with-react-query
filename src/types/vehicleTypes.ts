export type Segment = {
  id?: number;
  segment_name: string;
};

export type Brand = {
  id?: number;
  brand_name: string;
};

export type Vehicle = {
  id?: number;
  user?: string;
  vehicle_name: string;
  release_year: number;
  price: number;
  segment?: number;
  segment_name?: string;
  brand?: number;
  brand_name?: string;
};
