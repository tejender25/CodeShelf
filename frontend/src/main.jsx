import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

import App from "./App";

import "./index.css";

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
              <ThemeProvider>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 2500,
                        style: {
                            background: "#1E293B",
                            color: "#ffffff",
                            border:
                                "1px solid #334155",
                        },
                    }}
                />

                <App />
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);