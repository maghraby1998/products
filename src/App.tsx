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
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useState } from "react";

// const isLoggedIn = false;

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     isLoggedIn ? (
//       <Route path="/" element={<Layout />}>
//         <Route path="products" element={<Products />} />
//       </Route>
//     ) : (
//       <Route path="/">
//         <Route index element={<Navigate to={"/login"} />} />
//         <Route path="login" element={<Login />} />
//         <Route path="*" element={<Navigate to={"/login"} />} />
//       </Route>
//     )
//   )
// );

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <PrimeReactProvider>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            isLoggedIn ? (
              <Route path="/" element={<Layout />}>
                <Route index element={<div>home page</div>} />
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
