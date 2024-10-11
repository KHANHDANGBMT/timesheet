import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DatePicker } from "@/components/ui/day-picker";
import { useMutation } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "../../provider";

interface IEvent {
  title: string;
  description?: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

const formSchema = z.object({
  title: z.string().trim().min(1, {
    message: "Event name should not be empty",
  }),
  startDate: z.string().date("MM/DD/YYYY"),
  startTime: z.string().trim().min(5),
  endDate: z.string().date("MM/DD/YYYY"),
  endTime: z.string().trim().min(5),
  description: z.string().trim().optional(),
});

export function DialogNewEvent({
  open,
  onClose,
  initialData,
}: {
  open?: boolean;
  onClose?: () => void;
  initialData?: {
    startDate?: string;
    endDate?: string;
  };
}) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      startDate: initialData?.startDate || "",
      startTime: "08:00",
      endDate: initialData?.endDate || "",
      endTime: "09:00",
      description: "",
    },
  });

  useEffect(() => {
    if (initialData?.startDate && initialData?.endDate) {
      form.setValue("startDate", initialData.startDate);
      form.setValue("endDate", initialData.endDate);
    }
  }, [form, initialData?.endDate, initialData?.startDate]);

  const createEventMutation = useMutation({
    mutationFn: (values: IEvent) =>
      fetch("/api/event", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: () => {
      toast({
        title: `Event successfully added`,
      });
      handleCloseDialog();
      queryClient.invalidateQueries({
        queryKey: ["get-list-events"],
      });
    },
    onError: (err) => {
      console.log("🚀 ~ DialogCloseButton ~ err:", err);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createEventMutation.mutateAsync(values);
  }

  async function handleCloseDialog() {
    onClose?.();
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Event</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event name</FormLabel>
                  <FormControl>
                    <Input placeholder="Meeting A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Description.." />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <div>
                <FormField
                  control={form.control}
                  name="startDate"
                  defaultValue={initialData?.startDate || ""}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block">Start date</FormLabel>
                      <FormControl>
                        <DatePicker
                          field={{ ...field }}
                          defaultValue={initialData?.startDate || ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="w-fit">
                    <FormLabel className="block">At:</FormLabel>
                    <FormControl>
                      <Input {...field} type="time" defaultValue={"08:00"} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4">
              <div>
                <FormField
                  control={form.control}
                  name="endDate"
                  defaultValue={initialData?.endDate || ""}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block">End date</FormLabel>
                      <FormControl>
                        <DatePicker
                          field={{ ...field }}
                          defaultValue={initialData?.endDate || ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem className="w-fit">
                    <FormLabel className="block">At:</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} defaultValue={"09:00"} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={handleCloseDialog}
              >
                Close
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
