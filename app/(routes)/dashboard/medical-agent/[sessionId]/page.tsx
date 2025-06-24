"use client";
import { useParams } from "next/navigation";
import React from "react";

function MedicalVoiceAgent() {
  const { sessionId } = useParams();

  const getSessionDetails = () => {};

  return <div>{sessionId}</div>;
}

export default MedicalVoiceAgent;
