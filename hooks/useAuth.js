// hooks/useAuth.js

import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null); // Réinitialiser l'utilisateur après la déconnexion
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return { user, signOut };
}
