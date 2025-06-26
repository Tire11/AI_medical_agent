"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
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
  subscriptionRequired: boolean;
};
type props = {
  doctor: doctorAgent;
};

export default function DoctorAgentCard({ doctor }: props) {
  const { has } = useAuth();
  //@ts-ignore
  const paidUser = has && has({ plan: "pro" });
  console.log(paidUser);

  return (
    <div className="relative">
      {doctor.subscriptionRequired && (
        <Badge className="absolute m-2 right-0">Premium</Badge>
      )}
      <Image
        src={doctor.image}
        width={200}
        height={300}
        alt={doctor.specialist}
        className="w-full h-[250px] object-cover rounded-xl"
      />
      <h2 className="font-bold mt-1">{doctor.specialist}</h2>
      <p className="line-clamp-2 text-sm text-gray-500">{doctor.description}</p>
      <Button
        className="w-full mt-2"
        disabled={!paidUser && doctor.subscriptionRequired}
      >
        Start Consultation <IconArrowRight />
      </Button>
    </div>
  );
}
