import React from "react";
import LogoutBtn from "../LogoutBtn";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const isLoggedin = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "About",
      slug: "/about",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !isLoggedin,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !isLoggedin,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: isLoggedin,
    },
    {
      name: "Add Post",
      slug: "/add-posts",
      active: isLoggedin,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 p-4 shadow-md">
      <nav>
        <ul className="flex space-x-4">
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.slug}>
                  <NavLink
                    to={item.slug}
                    className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-200"
                  >
                    {item.name}
                  </NavLink>
                </li>
              )
          )}
          {isLoggedin && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;