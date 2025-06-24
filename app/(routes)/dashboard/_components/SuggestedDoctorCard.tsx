import React from "react";
import { doctorAgent } from "./DoctorAgentCard";
import Image from "next/image";

type props = {
  doctor: doctorAgent;
  setSelectedDoctor: any;
};
function SuggestedDoctorCard({ doctor, setSelectedDoctor }: props) {
  return (
    <div
      className="flex flex-col items-center border rounded-2xl shadow p-5 hover:border-blue-500 cursor-pointer"
      onClick={() => setSelectedDoctor(doctor)}
    >
      <Image
        src={doctor.image}
        width={70}
        height={70}
        alt={doctor.specialist}
        className="w-[50px] h-[50px] rounded-4xl object-cover"
      />
      <h2 className="font-bold text-sm text-center">{doctor.specialist}</h2>
      <p className="text-xs text-center line-clamp-2">{doctor.description}</p>
    </div>
  );
}

export default SuggestedDoctorCard;
