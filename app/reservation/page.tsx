"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const ReservationPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100 px-4">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-xl text-center">
        {loading ? (
          <>
            <Skeleton className="mx-auto mb-4 h-12 w-12 rounded-full" />
            <Skeleton className="h-6 w-1/2 mx-auto mb-2" />
            <Skeleton className="h-4 w-3/4 mx-auto mb-6" />
            <div className="text-left space-y-2 border-t pt-4">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <div className="mt-6 flex justify-center gap-4">
              <Skeleton className="h-10 w-40 rounded-full" />
              <Skeleton className="h-10 w-40 rounded-full" />
            </div>
          </>
        ) : (
          <>
            <CheckCircle2 className="text-green-500 mx-auto mb-4" size={48} />
            <h1 className="text-2xl font-bold mb-2">Réservation confirmée !</h1>
            <p className="text-gray-700 mb-6">
              Merci pour votre réservation. Un email de confirmation vous a été envoyé.
            </p>

            <div className="text-left text-sm border-t pt-4 text-gray-600">
              <p><strong>Statut :</strong> Confirmé</p>
              <p><strong>Nom :</strong> {/* Replace with user name if available */}</p>
              <p><strong>Date :</strong> {new Date().toLocaleDateString("fr-FR")}</p>
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <Link href="/">
                <Button className="rounded-full px-6">Retour à l'accueil</Button>
              </Link>
              <Link href="/hotels">
                <Button variant="outline" className="rounded-full px-6">Voir d'autres logements</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReservationPage;
