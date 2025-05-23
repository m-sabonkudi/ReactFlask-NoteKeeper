import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App"
import {BrowserRouter} from "react-router-dom";
import AuthProvider from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter> 
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)


//CHALLENGE:
//1. Implement the add note functionality.

//2. Implement the delete note functionality.
