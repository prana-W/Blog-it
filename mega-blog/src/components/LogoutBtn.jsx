import React from "react";
import authService from "../appwrite/auth";

function LogoutBtn() {
  const logOut = () => {
    const response = authService.logout();

    if (!response) {
      alert("There was a problem in logging out!");
    }
  };
  return <button onClick={logOut}>Logout</button>;
}

export default LogoutBtn;
