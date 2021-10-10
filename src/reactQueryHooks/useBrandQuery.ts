import axios from "axios";
import { useQuery } from "react-query";
import { Brand } from "../types/vehicleTypes";

export const useQueryBrands = () => {
  const getBrands = async () => {
    const { data } = await axios.get<Brand[]>(
      `${process.env.REACT_APP_REST_URL}api/brands/`,
      {
        headers: {
          Authorization: `token ${localStorage.token}`,
        },
      }
    );
    return data;
  };
  return useQuery<Brand[], Error>({
    queryKey: "brands",
    queryFn: getBrands,
    staleTime: Infinity,
  });
};
