import React from "react";
import { doctorAgent } from "./DoctorAgentCard";
import Image from "next/image";

type props = {
  doctor: doctorAgent;
  setSelectedDoctor: any;
  selectedDoctor: doctorAgent;
};
function SuggestedDoctorCard({
  doctor,
  setSelectedDoctor,
  selectedDoctor,
}: props) {
  return (
    <div
      className={`flex flex-col items-center border rounded-2xl shadow p-5 hover:border-blue-500 cursor-pointer ${
        selectedDoctor?.id === doctor?.id && "border-blue-500"
      }`}
      onClick={() => setSelectedDoctor(doctor)}
    >
      <Image
        src={doctor?.image}
        alt={doctor?.specialist}
        width={70}
        height={70}
        className="w-[50px] h-[50px] rounded-4xl object-cover"
      />
      <h2 className="font-bold text-sm text-center">{doctor?.specialist}</h2>
      <p className="text-xs text-center line-clamp-2">{doctor?.description}</p>
    </div>
  );
}

export default SuggestedDoctorCard;
