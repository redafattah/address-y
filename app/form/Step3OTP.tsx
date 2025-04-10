"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Step3OTP({
  otp,
  setOtp,
  sentOtp,
  setSentOtp,
  formData,
  prevStep,
  setStep,
}: any) {
  const [resending, setResending] = useState(false);

  const handleResend = async () => {
    setResending(true);
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: formData.phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur lors du renvoi de l'OTP.");
      }

      setSentOtp(data.otp);
      alert("Nouveau code envoyé !");
      console.log("OTP renvoyé :", data.otp);
    } catch (error: any) {
      console.error("Erreur de renvoi OTP :", error.message);
      alert("Erreur lors du renvoi du code OTP.");
    } finally {
      setResending(false);
    }
  };

  const handleVerification = () => {
    if (otp !== sentOtp) {
      alert("Code OTP incorrect !");
      return;
    }
    setStep(4);
  };

  return (
    <>
      <h2 className="pb-4 text-lg font-semibold">3. Vérification par code OTP</h2>
      <p className="mb-4 text-sm text-gray-700">
        Nous avons envoyé un code à <strong>{formData.phone}</strong>. Entrez-le pour continuer.
      </p>

      <div className="flex gap-4 items-center mb-4">
        <Input
          type="text"
          placeholder="Code OTP"
          value={otp}
          maxLength={6}
          onChange={(e) => setOtp(e.target.value)}
          className="w-40 text-center tracking-widest"
        />
        <Button variant="secondary" onClick={handleResend} disabled={resending}>
          {resending ? "Renvoi en cours..." : "Renvoyer le code"}
        </Button>
      </div>

      <div className="flex justify-between">
        <Button onClick={prevStep} variant="outline" className="rounded-full">
          Retour
        </Button>
        <Button
          className="bg-yellow-500 p-6 rounded-full text-black hover:bg-yellow-300"
          onClick={handleVerification}
        >
          Vérifier le code
        </Button>
      </div>
    </>
  );
}
