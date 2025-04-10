import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function Step4Confirmation({ formData, setFormData, nights, totalPrice, houseRules, paymentMethod, hotelName, prevStep, router }: any) {
  return (
    <div className="border p-8">
      <h2 className="pb-4 text-lg font-semibold">4. Contrat de réservation</h2>
      <p className="text-sm text-gray-700 mb-4">Ce contrat est établi entre <strong>{formData.name} {formData.surname}</strong> et {hotelName}.</p>
      <p className="text-sm text-gray-700 mb-4">Numéro d'identité : <strong>{formData.idNumber}</strong></p>
      {nights > 0 && <p className="text-sm text-gray-700 mb-4">Durée du séjour : <strong>{nights} nuit(s)</strong></p>}
      <p className="text-sm text-gray-700 mb-4">Prix total : <strong>{totalPrice}</strong></p>
      <p className="text-sm text-gray-700 mb-4">Règles de la maison : {houseRules}</p>
      <p className="text-sm text-gray-700 mb-4">Paiement : {paymentMethod}</p>
      <p className="text-sm text-gray-700 mb-4">En signant, vous acceptez les conditions de réservation.</p>
      <div className="flex border p-6 mt-8 items-center gap-2 mb-4 bg-white rounded-lg shadow-lg">
        <Checkbox id="agree" onCheckedChange={(checked) => setFormData({ ...formData, isSigned: checked === true })} />
        <label htmlFor="agree" className="text-sm">Je signe électroniquement ce contrat</label>
      </div>
      <div className="flex justify-between mt-8">
        <Button onClick={prevStep} variant="outline" className="rounded-full">Retour</Button>
        <Button
          className="bg-yellow-500 p-6 rounded-full text-black hover:bg-yellow-300"
          onClick={() => {
            if (!formData.isSigned) {
              alert("Veuillez signer le contrat.");
              return;
            }
            router.push("/reservation");
          }}
        >
          Confirmer
        </Button>
      </div>
    </div>
  );
}
