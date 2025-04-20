"use client";

import Image from "next/image";

const paymentMethods = [
  { name: "Visa", src: "/payments/visa.png" },
  { name: "Mastecard", src: "/payments/mastercard.png" },
  { name: "Paypal", src: "/payments/paypal.png" },
  { name: "AmericanExpress", src: "/payments/americanExpress.png" },
  { name: "Oca", src: "/payments/oca.svg" },
];

export default function Footer() {
  return (
    <footer className="bg-white text-gray-900 py-10 border border-t border-gray-300">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-6 text-center">
        <div>
          <h2 className="text-lg font-semibold mb-2">
            Métodos de pago aceptados
          </h2>
          <p className="text-sm text-gray-900">
            Pagá de forma segura con tus medios favoritos
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
          {paymentMethods.map((method) => (
            <div key={method.name} className="h-10 w-16 relative">
              <Image
                src={method.src}
                alt={method.name}
                fill
                sizes="64px"
                className="object-contain"
              />
            </div>
          ))}
        </div>

        <div className="text-xs text-gray-700 mt-6">
          © {new Date().getFullYear()} TuTienda. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
