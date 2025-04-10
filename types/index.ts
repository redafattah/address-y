export interface Listing {
    id: number;
    title: string;
    address: string;
    price: number;
    beds: number;
    baths: number;
    guests: number;
    image_url: string;
    images: string[];
    lat: number;
    lng: number;
    description: string;
    available_from: string;
    available_to: string;
    cover_image_url:string;
  }
  