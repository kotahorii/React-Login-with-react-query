import { Grid } from "@material-ui/core";
import { VFC } from "react";
import { useHistory } from "react-router";
import { useAuthQuery } from "../reactQueryHooks/useAuthQuery";
import { Brand } from "./Brand";
import styles from "./MainPage.module.css";
import { Segment } from "./Segment";
import { Vehicle } from "./Vehicle";

export const MainPage: VFC = () => {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  const { data, status } = useAuthQuery();

  if (status === "loading") return <div>{"Loading..."}</div>;
  if (status === "error") return <div>{"Error"}</div>;
  return (
    <div className={styles.mainPage__root}>
      <Grid container>
        <Grid item xs>
          {data?.username}
        </Grid>
        <Grid item xs>
          <span data-testid="span-title" className={styles.mainPage__title}>
            Vehicle register system
          </span>
        </Grid>
        <Grid item xs>
          <button data-testid="btn-logout" onClick={logout}>
            Logout
          </button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}>
          <Segment />
        </Grid>
        <Grid item xs={3}>
          <Brand />
        </Grid>
        <Grid item xs={6}>
          <Vehicle />
        </Grid>
      </Grid>
    </div>
  );
};
