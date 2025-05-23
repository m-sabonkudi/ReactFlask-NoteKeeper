import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import "../../public/general.css"
import Header from "./Header"
import Footer from "./Footer"
import Register from '../pages/Register';
import Login from '../pages/Login';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';



function App() {
  const { logged, setLogged } = useContext(AuthContext); 

  // Show nothing (or spinner) until we know if the user is logged in.
  if (logged === null) {
    return <div>Loading…</div>;
  }


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={logged ? <Home /> : <Navigate to="/login" /> } />
        <Route path="/register" element={!logged ? <Register /> : <Navigate to="/" />} />
        <Route path="/login" element={!logged ? <Login /> : <Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
