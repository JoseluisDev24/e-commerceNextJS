"use client";

import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const paymentMethods = [
  { name: "Visa", src: "/payments/visa.png" },
  { name: "Mastecard", src: "/payments/mastercard.png" },
  { name: "Paypal", src: "/payments/paypal.png" },
  { name: "AmericanExpress", src: "/payments/americanExpress.png" },
  { name: "Oca", src: "/payments/oca.svg" },
];

const socialLinks = [
  { name: "Facebook", iconNode: Facebook, href: "#" },
  { name: "Instagram", iconNode: Instagram, href: "#" },
  { name: "Twitter", iconNode: Twitter, href: "#" },
  { name: "YouTube", iconNode: Youtube, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-10 text-center md:text-left">
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">
            Métodos de pago aceptados
          </h2>
          <p className="text-sm text-gray-400">
            Pagá de forma segura con tus medios favoritos
          </p>
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-4">
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
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">Seguinos</h2>
          <p className="text-sm text-gray-400">
            Conectate con nosotros en redes
          </p>
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            {socialLinks.map(({ name, iconNode: IconComponent, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <IconComponent className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">Información</h2>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>
              <a href="#" className="hover:underline hover:text-white">
                Política de devoluciones
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-white">
                Preguntas frecuentes
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-white">
                Contáctanos
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-white">
                Sobre nosotros
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-xs text-gray-500 mt-10 text-center border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Shop. Todos los derechos reservados —{" "}
        <a href="#" className="underline hover:text-white">
          Política de privacidad
        </a>
      </div>
    </footer>
  );
}
