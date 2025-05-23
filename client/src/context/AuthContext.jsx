// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [logged, setLogged] = useState(null);

  // On mount, check login status
  useEffect(() => {
    async function getLoggedStatus() {
      try {
        const response = await fetch("/api/logged_status", {
          credentials: "include"
        });
        const data = await response.json();
        setLogged(data.logged_in);
      } catch (err) {
        console.error("Failed to fetch login status:", err);
      }
    }
    getLoggedStatus();
  }, []);

  // Logout helper
  const logout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "GET",
        credentials: "include"
      });
      if (res.ok) {
        setLogged(false);
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ logged, setLogged, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export { AuthContext };
