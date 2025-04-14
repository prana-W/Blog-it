import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, authentication = true }) {
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }

    setLoader(false);
  }, [authentication, authStatus, navigate]);

  return loader ? (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-xl font-medium text-gray-800 dark:text-gray-200 animate-pulse">
        Loading...
      </h1>
    </div>
  ) : (
    <>{children}</>
  );
}

export default AuthLayout;
