"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import Link from "next/link";

// Types
interface Booking {
  id: number;
  title: string;
  address: string;
  from: string;
  to: string;
  price: number;
  guests: number;
  status: "confirmed" | "completed" | "cancelled";
}

// Dummy user and booking data
const user = {
  name: "Reda Fattah",
  email: "reda@example.com",
};

const bookings: Booking[] = [
  {
    id: 1,
    title: "Riad in Marrakech",
    address: "Marrakech, Morocco",
    from: "2025-04-10",
    to: "2025-04-14",
    price: 2800,
    guests: 2,
    status: "confirmed",
  },
  {
    id: 2,
    title: "Ocean View Apartment",
    address: "Agadir, Morocco",
    from: "2025-01-12",
    to: "2025-01-15",
    price: 1500,
    guests: 2,
    status: "completed",
  },
];

export default function EspaceClientPage() {
  const [loading, setLoading] = useState(true);
  const [upcoming, setUpcoming] = useState<Booking[]>([]);
  const [past, setPast] = useState<Booking[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const now = new Date();
      const upcomingBookings = bookings.filter(b => new Date(b.from) >= now);
      const pastBookings = bookings.filter(b => new Date(b.from) < now);
      setUpcoming(upcomingBookings);
      setPast(pastBookings);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Espace Client</h1>
      <p className="text-gray-600 mb-10">Bonjour {user.name}, voici vos réservations.</p>

      {/* Upcoming Reservations */}
      <h2 className="text-2xl font-semibold mb-4">📅 Réservations à venir</h2>

      {loading ? (
        Array.from({ length: 2 }).map((_, i) => (
          <Card key={`skeleton-upcoming-${i}`} className="mb-4">
            <CardContent className="p-6 space-y-3">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/4" />
              <div className="flex gap-4 mt-4">
                <Skeleton className="h-10 w-32 rounded" />
                <Skeleton className="h-10 w-32 rounded" />
              </div>
            </CardContent>
          </Card>
        ))
      ) : upcoming.length === 0 ? (
        <p className="text-gray-500 mb-6">Aucune réservation à venir.</p>
      ) : (
        upcoming.map((booking) => (
          <Card key={booking.id} className="mb-4">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{booking.title}</h3>
                <span className="text-sm text-green-600 capitalize">{booking.status}</span>
              </div>
              <p className="text-sm text-gray-500">{booking.address}</p>
              <p className="text-sm mt-1">Du {format(new Date(booking.from), "dd MMM yyyy")} au {format(new Date(booking.to), "dd MMM yyyy")}</p>
              <p className="text-sm">{booking.guests} invité(s) · {booking.price} MAD</p>
              <div className="mt-4 flex gap-3">
                <Link href={`/room/${booking.id}`}>
                  <Button variant="outline">Voir le détail</Button>
                </Link>
                <Button variant="destructive">Annuler</Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}

      <Separator className="my-10" />

      {/* Past Reservations */}
      <h2 className="text-2xl font-semibold mb-4">📜 Réservations passées</h2>

      {loading ? (
        Array.from({ length: 1 }).map((_, i) => (
          <Card key={`skeleton-past-${i}`} className="mb-4">
            <CardContent className="p-6 space-y-3">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/4" />
              <div className="flex gap-4 mt-4">
                <Skeleton className="h-10 w-40 rounded" />
                <Skeleton className="h-10 w-40 rounded" />
              </div>
            </CardContent>
          </Card>
        ))
      ) : past.length === 0 ? (
        <p className="text-gray-500">Aucune réservation passée.</p>
      ) : (
        past.map((booking) => (
          <Card key={booking.id} className="mb-4">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-1">{booking.title}</h3>
              <p className="text-sm text-gray-500">{booking.address}</p>
              <p className="text-sm mt-1">Du {format(new Date(booking.from), "dd MMM yyyy")} au {format(new Date(booking.to), "dd MMM yyyy")}</p>
              <p className="text-sm">{booking.guests} invité(s) · {booking.price} MAD</p>
              <div className="mt-4 flex gap-3">
                <Link href={`/room/${booking.id}`}>
                  <Button variant="outline">Voir le listing</Button>
                </Link>
                <Button variant="secondary">Télécharger la facture</Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
