"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { IconArrowRight } from "@tabler/icons-react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { has } = useAuth();
  //@ts-ignore
  const paidUser = has && has({ plan: "pro" });
  console.log(paidUser);

  const onStartConsultation = async () => {
    setLoading(true);
    //Save all info to db
    const result = await axios.post("/api/session-chat", {
      notes: "New Query",
      selectedDoctor: doctor,
    });
    console.log(result.data);
    if (result.data.sessionId) {
      console.log(result.data.sessionId);
      //Route new conversation screen
      router.push("/dashboard/medical-agent/" + result.data.sessionId);
    }
    setLoading(false);
  };

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
        onClick={onStartConsultation}
        disabled={!paidUser && doctor.subscriptionRequired}
      >
        Start Consultation{" "}
        {loading ? <Loader2 className="animate-spin" /> : <IconArrowRight />}
      </Button>
    </div>
  );
}
