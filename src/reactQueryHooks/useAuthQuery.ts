import axios from "axios";
import { useQuery } from "react-query";
import { Auth } from "../types/authTypes";

export const useAuthQuery = () => {
  const getProfile = async () => {
    const { data } = await axios.get<Auth>(
      `${process.env.REACT_APP_REST_URL}api/profile/`,
      {
        headers: {
          Authorization: `token ${localStorage.token}`,
        },
      }
    );
    return data;
  };
  return useQuery<Auth, Error>({
    queryKey: "profiles",
    queryFn: getProfile,
    staleTime: 0,
  });
};
