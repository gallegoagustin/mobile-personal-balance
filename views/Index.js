import React from "react";
import App from "../App";
import { AuthProvider } from "../utils/authProvider";

const Providers = () => {
    return (
        <AuthProvider>
            <App />
        </AuthProvider>
    )
}

export default Providers;