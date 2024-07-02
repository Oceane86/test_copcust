import "../styles/login.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { auth, googleProvider } from "../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h1>Connecte-toi !</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="email" className="sr-only">E-Mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Mail"
            className="input-field"
            required
            aria-required="true"
          />
          <label htmlFor="password" className="sr-only">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="input-field"
            required
            aria-required="true"
          />
          <div className="forgot-password">
            <a href="#" aria-label="Mot de passe oublié">Mot de passe oublié ?</a>
          </div>
          <button type="submit" className="login-button">Connexion</button>
        </form>
        <div className="divider" role="separator"></div>
        <div className="other-login">
          <p>AUTRES CONNEXION</p>
          <div className="login-options">
            <button className="login-option" onClick={handleGoogleLogin} aria-label="Se connecter avec Google">
              <img src="/path/to/google-icon.svg" alt="Google" />
            </button>
            <button className="login-option" aria-label="Se connecter avec Apple">
              <img src="/path/to/apple-icon.svg" alt="Apple" />
            </button>
          </div>
          <p className="new-account">
            <a href="/signup" className="signup-link">Pas encore de compte ?{" "}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
