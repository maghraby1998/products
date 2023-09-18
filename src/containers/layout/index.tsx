import { NavLink, Outlet } from "react-router-dom";

const links = [
  { label: "home", to: "/" },
  { label: "products", to: "/products" },
];

const Layout = () => {
  return (
    <div>
      <div className="sidebar min-h-screen min-w-[100px] bg-[#333] absolute left-0 top-0">
        {links.map((link) => (
          <NavLink
            className={({ isActive }) =>
              `h-[80px] block flex items-center justify-center capitalize text-white ${
                isActive ? "bg-slate-500" : ""
              }`
            }
            to={link.to}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
