import React from "react";
import authService from "../appwrite/auth";
import {logout} from '../store/authSlice'
import { useDispatch } from "react-redux";

function LogoutBtn() {

  const dispatch = useDispatch()

  const logOut = () => {
    authService.logout()
    .then(() => {
      dispatch(logout())
    })
    .catch ((error) => {
      console.error("Error logging out:", error);
    });    

  };
  return <button onClick={logOut}>Logout</button>;
}

export default LogoutBtn;
