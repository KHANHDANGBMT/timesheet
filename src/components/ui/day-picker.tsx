"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ControllerRenderProps } from "react-hook-form";

export function DatePicker(props: {
  field?: ControllerRenderProps;
  defaultValue?: string;
}) {
  const [date, setDate] = React.useState<string>(
    props?.defaultValue
      ? format(new Date(props.defaultValue), "yyyy-MM-dd")
      : ""
  );
  console.log("🚀 ~ DatePicker ~ date:", date);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const isoDate = format(selectedDate, "yyyy-MM-dd");
      setDate(isoDate);
      props?.field?.onChange(isoDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(new Date(date), "MM/dd/yyyy")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date ? new Date(date) : undefined}
          onSelect={handleDateSelect}
          initialFocus
          {...(props?.field || {})}
        />
      </PopoverContent>
    </Popover>
  );
}
