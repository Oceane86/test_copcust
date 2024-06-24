import { useState } from "react";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function OpenStore() {
  const [user] = useAuthState(auth);
  const [storeName, setStoreName] = useState("");

  const handleOpenStore = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "stores"), {
        name: storeName,
        owner: user.uid,
      });
    } catch (error) {
      console.error("Error opening store:", error);
    }
  };

  return (
    <form onSubmit={handleOpenStore}>
      <input
        type="text"
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
        placeholder="Store Name"
      />
      <button type="submit">Open Store</button>
    </form>
  );
}
