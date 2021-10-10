import axios from "axios";
import { useQuery } from "react-query";
import { Segment } from "../types/vehicleTypes";

export const useQuerySegments = () => {
  const getSegments = async () => {
    const { data } = await axios.get<Segment[]>(
      `${process.env.REACT_APP_REST_URL}api/segments/`,
      {
        headers: {
          Authorization: `token ${localStorage.token}`,
        },
      }
    );
    return data;
  };
  return useQuery<Segment[], Error>({
    queryKey: "segments",
    queryFn: getSegments,
    staleTime: Infinity,
  });
};
