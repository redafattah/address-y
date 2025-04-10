"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { listings } from "./data/listings";
import { supabase } from "@/lib/supabaseClient";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Listing {
  id: number;
  title: string;
  address: string;
  price: number;
  image_urls: string[];
  cover_image_url: string;
}

const HomePage = () => {
 

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching listings:", error.message);
      } else {
        setListings(data);
      }
      setLoading(false);
    };

    fetchListings();
  }, []);

  const featured = listings.slice(0, 3);


  return (
    <div className="container mx-auto px-6 py-10 space-y-20">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full rounded-xl overflow-hidden">
        <Image
          src="/images/hero.avif"
          alt="Morocco"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 z-10"></div>
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to YourAdress</h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 max-w-xl">
            Discover and book charming places to stay across Morocco
          </p>
          <Link href="/hotels">
            <Button className="text-lg px-12 py-6 rounded-full bg-white text-black hover:bg-gray-200 transition">
              Browse All Stays
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Listings */}
     
      {/* Featured Listings */}
      <section className="relative">
        <div className="sticky top-20 z-10 animate-fade-in bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Featured Stays</h2>
            <Link href="/hotels" className="text-yellow-600 hover:underline text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p>Loading...</p>
            ) : featured.length === 0 ? (
              <p>No listings found.</p>
            ) : (
              featured.map((room) => (
                <Link
                  href={`/room/${room.id}`}
                  key={room.id}
                  className="bg-white shadow-md border rounded-lg transition ease-in hover:scale-90 overflow-hidden"
                >
                  <div className="relative w-full h-56">
                    <Image
                      src={room.cover_image_url || "/images/default-room.jpg"}
                      alt={room.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-1">{room.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{room.address}</p>
                    <p className="text-sm text-gray-600 mb-2">{room.price} Dh / night</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative">
        <div className="sticky top-24 z-10 animate-fade-in">
          <h2 className="text-2xl font-semibold mb-6 text-center">Where to Find Us</h2>
          <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Morocco Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107914.4912856344!2d-8.077893439479094!3d31.63427410180338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafe989defdb3df%3A0x1df179e6c0dbde5c!2sMarrakech!5e0!3m2!1sen!2sma!4v1712265136256!5m2!1sen!2sma"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative">
        <div className="sticky top-24 z-10 animate-fade-in">
          <h2 className="text-2xl font-semibold mb-12 text-center">Explore Morocco in Pictures</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 auto-rows-[200px]">
            {[
              {
                src: "/images/gallery/casa.avif",
                title: "Casablanca",
                desc: "Beachfront bliss",
                colSpan: 2,
                rowSpan: 1,
              },
              {
                src: "/images/gallery/kech.avif",
                title: "Marrakech",
                desc: "The red city",
                colSpan: 2,
                rowSpan: 2,
              },
              {
                src: "/images/gallery/fes.avif",
                title: "Fès",
                desc: "Medina maze",
                colSpan: 2,
                rowSpan: 1,
              },
              {
                src: "/images/gallery/merzouga.avif",
                title: "Merzouga",
                desc: "Sahara dunes",
                colSpan: 3,
                rowSpan: 1,
              },
              {
                src: "/images/gallery/tanger.avif",
                title: "Tanger",
                desc: "Mediterranean gate",
                colSpan: 3,
                rowSpan: 1,
              },
              {
                src: "/images/gallery/atlas.jpeg",
                title: "Atlas",
                desc: "Snow & sun",
                colSpan: 2,
                rowSpan: 1,
              },
              {
                src: "/images/gallery/chefch.avif",
                title: "Chefchaouen",
                desc: "The blue pearl",
                colSpan: 2,
                rowSpan: 1,
              },
              {
                src: "/images/gallery/pic1.avif",
                title: "Rabat",
                desc: "Capital charm",
                colSpan: 2,
                rowSpan: 1,
              },
              {
                src: "/images/gallery/agadir.avif",
                title: "Agadir",
                desc: "Beach city",
                colSpan: 2,
                rowSpan: 1,
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`relative rounded-xl overflow-hidden group shadow-md hover:shadow-xl transition-shadow duration-300 col-span-${item.colSpan} row-span-${item.rowSpan}`}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
                  <h3 className="text-white text-lg font-bold">{item.title}</h3>
                  <p className="text-white text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative">
        <div className="sticky top-24 z-10 animate-fade-in bg-gray-100 rounded-xl p-10">
          <h2 className="text-2xl font-semibold mb-8 text-center">What Guests Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Youssef B.",
                text: "Amazing stay! The riad in Marrakech was breathtaking. Highly recommend Morocco Stays.",
              },
              {
                name: "Sara E.",
                text: "The desert camp in Merzouga was an unforgettable experience. Everything was perfect.",
              },
              {
                name: "Omar T.",
                text: "Loved the clean, modern apartment in Rabat. Booking was easy and smooth.",
              },
              {
                name: "Lina K.",
                text: "The photos didn’t do justice! Beautiful views and warm hosts.",
              },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow">
                <p className="italic text-gray-600 mb-2">“{t.text}”</p>
                <p className="text-sm font-semibold text-right">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-gradient-to-b from-white to-gray-50">
  <div className="sticky top-24 z-10 animate-in fade-in duration-700 ease-out">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
        Frequently Asked Questions
      </h2>

      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="q1">
          <AccordionTrigger className="text-lg font-medium bg-white rounded-xl px-6 py-4 shadow-sm hover:shadow-md transition-all duration-200">
            How do I book a stay?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 bg-white px-6 py-4 rounded-b-xl border-t border-gray-100">
            Simply browse listings, pick your dates, fill in your information, and confirm your booking.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q2">
          <AccordionTrigger className="text-lg font-medium bg-white rounded-xl px-6 py-4 shadow-sm hover:shadow-md transition-all duration-200">
            Can I cancel my reservation?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 bg-white px-6 py-4 rounded-b-xl border-t border-gray-100">
            Yes, cancellation policies depend on the listing. Please check the details on each listing page.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q3">
          <AccordionTrigger className="text-lg font-medium bg-white rounded-xl px-6 py-4 shadow-sm hover:shadow-md transition-all duration-200">
            Is payment secure?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 bg-white px-6 py-4 rounded-b-xl border-t border-gray-100">
            Absolutely. All payments are processed securely via our trusted partners like CMI and Wafacash.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
</section>

   
    </div>
  );
};

export default HomePage;
