import { ArrowRight, Bed, ShowerHead, User } from "lucide-react";
import React from "react";
import Image from "next/image";
import { format } from "date-fns";

interface ListingCardProps {
  imageUrl: string;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  guests: number;
  checkIn: Date;
  checkOut: Date;
}

const ListingCard: React.FC<ListingCardProps> = ({
  imageUrl,
  title,
  address,
  price,
  beds,
  baths,
  guests,
  checkIn,
  checkOut,
}) => {
  return (
    <div className="relative overflow-hidden h-[00px] transition ease-in hover:scale-90  rounded-lg cursor-pointer">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className=" "
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 p-4 text-white flex flex-col justify-between h-full">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-300">{address}</p>
        </div>
        <div className="mt-auto">
          <h4 className="text-xl font-bold">
            {price} <span className="text-sm">Dh/Nuit</span>
          </h4>
          <div className="flex gap-4 mt-2 items-center">
            <div className="flex gap-2 items-center">
              <Bed size={20} />
              <span>{beds}</span>
            </div>
            <div className="flex gap-2 items-center">
              <ShowerHead size={20} />
              <span>{baths}</span>
            </div>
            <div className="flex gap-2 items-center">
              <User size={20} />
              <span>{guests}</span>
            </div>
          </div>
          {/* Check-in & Check-out Dates */}
          <div className="flex items-center gap-2 text-gray-300 text-sm mt-2">
            <p>{format(checkIn, "yyyy-MM-dd")}</p>
            <ArrowRight size={16} />
            <p>{format(checkOut, "yyyy-MM-dd")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
