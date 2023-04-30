import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContexts";
const Welcome = () => {
  const { auth, setAuth } = useContext(AuthContext);
  return (
    <div className="flex flex-col items-center justify-center pt-48">
      {auth?.isLoggedIn && (
        <h1 className="text-5xl font-bold text-gray-800 mb-8">Hi Buddy</h1>
      )}
      <h1 className="text-5xl font-bold text-gray-800 mb-8">
        Welcome to Gallery
      </h1>
      {!auth?.isLoggedIn && (
        <p className="text-lg text-gray-600 mb-8">
          Please{" "}
          <Link to="/login" className="text-blue-500">
            Signin
          </Link>
        </p>
      )}
    </div>
  );
};

export default Welcome;
