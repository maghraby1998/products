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
import { useEffect, useState } from "react";
import Home from "./containers/home";
import UsersList from "./containers/UsersList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [dir, setDir] = useState("ltr");

  const handleToggleDir = () => {
    setDir((prev) => (prev == "ltr" ? "rtl" : "ltr"));
  };

  useEffect(() => {
    const adjustFeedbackButton = () => {
      const feedbackButton = document.querySelector("._hj-fb") as any;

      if (feedbackButton) {
        const isRTL = dir == "rtl";

        if (isRTL) {
          // Move button to "Middle Left" for RTL layout
          feedbackButton.style.right = "unset";
          feedbackButton.style.left = "20px"; // Adjust as needed
        } else {
          // Default: "Middle Right"
          feedbackButton.style.left = "unset";
          feedbackButton.style.right = "20px"; // Adjust as needed
        }
      }
    };

    // Periodically check for the Hotjar button (as it loads dynamically)
    const interval = setInterval(() => {
      adjustFeedbackButton();
    }, 500);

    // Clean up the interval
    return () => clearInterval(interval);
  }, []);

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
                <Route path="users" element={<UsersList />} />
              </Route>
            ) : (
              <Route path="/">
                <Route index element={<Navigate to={"/login"} />} />
                <Route
                  path="login"
                  element={
                    <Login
                      setIsLoggedIn={setIsLoggedIn}
                      handleToggleDir={handleToggleDir}
                    />
                  }
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
