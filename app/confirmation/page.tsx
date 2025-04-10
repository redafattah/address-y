"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, Suspense } from "react"; // Import Suspense
import { useRouter, useSearchParams } from "next/navigation";

const ContractPage = () => {
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
    <Suspense fallback={<div>Loading...</div>}>  {/* Wrap the component in Suspense */}
      <div className="p-16 mx-32 flex flex-col gap-6">
        <h1 className="text-2xl font-bold mb-4">Contrat de réservation</h1>
        
        <div className="border p-6 rounded-lg shadow-lg">
          <p className="mb-4 text-gray-700">
            Ce contrat est établi entre <strong>{name} {surname}</strong> et l’hôte pour une réservation 
            de l’appartement du <strong>{startDate}</strong> au <strong>{endDate}</strong>.
          </p>
          <p className="mb-4 text-gray-700">
            Le montant total à payer est de <strong>{totalPrice}</strong>.
          </p>
          <p className="mb-4 text-gray-700">
            En signant ce contrat, vous acceptez les termes et conditions de réservation.
          </p>
          
          <div className="flex items-center gap-2 mb-4">
            <Checkbox id="agree" onCheckedChange={(checked) => setIsSigned(checked === true)} />
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
    </Suspense>
  );
};

export default ContractPage;
