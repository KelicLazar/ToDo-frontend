import "./App.css";
import Auth from "./pages/Auth";
import Todos from "./pages/Todos";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/use-auth";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";
import Navigation from "./shared/components/Navigation";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <>
          <Navigation />
          <Outlet />
        </>
      }
    >
      <Route path="auth" element={<Auth />} />
      <Route path="todos" element={<Todos />} />
    </Route>
  )
);

function App() {
  const { token, user, login, logout } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        user,
        login,
        logout,
      }}
    >
      <RouterProvider router={router}></RouterProvider>
    </AuthContext.Provider>
  );
}

export default App;
