import { format } from "date-fns";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface RoomSummaryProps {
  room: {
    imageUrl?: string;
    title: string;
    address: string;
    price: number;
  };
  fromDate: Date | null;
  toDate: Date | null;
  nights: number;
}

const RoomSummary = ({ room, fromDate, toDate, nights }: RoomSummaryProps) => {
  const roomPrice = `${room.price} MAD`;
  const cleaningFee = "100.00 MAD";
  const totalPrice = `${room.price * nights + 100} MAD`;

  return (
    <div className="w-full bg-yellow-400 h-screen flex items-center justify-center">
      <div className="container border rounded-lg flex h-fit flex-col transition ease-in hover:rotate-2 hover:scale-90 w-[500px] bg-white shadow-lg">
        <div className="h-[300px] w-full border mb-4 overflow-hidden relative">
          <Image
            src={room.imageUrl || "/images/default-room.jpg"}
            alt="Appartement"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-2">{room.title}</h2>
          <p className="text-sm text-gray-600 mb-4">{room.address}</p>
          <div className="text-gray-600 text-sm mb-3 flex items-center px-4 py-4 rounded-lg border justify-between">
            <p>{fromDate ? format(fromDate, "dd MMMM yyyy") : "---"}</p>
            <ArrowRight size={20} />
            <p>{toDate ? format(toDate, "dd MMMM yyyy") : "---"}</p>
          </div>
          <div className="flex justify-between text-sm border-t pt-4">
            <span>Prix par nuit</span>
            <span className="font-semibold">{roomPrice}</span>
          </div>
          <div className="flex justify-between text-sm border-t pt-2">
            <span>Frais de ménage</span>
            <span className="font-semibold">{cleaningFee}</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
            <span>Total</span>
            <span>{totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomSummary;
