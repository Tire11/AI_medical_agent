import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SessionDetail } from "../medical-agent/[sessionId]/page";
import moment from "moment";

type props = {
  record: SessionDetail;
};

function ViewReportDialog({ record }: props) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"link"} size={"sm"}>
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-white shadow-lg p-6">
        <DialogHeader>
          <DialogTitle asChild>
            <h2 className="text-center text-3xl font-bold">
              🩺 Medical AI Voice Agent Report
            </h2>
          </DialogTitle>
          <DialogDescription asChild>
            <div className="mt-10">
              <h2 className="font-bold text-blue-500 text-lg border-b-blue-500">
                Session Info
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <h2>
                  <span className="font-bold">Doctor:</span>{" "}
                  {record.selectedDoctor?.specialist}
                </h2>
                <h2>User: Anonymous</h2>
                <h2>
                  Consultation Date:{" "}
                  {moment(new Date(record?.createdOn)).fromNow()}
                </h2>
                <h2>{record?.selectedDoctor?.specialist} AI</h2>
              </div>
            </div>
          </DialogDescription>
          <DialogDescription asChild>
            <div className="mt-10">
              <h2 className="font-bold text-blue-500 text-lg border-b-blue-500">
                Chief Complaint
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <h2>{record?.notes}</h2>
              </div>
            </div>
          </DialogDescription>

          <DialogDescription asChild>
            <div className="mt-10">
              <h2 className="font-bold text-blue-500 text-lg border-b-blue-500">
                Summary
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <h2>{record?.selectedDoctor?.description}</h2>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ViewReportDialog;
