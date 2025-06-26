import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

export type doctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
  voiceId?: string;
};
type props = {
  doctor: doctorAgent;
};

export default function DoctorAgentCard({ doctor }: props) {
  return (
    <div className="">
      <Image
        src={doctor.image}
        width={200}
        height={300}
        alt={doctor.specialist}
        className="w-full h-[250px] object-cover rounded-xl"
      />
      <h2 className="font-bold mt-1">{doctor.specialist}</h2>
      <p className="line-clamp-2 text-sm text-gray-500">{doctor.description}</p>
      <Button className="w-full mt-2">
        Start Consultation <IconArrowRight />
      </Button>
    </div>
  );
}
