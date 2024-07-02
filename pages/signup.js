// pages/signup.js

import { useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "../styles/signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        uid: user.uid,
        firstName: firstName,
        lastName: lastName,
      });

      console.log("User signed up and added to Firestore:", user);

      setSignupSuccess(true);

      setTimeout(() => {
        router.push("/");
      }, 2000);

    } catch (error) {
      console.error("Error signing up:", error);
      if (error.code === "auth/email-already-in-use") {
        setSignupError("Email address is already in use.");
      } else {
        setSignupError("Failed to sign up. Please try again later.");
      }
    }
  };

  return (
    <div className="container">
      <div className="signup-box">
        <h1>Parles nous de toi</h1>
        <form onSubmit={handleSignup} className="signup-form">
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
            aria-required="true"
          />
          <label htmlFor="password" className="sr-only">Mots de passe</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
            aria-required="true"
          />
         
         <small className="password-requirements">
            • 8 caractères minimum, un numéro,<br />
            • un caractère spatial, #@,[?/.;:<br />
            • une Majuscule minimum,<br />
            • une minuscule minimum
          </small>
          
          <button type="submit" className="signup-button">
            <a href="/verification">
            Valider
            </a>
            </button>
          {signupError && <p className="error-message">{signupError}</p>}
        </form>

        <p className="account">
            <a href="/login" className="signup-link">J'ai déjà un compte{" "}</a>
          </p>
        
        {signupSuccess && (
          <p className="success-message">Account created successfully. Redirecting to marketplace...</p>
        )}
      </div>
    </div>
  );
}
