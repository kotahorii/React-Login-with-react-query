import React from "react";
import styles from "./App.module.css";
import { VFC } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Auth } from "./components/Auth";
import { MainPage } from "./components/MainPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App: VFC = () => {
  return (
    <div className={styles.app__root}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Auth />
            </Route>
            <Route exact path="/vehicle">
              {localStorage.token ? <MainPage /> : <Redirect to="/" />}
            </Route>
          </Switch>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
};

export default App;
