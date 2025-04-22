"use client";

import { useShoppingCart } from "@/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { products, clearShoppingCart } = useShoppingCart();
  const router = useRouter();

  const total = products.reduce((acc, p) => acc + p.price * p.quantity, 0);

  const handleCheckout = () => {
    // Aquí iría integración con una pasarela de pago
    alert("Gracias por tu compra");
    clearShoppingCart(); 
    router.push("/");
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Resumen de tu compra</h1>

      {products.length === 0 ? (
        <p>No tenés productos en el carrito.</p>
      ) : (
        <>
          <ul className="mb-6">
            {products.map((product) => (
              <li key={product.id} className="flex justify-between mb-2 gap-8">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={50}
                  height={50}
                />
                <div className="flex justify-between items-center w-full ">
                  <span>
                    {product.name} x {product.quantity}
                  </span>
                  <span className="font-semibold">${product.price * product.quantity}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-lg font-semibold mb-4">Total: ${total}</p>
          <button
            className="bg-green-800 text-white px-6 py-3 w-full rounded cursor-pointer hover:bg-green-700"
            onClick={handleCheckout}
          >
            Confirmar y pagar
          </button>
        </>
      )}
    </div>
  );
}
