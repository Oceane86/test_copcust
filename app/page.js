"use client";

import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Navbar from "../components/NavBar";
import products from "../../data/products.json";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produit ajouté au panier !");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      <div className="p-24">
        <h1 className="text-4xl font-bold mb-8">Marketplace</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg">
              <Image src={product.image} alt={product.name} width={200} height={200} />
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p>{product.description}</p>
              <p className="text-xl font-bold">${product.price}</p>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
