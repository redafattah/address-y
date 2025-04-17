"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// ✅ Separated component for Suspense boundary (required for useSearchParams)
function ContractContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "Utilisateur";
  const surname = searchParams.get("surname") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const totalPrice = searchParams.get("totalPrice") || "0.00 MAD";

  const [isSigned, setIsSigned] = useState(false);

  const handleSign = () => {
    if (isSigned) {
      alert("Contrat signé avec succès !");
      router.push("/confirmation");
    } else {
      alert("Veuillez signer le contrat avant de continuer.");
    }
  };

  return (
    <div className="p-16 mx-4 md:mx-32 flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-4">Contrat de réservation</h1>

      <div className="border p-6 rounded-lg shadow-lg bg-white dark:bg-gray-900">
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Ce contrat est établi entre <strong>{name} {surname}</strong> et l’hôte
          pour une réservation de l’appartement du <strong>{startDate}</strong> au <strong>{endDate}</strong>.
        </p>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Le montant total à payer est de <strong>{totalPrice}</strong>.
        </p>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          En signant ce contrat, vous acceptez les termes et conditions de réservation.
        </p>

        <div className="flex items-center gap-2 mb-4">
          <Checkbox
            id="agree"
            onCheckedChange={(checked) => setIsSigned(checked === true)}
          />
          <label htmlFor="agree" className="text-sm">
            Je signe électroniquement ce contrat
          </label>
        </div>

        <Button
          onClick={handleSign}
          className="px-6 bg-yellow-500 text-black hover:bg-yellow-300 py-3"
        >
          Soumettre le contrat
        </Button>
      </div>
    </div>
  );
}

export default function ContractPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Chargement du contrat...</div>}>
      <ContractContent />
    </Suspense>
  );
}
