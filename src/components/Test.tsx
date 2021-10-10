import { VFC } from "react";
import { Brand, Segment } from "../types/vehicleTypes";
import { useQueryClient } from "react-query";

export const Test: VFC = () => {
  const queryClient = useQueryClient();
  const segments = queryClient.getQueryData<Segment[]>("segments");
  const brands = queryClient.getQueryData<Brand[]>("brands");

  return (
    <div>
      <ul>
        {segments?.map((seg) => (
          <div key={seg.id}>{seg.segment_name}</div>
        ))}
      </ul>
      <ul>
        {brands?.map((brand) => (
          <li key={brand.id}>{brand.brand_name}</li>
        ))}
      </ul>
    </div>
  );
};
