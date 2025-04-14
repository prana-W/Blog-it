import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useDispatch } from "react-redux";
import React from "react";
import authService from "./appwrite/auth";
import {login, logout} from './store/authSlice'

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login(userData));
        else dispatch(logout());
      })
      .finally(setLoading(false));
  }, []);

  return !loading ? (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ) : (
    <div className="loading">
      <h1>Loading...</h1>
    </div>
  );
}

export default App;
