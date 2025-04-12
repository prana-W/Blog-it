import React from "react";
import LogoutBtn from "../LogoutBtn";
import store from "../../store/store";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Login, Signup } from "../../../Pages";

function Header() {
  const isLoggedin = useSelector((state) => state.auth.status);
  const navigate = useNavigate()

  const navItems = [
    {
      name: "Home",
      slug: "",
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
    <>
      <div>Header</div>

      {navItems.map((item) => (item.active ? <li key={item.slug}><button onClick={() => {
        navigate(item.slug)
      }}>{item.name}</button></li> : null))}

      {isLoggedin ? (<li key = {Math.random()}><LogoutBtn /></li>) : (null)}
    </>
  );
}

export default Header;
