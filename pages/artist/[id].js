import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ArtistPage() {
  const router = useRouter();
  const { id } = router.query;
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      if (id) {
        const docRef = doc(db, "artists", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setArtist(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    };
    fetchArtist();
  }, [id]);

  if (!artist) return <p>Loading...</p>;

  return (
    <div>
      <h1>{artist.name}</h1>
      <p>{artist.bio}</p>
    </div>
  );
}
