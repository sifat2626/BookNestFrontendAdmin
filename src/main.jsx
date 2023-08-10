import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/auth.jsx";
import { CartProvider } from "./context/cart.jsx";
import { SearchProvider } from "./context/search.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(

    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <Toaster />
          <App />
        </CartProvider>
      </SearchProvider>
    </AuthProvider>

);
