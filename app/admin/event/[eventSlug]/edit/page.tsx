import { EventEditorPage } from "@/app/components/pages/admin/event/EventEditorPage";
export default async function EditEventPage({ params }: { params: Promise<{ eventSlug: string }> }) {
  const { eventSlug } = await params;
  return <EventEditorPage slug={eventSlug} />;
}
