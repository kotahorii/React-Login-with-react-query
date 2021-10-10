import axios from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import { Auth } from "../types/authTypes";
import { useState } from "react";

export const useMutateAuth = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const createTokenMutate = useMutation(
    (auth: unknown) =>
      axios.post(`${process.env.REACT_APP_REST_URL}api/auth/`, auth, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
    {
      onSuccess: (res: any) => {
        localStorage.setItem("token", res.data.token as string);
        history.push("/vehicle");
      },
    }
  );
  const registerMutate = useMutation(
    (auth: Auth) =>
      axios.post<Auth>(`${process.env.REACT_APP_REST_URL}api/create/`, auth, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
    {
      onSuccess: () => {
        createTokenMutate.mutate({ username: username, password: password });
      },
    }
  );
  return {
    createTokenMutate,
    registerMutate,
    username,
    password,
    setUsername,
    setPassword,
  };
};
