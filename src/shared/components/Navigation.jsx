import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { Link } from "react-router-dom";

const Navigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className="navigation">
      <h1>ToDo App</h1>
      <ul>
        <li></li>
        {authCtx.isLoggedIn && (
          <li>
            <Link to="/todos">Todos</Link>
          </li>
        )}

        {authCtx.isLoggedIn && <li onClick={authCtx.logout}>Odjavi se</li>}
        {!authCtx.isLoggedIn && (
          <li>
            <Link to="/auth">Prijavi se</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navigation;
