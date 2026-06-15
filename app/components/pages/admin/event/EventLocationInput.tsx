// app/components/pages/admin/event/EventLocationInput.tsx
// Toggle between Online / Offline / Hybrid with a location text input.
"use client";

import { MapPin, Wifi, Building, Calendar } from "lucide-react";
import { EventType } from "@/app/typing/Admin";

interface EventLocationInputProps {
  eventType: EventType;
  location: string;
  onTypeChange: (type: EventType) => void;
  onLocationChange: (value: string) => void;
}

const EVENT_TYPES: { value: EventType; label: string; Icon: typeof Wifi }[] = [
  { value: "offline", label: "Offline", Icon: Building },
  { value: "online", label: "Online", Icon: Wifi },
  { value: "hybrid", label: "Hybrid", Icon: Calendar },
];

const LOCATION_PLACEHOLDER: Record<EventType, string> = {
  online: "e.g., Zoom, YouTube Live",
  offline: "e.g., ICE BSD, Jakarta",
  hybrid: "e.g., ICE BSD + YouTube Live",
};

export function EventLocationInput({
  eventType,
  location,
  onTypeChange,
  onLocationChange,
}: EventLocationInputProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-3">
        <MapPin size={14} />
        Location
      </label>

      {/* Type Toggle */}
      <div className="flex gap-2 mb-4">
        {EVENT_TYPES.map(({ value, label, Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => onTypeChange(value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              eventType === value
                ? "bg-[#FF6D00]/10 text-[#FF6D00] border border-[#FF6D00]/30"
                : "bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {/* Location Text */}
      <input
        type="text"
        value={location}
        onChange={(e) => onLocationChange(e.target.value)}
        placeholder={LOCATION_PLACEHOLDER[eventType]}
        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6D00]/50"
      />
    </div>
  );
}
