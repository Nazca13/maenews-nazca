// app/components/pages/admin/event/EventEditorPage.tsx
// Create / Edit event form. Delegates UI sections to dedicated sub-components.
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/app/lib/adminApi";
import { EventFormData } from "@/app/typing/Admin";
import { Event } from "@/app/typing";
import { FormPageHeader } from "@/app/components/ui/admin/FormPageHeader";
import { EventDateRangePicker } from "./EventDateRangePicker";
import { EventLocationInput } from "./EventLocationInput";
import { EventBannerUploader } from "./EventBannerUploader";

interface EventEditorPageProps {
  slug?: string;
}

const EMPTY_FORM: EventFormData = {
  title: "",
  slug: "",
  description: "",
  thumbnailUrl: "",
  location: "",
  startDate: "",
  endDate: "",
  status: "upcoming",
  organizer: "",
  tags: [],
  eventType: "offline",
};

export function EventEditorPage({ slug }: EventEditorPageProps) {
  const router = useRouter();
  const isEdit = !!slug;
  const [form, setForm] = useState<EventFormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!slug) return;
    adminApi.getAdminEventBySlug(slug).then((event) => {
      if (!event) return;
      setForm({
        title: event.title,
        slug: event.slug,
        description: event.description,
        thumbnailUrl: event.thumbnailUrl,
        location: event.location,
        startDate: event.startDate,
        endDate: event.endDate,
        status: event.status,
        organizer: event.organizer,
        tags: event.tags,
        eventType: "offline",
      });
    });
  }, [slug]);

  function handleChange<K extends keyof EventFormData>(
    field: K,
    value: EventFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      if (isEdit) {
        await adminApi.updateEvent(slug!, form);
      } else {
        await adminApi.createEvent(form);
      }
      router.push("/admin/event");
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <FormPageHeader
        title={isEdit ? "Edit Event" : "Create Event"}
        backHref="/admin/event"
        actionLabel={saving ? "Saving..." : isEdit ? "Update" : "Create"}
        onAction={handleSave}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* ── Main Column ───────────────────────────── */}
        <div className="space-y-5">
          {/* Title + Slug */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Event title..."
              className="w-full text-xl font-bold text-gray-900 placeholder:text-gray-300 outline-none"
            />
            <input
              type="text"
              value={form.slug}
              onChange={(e) => handleChange("slug", e.target.value)}
              placeholder="event-slug"
              className="w-full text-sm text-gray-500 placeholder:text-gray-300 outline-none mt-2"
            />
          </div>

          {/* Description */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <label className="block text-xs font-semibold text-gray-600 mb-2">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Event description..."
              rows={5}
              className="w-full text-sm text-gray-700 placeholder:text-gray-300 outline-none resize-none"
            />
          </div>

          {/* Date Range */}
          <EventDateRangePicker
            startDate={form.startDate}
            endDate={form.endDate}
            onStartChange={(v) => handleChange("startDate", v)}
            onEndChange={(v) => handleChange("endDate", v)}
          />

          {/* Location */}
          <EventLocationInput
            eventType={form.eventType}
            location={form.location}
            onTypeChange={(v) => handleChange("eventType", v)}
            onLocationChange={(v) => handleChange("location", v)}
          />
        </div>

        {/* ── Sidebar Column ────────────────────────── */}
        <div className="space-y-5">
          {/* Status */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) =>
                handleChange("status", e.target.value as Event["status"])
              }
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6D00]/50"
            >
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="ended">Ended</option>
            </select>
          </div>

          {/* Organizer */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Organizer
            </label>
            <input
              type="text"
              value={form.organizer}
              onChange={(e) => handleChange("organizer", e.target.value)}
              placeholder="Organizer name"
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6D00]/50"
            />
          </div>

          {/* Tags */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Tags
            </label>
            <input
              type="text"
              value={form.tags.join(", ")}
              onChange={(e) =>
                handleChange(
                  "tags",
                  e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                )
              }
              placeholder="tag1, tag2"
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6D00]/50"
            />
          </div>

          {/* Banner */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <EventBannerUploader
              value={form.thumbnailUrl}
              onChange={(url) => handleChange("thumbnailUrl", url)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
