// app/components/pages/admin/event/EventDateRangePicker.tsx
// Reusable date-range input pair for event scheduling.
"use client";

import { Calendar } from "lucide-react";

interface EventDateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
}

export function EventDateRangePicker({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
}: EventDateRangePickerProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-3">
        <Calendar size={14} />
        Event Schedule
      </label>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] text-gray-500 mb-1">
            Start Date
          </label>
          <input
            type="datetime-local"
            value={startDate ? startDate.slice(0, 16) : ""}
            onChange={(e) => onStartChange(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6D00]/50"
          />
        </div>
        <div>
          <label className="block text-[11px] text-gray-500 mb-1">
            End Date
          </label>
          <input
            type="datetime-local"
            value={endDate ? endDate.slice(0, 16) : ""}
            onChange={(e) => onEndChange(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6D00]/50"
          />
        </div>
      </div>
    </div>
  );
}
