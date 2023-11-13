import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./containers/layout";
import Login from "./containers/login";
import Products from "./containers/products";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useState } from "react";
import Home from "./containers/home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <PrimeReactProvider>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            isLoggedIn ? (
              <Route
                path="/"
                element={<Layout setIsLoggedIn={setIsLoggedIn} />}
              >
                <Route index element={<Home />} />
                <Route path="products" element={<Products />} />
              </Route>
            ) : (
              <Route path="/">
                <Route index element={<Navigate to={"/login"} />} />
                <Route
                  path="login"
                  element={<Login setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route path="*" element={<Navigate to={"/login"} />} />
              </Route>
            )
          )
        )}
      />
    </PrimeReactProvider>
  );
}

export default App;
