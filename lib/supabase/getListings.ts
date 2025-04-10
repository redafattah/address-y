import { supabase } from "@/lib/supabaseClient";
import { Listing } from "@/types"; // Optional: type for your listing

export const getListings = async (): Promise<Listing[]> => {
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Supabase fetch error:", error.message);
    return [];
  }

  return data as Listing[];
};
