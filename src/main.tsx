import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId="900192583944-8anmvmd34145psnnh9ri5aco76mcbqfg.apps.googleusercontent.com">
        <App />
    </GoogleOAuthProvider>
);
