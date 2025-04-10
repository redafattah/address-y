"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useRef } from "react";

interface Props {
  listings: {
    id: number;
    lat: number;
    lng: number;
    title: string;
  }[];
  center: { lat: number; lng: number };
  onMarkerClick: (index: number) => void;
}

const containerStyle = {
  width: "100%",
  height: "100%",
};

const MapView = ({ listings, center, onMarkerClick }: Props) => {
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string, // put your key in .env
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={6}
      onLoad={onLoad}
    >
      {listings.map((listing, index) => (
        <Marker
          key={listing.id}
          position={{ lat: listing.lat, lng: listing.lng }}
          onClick={() => onMarkerClick(index)}
        />
      ))}
    </GoogleMap>
  );
};

export default MapView;
