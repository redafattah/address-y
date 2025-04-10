"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Bed, Bath, User, Minus, Plus } from "lucide-react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import RoomCapacitySelector from "@/components/RoomCapacitySelector";
import PriceSlider from "@/components/PriceSlider";

export default function CMSPage() {
  const [form, setForm] = useState({
    title: "",
    address: "",
    price: 0,
    beds: 1,
    baths: 1,
    guests: 1,
    coverImage: null as File | null,
    hotelImages: [] as File[],
    available_from: "",
    available_to: "",
    description: "",
  });



  const [loading, setLoading] = useState(false);

  const handleUpload = async (file: File) => {
    const fileName = `public/${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("listing-images")
      .upload(fileName, file);

    if (error) throw new Error("Image upload failed");

    const { data: publicUrlData } = supabase.storage
      .from("listing-images")
      .getPublicUrl(fileName);

    return publicUrlData?.publicUrl || "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const coverImageUrl = form.coverImage
        ? await handleUpload(form.coverImage)
        : "";

      const hotelImageUrls = await Promise.all(
        form.hotelImages.map((file) => handleUpload(file))
      );

      const { error } = await supabase.from("listings").insert([
        {
          title: form.title,
          address: form.address,
          price: form.price,
          beds: form.beds,
          baths: form.baths,
          guests: form.guests,
          cover_image_url: coverImageUrl,
          image_urls: hotelImageUrls,
          available_from: form.available_from,
          available_to: form.available_to,
          description: form.description,
        },
      ]);

      if (error) throw error;

      alert("✅ Listing added successfully!");
      setForm({
        title: "",
        address: "",
        price: 0,
        beds: 1,
        baths: 1,
        guests: 1,
        coverImage: null,
        hotelImages: [],
        available_from: "",
        available_to: "",
        description: "",
      });
    } catch (err: any) {
      alert(err.message || "❌ Failed to submit");
    }

    setLoading(false);
  };

  const removeCoverImage = () => {
    setForm((prev) => ({ ...prev, coverImage: null }));
  };

  const removeHotelImage = (index: number) => {
    setForm((prev) => {
      const updated = [...prev.hotelImages];
      updated.splice(index, 1);
      return { ...prev, hotelImages: updated };
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      setForm((prev) => ({
        ...prev,
        hotelImages: [...prev.hotelImages, ...acceptedFiles],
      }));
    },
  });
// Utility to format dates safely
const formatDate = (date: string | undefined) => {
  if (!date) return "";
  const parsed = new Date(date);
  return !isNaN(parsed.getTime()) ? format(parsed, "yyyy-MM-dd") : "";
};
  return (
    <Card className="max-w-3xl mx-auto p-8 shadow-none rounded-2xl mt-10 border">
      <h1 className="text-3xl font-bold mb-8 text-center">Add New Listing</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex gap-4">
        <Input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
         
         <Input
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        </div>
        <Textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <Separator/>


     
  

  <PriceSlider
  value={form.price}
  onChange={(val) => setForm({ ...form, price: val })}
/>

       <RoomCapacitySelector
  beds={form.beds}
  baths={form.baths}
  guests={form.guests}
  onChange={(values) => setForm({ ...form, ...values })}
/>
      

        <Popover>
  <PopoverTrigger asChild>
    <div className="flex gap-4">
      <Input
        readOnly
        placeholder="Check-in"
        value={formatDate(form.available_from)}
        className="cursor-pointer w-full"
      />
      <Input
        readOnly
        placeholder="Check-out"
        value={formatDate(form.available_to)}
        className="cursor-pointer w-full"
      />
    </div>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-2" align="start">
    <DayPicker
      mode="range"
      numberOfMonths={2}
      selected={{
        from: form.available_from ? new Date(form.available_from) : undefined,
        to: form.available_to ? new Date(form.available_to) : undefined,
      }}
      onSelect={(range: DateRange | undefined) => {
        setForm({
          ...form,
          available_from: range?.from
            ? format(range.from, "yyyy-MM-dd")
            : "",
          available_to: range?.to ? format(range.to, "yyyy-MM-dd") : "",
        });
      }}
    />
  </PopoverContent>
</Popover>

        {/* Cover Image */}
        <div>
          <Label>Cover Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, coverImage: e.target.files?.[0] || null })
            }
          />
          {form.coverImage && (
            <div className="relative w-full max-h-60 mt-2">
              <img
                src={URL.createObjectURL(form.coverImage)}
                alt="Cover Preview"
                className="rounded-md w-full max-h-60 object-cover"
              />
              <button
                type="button"
                onClick={removeCoverImage}
                className="absolute top-2 right-2 bg-white text-black rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Hotel Images */}
        <div>
          <Label>Hotel Images</Label>
          <div
            {...getRootProps()}
            className={`border-2 p-4 text-center rounded-md cursor-pointer ${
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop images here...</p>
            ) : (
              <p>Drag & drop multiple images here, or click to select</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {form.hotelImages.map((img, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`Preview ${idx}`}
                  className="h-24 w-24 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeHotelImage(idx)}
                  className="absolute top-1 right-1 bg-white text-black rounded-full p-1 shadow group-hover:bg-red-500 group-hover:text-white transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

      

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Adding..." : "Add Listing"}
        </Button>
      </form>
    </Card>
  );
}
