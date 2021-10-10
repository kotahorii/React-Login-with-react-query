import { VFC } from "react";
import { useHistory } from "react-router";

export const MainPage: VFC = () => {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <div>
      <button data-testid="btn-logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
};
