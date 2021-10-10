import axios from "axios";
import { useQuery } from "react-query";
import { Vehicle } from "../types/vehicleTypes";

export const useQueryVehicles = () => {
  const getVehicles = async () => {
    const { data } = await axios.get<Vehicle[]>(
      `${process.env.REACT_APP_REST_URL}api/vehicles/`,
      {
        headers: {
          Authorization: `token ${localStorage.token}`,
        },
      }
    );
    return data;
  };
  return useQuery<Vehicle[], Error>({
    queryKey: "vehicles",
    queryFn: getVehicles,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};
