"use client";

import { useEffect, useState } from "react";
import { Hotel, Plane, HeartHandshake, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const AproposPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 animate-fade-in">
      {/* Title */}
      {loading ? (
        <Skeleton className="w-72 h-8 mx-auto mb-4" />
      ) : (
        <h1 className="text-4xl font-bold text-center mb-4">À propos de nous</h1>
      )}

      {/* Subtitle */}
      {loading ? (
        <Skeleton className="w-[90%] h-5 mb-12 mx-auto" />
      ) : (
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Bienvenue sur notre plateforme de réservation d’hôtels, où chaque séjour devient une expérience inoubliable.
        </p>
      )}

      {/* Cards Section */}
      <section className="grid gap-6 md:grid-cols-3 mb-16">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-gray-100 border rounded-2xl p-6 space-y-4">
                <Skeleton className="w-8 h-8" />
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))
          : (
            <>
              {/* Mission */}
              <div className="bg-gray-100 border rounded-2xl p-6 hover:shadow-md transition">
                <Hotel className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Notre mission</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Offrir à chacun la possibilité de découvrir les meilleurs hébergements au Maroc en toute simplicité. 
                  Réserver devient un plaisir.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-gray-100 border rounded-2xl p-6 hover:shadow-md transition">
                <Plane className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Notre vision</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Créer la première plateforme locale de confiance pour les voyages et séjours, en valorisant chaque destination.
                </p>
              </div>

              {/* Valeurs */}
              <div className="bg-gray-100 border rounded-2xl p-6 hover:shadow-md transition">
                <HeartHandshake className="w-8 h-8 text-pink-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nos valeurs</h3>
                <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                  <li>Hospitalité & accueil</li>
                  <li>Transparence des prix</li>
                  <li>Accessibilité pour tous</li>
                  <li>Fiabilité des partenaires</li>
                </ul>
              </div>
            </>
          )}
      </section>

      {/* Closing Message */}
      <section className="text-center">
        <div className="flex justify-center mb-4">
          {loading ? (
            <Skeleton className="w-10 h-10 rounded-full" />
          ) : (
            <Star className="w-10 h-10 text-yellow-500" />
          )}
        </div>
        {loading ? (
          <Skeleton className="h-5 w-2/3 mx-auto" />
        ) : (
          <p className="text-lg font-medium text-gray-800 max-w-xl mx-auto">
            Merci de faire partie de notre aventure. Que votre prochain séjour soit confortable, mémorable et inspirant ✨
          </p>
        )}
      </section>
    </div>
  );
};

export default AproposPage;
