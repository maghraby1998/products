import React, { Dispatch, SetStateAction } from "react";
import { NavLink, Outlet } from "react-router-dom";

const links = [
  { label: "home", to: "/" },
  { label: "products", to: "/products?limit=5" },
  { label: "users", to: "/users" },
];
interface Props {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const Layout: React.FC<Props> = ({ setIsLoggedIn }) => {
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <div className="min-h-screen min-w-[100px] bg-[#333] fixed left-0 top-0 flex flex-col justify-between">
        <div>
          {links.map((link, index) => (
            <NavLink
              key={index}
              className={({ isActive }) =>
                `h-[80px] block flex items-center justify-center capitalize text-white ${
                  isActive ? "bg-slate-500" : "hover:bg-slate-500/30"
                }`
              }
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="h-[80px] w-full block flex items-center justify-center capitalize text-white bg-[red]/80 hover:bg-[red]"
        >
          logout
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
