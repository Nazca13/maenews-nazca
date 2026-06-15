import { Event } from "@/app/typing";

interface EventStatusIndicatorProps {
  status: Event["status"];
}

const statusConfig: Record<Event["status"], { label: string; color: string }> = {
  upcoming: { label: "Upcoming", color: "bg-blue-50 text-blue-700 border-blue-200" },
  ongoing: { label: "Ongoing", color: "bg-green-50 text-green-700 border-green-200" },
  ended: { label: "Ended", color: "bg-gray-50 text-gray-500 border-gray-200" },
};

export function EventStatusIndicator({ status }: EventStatusIndicatorProps) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-semibold rounded-md border ${config.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === "ongoing" ? "bg-green-500 animate-pulse" : status === "upcoming" ? "bg-blue-500" : "bg-gray-400"}`} />
      {config.label}
    </span>
  );
}
