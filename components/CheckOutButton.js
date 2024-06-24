import { useRouter } from "next/router";

export default function CheckoutButton({ items }) {
  const router = useRouter();

  const handleCheckout = async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    });
    const session = await res.json();
    router.push(session.url);
  };

  return <button onClick={handleCheckout}>Checkout</button>;
}
