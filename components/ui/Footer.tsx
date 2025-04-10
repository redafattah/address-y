// components/ui/Footer.tsx
"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-20 py-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <h3 className="text-xl font-bold text-yellow-500 mb-2">YourAdress</h3>
          <p className="text-sm text-gray-600">
            Votre plateforme marocaine pour réserver facilement des logements.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Navigation</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="/about">À propos</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Suivez-nous</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            <li><a href="https://facebook.com" target="_blank">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank">Instagram</a></li>
            <li><a href="https://twitter.com" target="_blank">Twitter</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} YourAdress. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
