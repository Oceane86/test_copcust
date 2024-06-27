import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Panier() {
  const [items, setItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setItems(cartItems);
  }, []);

  const removeItemFromCart = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    localStorage.setItem("cart", JSON.stringify(newItems));
  };

  const clearCart = () => {
    setItems([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  const proceedToCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="p-24">
      <h1 className="text-4xl font-bold mb-8">Panier</h1>
      {items.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div>
          {items.map((item, index) => (
            <div key={index} className="border p-4 rounded-lg mb-4">
              <h2 className="text-2xl font-semibold">{item.name}</h2>
              <p>{item.description}</p>
              <p className="text-xl font-bold">${item.price}</p>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => removeItemFromCart(index)}
              >
                Supprimer
              </button>
            </div>
          ))}
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={proceedToCheckout}
          >
            Procéder au paiement
          </button>
          <button
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded ml-4"
            onClick={clearCart}
          >
            vider le panier
          </button>
        </div>
      )}
    </div>
  );
}
