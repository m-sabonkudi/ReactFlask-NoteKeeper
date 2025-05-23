import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import HighlightIcon from '@mui/icons-material/Highlight';


function Header() {
  const { logged, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogout(event) {
    event.preventDefault()
    await logout();
    navigate("/login");
  };

  return (
      <div className="header flex items-center justify-between p-4 bg-gray-100">
        <Link to="/" className="text-lg">
        <h1 className="text-keeper inline"><HighlightIcon />Keeper</h1>
        </Link>

      {!logged ? <div className="ml-auto flex gap-4">
          <Link to="/register" className="text-lg">Register</Link>
          <Link to="/login" className="text-lg">Login</Link>
        </div>
        : <div className="ml-auto flex gap-4">
          <Link onClick={handleLogout} >Logout</Link>
        </div>
        }
      </div>
  );
}

export default Header;
