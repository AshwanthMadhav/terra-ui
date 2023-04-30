import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContexts";

function Header() {
  const { auth, setAuth } = useContext(AuthContext);

  const handleLogout = () => {
    setAuth(null);
  };

  return (
    <header className="bg-gray-800 py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white font-bold text-xl">
          My App
        </a>
        <ul className="flex">
          <li className="ml-6">
            <Link to="/" className="text-white">
              Home
            </Link>
          </li>
          {!auth?.isLoggedIn ? (
            <>
              <li className="ml-6">
                <Link to="/login" className="text-white">
                  Login
                </Link>
              </li>
              <li className="ml-6">
                <Link to="/register" className="text-white">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="ml-6">
                <Link to="/images" className="text-white">
                  Images
                </Link>
              </li>
              <li className="ml-6">
                <Link to="/login" className="text-white" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
