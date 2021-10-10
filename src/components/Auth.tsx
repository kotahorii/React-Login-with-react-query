import { VFC } from "react";
import styles from "./Auth.module.css";
import FlipCameraAndroidIcon from "@material-ui/icons/FlipCameraAndroid";
import { useMutateAuth } from "../reactQueryHooks/useAuthMutations";
import { useState } from "react";
import { FormEvent } from "react";

export const Auth: VFC = () => {
  const {
    createTokenMutate,
    registerMutate,
    username,
    password,
    setUsername,
    setPassword,
  } = useMutateAuth();

  const [isLogin, setIsLogin] = useState(true);

  const authUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      createTokenMutate.mutate({ username: username, password: password });
    } else {
      registerMutate.mutate({ username: username, password: password });
    }
  };
  return (
    <div className={styles.auth__root}>
      <form onSubmit={authUser}>
        <div className={styles.auth__input}>
          <label data-testid="label-username">Username: </label>
          <input
            type="text"
            data-testid="input-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            data-testid="input-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
        <div>
          <FlipCameraAndroidIcon
            data-testid="toggle-icon"
            className={styles.auth__toggle}
            onClick={() => setIsLogin(!isLogin)}
          />
        </div>
      </form>
    </div>
  );
};
