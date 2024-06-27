// components/Navbar.js

import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="w-full bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold" passHref>Marketplace</Link>
        <div className="flex items-center">
          {user ? (
            <>
              <Link href="/account" passHref>
              <div className="text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-700 mx-2">
            Mon Compte
          </div>
              </Link>
              <button
                onClick={handleSignOut}
                className="text-white px-4 py-2 rounded bg-red-500 hover:bg-red-700 mx-2"
              >
                Logout
              </button>
              <Link href="/panier" passHref>
              <div className="text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-700 mx-2">Panier</div>

              </Link>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
              <div className="text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-700 mx-2">Login</div>

              </Link>
              <Link href="/signup" passHref>
              <div className="text-white px-4 py-2 rounded bg-green-500 hover:bg-green-700 mx-2">Sign Up</div>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
