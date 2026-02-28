import { getUpcomingEvents } from "@/app/lib/api";
import { EventCard } from "@/app/components/EventCard";
import { CalendarDays } from "lucide-react";

export default async function EventsPage() {
  const events = await getUpcomingEvents();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-10 pb-4 border-b-2 border-gray-100">
        <CalendarDays className="text-primary w-8 h-8" />
        <h1 className="text-4xl font-black text-gray-900 italic">EVENT JEPANG <span className="text-primary">2026</span></h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events?.map((e) => <EventCard key={e.id} event={e} />)}
      </div>
    </main>
  );
}