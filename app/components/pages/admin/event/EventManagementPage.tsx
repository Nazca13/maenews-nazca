"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/app/lib/adminApi";
import { Event } from "@/app/typing";
import { DataTable } from "@/app/components/ui/admin/DataTable";
import { FormPageHeader } from "@/app/components/ui/admin/FormPageHeader";
import { ConfirmModal } from "@/app/components/ui/admin/ConfirmModal";
import { EventStatusIndicator } from "./EventStatusIndicator";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { formatShortDate } from "@/app/utils/dateUtils";

export function EventManagementPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);

  useEffect(() => {
    adminApi.getAdminEvents().then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async () => {
    if (!deleteSlug) return;
    await adminApi.deleteEvent(deleteSlug);
    setEvents((prev) => prev.filter((e) => e.slug !== deleteSlug));
    setDeleteSlug(null);
  };

  const columns: ColumnDef<Event, unknown>[] = [
    {
      accessorKey: "title",
      header: "Event",
      cell: ({ row }) => {
        const event = row.original;
        return (
          <div className="flex items-center gap-3">
            {event.thumbnailUrl && (
              <img src={event.thumbnailUrl} alt="" className="w-12 h-9 rounded object-cover bg-gray-100 flex-shrink-0" />
            )}
            <div className="min-w-0">
              <Link href={`/admin/event/${event.slug}/edit`} className="text-sm font-medium text-gray-800 hover:text-[#FF6D00] transition-colors line-clamp-1">
                {event.title}
              </Link>
              <p className="text-[11px] text-gray-400 mt-0.5">{event.location}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => <EventStatusIndicator status={getValue() as Event["status"]} />,
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ getValue }) => <span className="text-sm text-gray-600">{formatShortDate(getValue() as string)}</span>,
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({ getValue }) => <span className="text-sm text-gray-600">{formatShortDate(getValue() as string)}</span>,
    },
    {
      accessorKey: "organizer",
      header: "Organizer",
      cell: ({ getValue }) => <span className="text-sm text-gray-600">{getValue() as string}</span>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const event = row.original;
        return (
          <div className="flex items-center gap-1 justify-end">
            <Link href={`/event/${event.slug}`} className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              <ExternalLink size={14} />
            </Link>
            <button onClick={() => router.push(`/admin/event/${event.slug}/edit`)} className="p-1.5 rounded-md text-gray-400 hover:text-[#FF6D00] hover:bg-orange-50 transition-colors cursor-pointer">
              <Pencil size={14} />
            </button>
            <button onClick={() => setDeleteSlug(event.slug)} className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer">
              <Trash2 size={14} />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <FormPageHeader title="Event Management" backHref="/admin" actionLabel="New Event" actionHref="/admin/event/create" />

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-[#FF6D00] border-t-transparent rounded-full mx-auto" />
        </div>
      ) : (
        <DataTable<Event> data={events} columns={columns} searchColumn="title" searchPlaceholder="Search events..." />
      )}

      <ConfirmModal
        isOpen={!!deleteSlug}
        onClose={() => setDeleteSlug(null)}
        onConfirm={handleDelete}
        title="Delete Event"
        message="This event will be permanently removed."
        confirmLabel="Delete Event"
      />
    </div>
  );
}
