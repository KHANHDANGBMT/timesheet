"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DialogNewEvent } from "./_ui/dialogNewEvent";
import { useQuery } from "@tanstack/react-query";
import { useBoolean } from "usehooks-ts";
import { useState } from "react";
import { format } from "date-fns";
import { IEvent } from "@/app/models/event";

const TimeSheetPage = () => {
  const { setTrue, value, setFalse } = useBoolean(false);
  const [initialEventData, setInitialEventData] = useState<{
    startDate?: string;
    endDate?: string;
  }>({});

  const { data } = useQuery({
    queryKey: ["get-list-events"],
    queryFn: () => fetch("/api/event").then((res) => res.json()),
    refetchOnWindowFocus: false,
  });

  if (!data) {
    return null;
  }

  console.log("🚀 ~ TimeSheetPage ~ data:", data);
  return (
    <>
      <div>
        <DialogNewEvent
          open={value}
          onClose={() => setFalse()}
          initialData={initialEventData}
        />
      </div>
      <FullCalendar
        dayMaxEventRows={3}
        events={data.map((event: IEvent) => {
          return {
            title: event.title,
            start: event.startDate,
            end: event.endDate,
          };
        })}
        // eventClick={(event) => {
        //   console.log("click event: " + event.event);
        //   setTrue();
        // }}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={(e) => {
          console.log("click event: " + e.date);
          setInitialEventData({
            startDate: format(e.date, "yyyy-MM-dd"),
            endDate: format(e.date, "yyyy-MM-dd"),
          });
          setTrue();
        }}
        dayCellClassNames={"cursor-pointer hover:bg-orange-300"}
      />
    </>
  );
};

export default TimeSheetPage;
