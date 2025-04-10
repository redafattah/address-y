"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      toast.error("Échec de l'inscription.");
    } else {
      toast.success("Compte créé ! Vérifiez votre email.");
      router.push("/login");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left: Form */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Créer un compte</h1>
            <p className="text-sm text-gray-500 mt-2">Rejoignez-nous sur YourAdress</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              type="password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Création..." : "Créer un compte"}
            </Button>
          </form>

          <div className="text-sm text-center text-gray-500">
            Vous avez déjà un compte ?{" "}
            <a href="/login" className="text-yellow-500 font-semibold hover:underline">
              Se connecter
            </a>
          </div>
        </div>
      </div>

      {/* Right: Image */}
      <div className="relative hidden md:block">
        <Image
          src="/images/gallery/casa.avif"
          alt="Register background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
    </div>
  );
}
