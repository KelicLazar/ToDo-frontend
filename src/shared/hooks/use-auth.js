import { useEffect, useCallback, useState } from "react";
let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState();
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [user, setUser] = useState(null);

  const login = useCallback((user, token, expirationDate) => {
    console.log("login running");
    setToken(token);
    setUser(user);
    console.log(user);
    const tokenExpDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpDate);
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        user,
        token,
        expiration: tokenExpDate.toISOString(),
      })
    );
  }, []);
  const logout = useCallback(() => {
    console.log("logout running");
    setToken(null);
    setTokenExpirationDate(null);
    setUser(null);
    localStorage.removeItem("userInfo");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userInfo"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.user, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  return { token, user, login, logout };
};
