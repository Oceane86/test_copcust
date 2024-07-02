import { useState } from "react";
import { useRouter } from "next/router";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { auth } from "../config/firebase";
import styles from "../styles/verification.css"; 

export default function Verification() {
  const [email, setEmail] = useState("");
  const [verificationError, setVerificationError] = useState(null);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const router = useRouter();

  const handleEmailVerification = async () => {
    try {
      const user = auth.currentUser;

      if (user && user.email === email) {
        await sendEmailVerification(user);
        console.log("Verification email sent.");
        setVerificationSuccess(true);
      } else {
        setVerificationError("Email does not match with the signed-in user.");
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      setVerificationError("Failed to send verification email.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.verificationBox}>
        <h1>Parle nous de toi</h1>
        <p>Checker ta boite mail pour valider ton compte</p>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Code de validation"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>
        <div className={styles.resendLink}>
          <a href="#" onClick={handleEmailVerification}>Renvoyer le code</a>
        </div>
        <div className={styles.submitButton}>
          <button type="button" onClick={handleEmailVerification}>Valider</button>
        </div>
        {verificationError && <p className={styles.errorMessage}>{verificationError}</p>}
        {verificationSuccess && (
          <p className={styles.successMessage}>Un email de vérification a été envoyé ! Veuillez vérifier votre boîte de réception.</p>
        )}
      </div>
    </div>
  );
}
