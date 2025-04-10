"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";


export default function Step1ContactInfo({ formData, setFormData, nextStep }: any) {
  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <>
      <h2 className="pb-4 text-lg font-semibold">1. Informations de contact</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Input name="name" placeholder="Nom" onChange={handleChange} />
        <Input name="surname" placeholder="Prénom" onChange={handleChange} />
        <Input name="phone" placeholder="Téléphone" onChange={handleChange} />
        <Input name="email" placeholder="Email" onChange={handleChange} />
        <label className="col-span-2">Veuillez saisir et charger votre CIN </label>
        <Separator className="col-span-2" />
      
        <Input type="file" className="hover:shadow-lg" />
      </div>
      <Button className="p-6 w-fit flex gap-2 hover:gap-4 rounded-full" onClick={nextStep}>
        <span>Continue</span>
        <ArrowRight />
      </Button>
    </>
  );
}
