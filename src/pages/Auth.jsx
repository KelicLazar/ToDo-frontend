import { useState, useContext } from "react";
import "./Auth.css";
import { useHttpClient } from "../shared/hooks/use-http";
import { AuthContext } from "../shared/context/auth-context";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../shared/components/ErrorModal";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, clearError, sendRequest } = useHttpClient();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const submitFormHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "users/log-in",
          "POST",
          JSON.stringify({
            email: email,
            password: password,
          }),
          { "Content-Type": "application/json" }
        );
        authCtx.login(responseData.userData, responseData.token);
        navigate("/todos", { replace: true });
      } catch (err) {}
    } else {
      console.log("request sent", name, email, password);
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "users/sign-up",
          "POST",
          JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
          { "Content-Type": "application/json" }
        );
        console.log(responseData);
        authCtx.login(responseData.userData, responseData.token);
        navigate("/todos", { replace: true });
      } catch (err) {}
    }
  };
  return (
    <div className="authentication">
      <ErrorModal error={error} onClear={clearError} />
      <div className="auth-mode">
        <div
          className={`auth  ${isLoginMode && "active"}`}
          onClick={() => {
            setIsLoginMode(true);
          }}
        >
          <h3>Uloguj se</h3>
        </div>
        <div
          className={`auth  ${!isLoginMode && "active"}`}
          onClick={() => {
            setIsLoginMode(false);
          }}
        >
          <h3>Registruj se</h3>
        </div>
      </div>

      <form className="auth-form" onSubmit={submitFormHandler}>
        {!isLoginMode && (
          <>
            <label htmlFor="name">Username</label>
            <input
              onChange={(event) => {
                setName(event.target.value);
              }}
              id="name"
              type="text"
            ></input>
          </>
        )}
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
        <button type="submit">
          {isLoginMode ? "Uloguj se" : "Registruj se"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
