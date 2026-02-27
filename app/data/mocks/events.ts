// app/data/mocks/events.ts

import { Event } from "@/app/typing";

export const upcomingEvents: Event[] = [
    {
        id: "event-1",
        title: "Comic Frontier 17",
        location: "ICE BSD, Tangerang",
        date: "2025-09-06T10:00:00Z",
        category: "Convention",
        description: "Event doujin dan indie creator terbesar di Indonesia. Temukan karya-karya kreatif dari seniman lokal dan internasional.",
        imageUrl: "https://placehold.co/400x300/7C2D12/FFFFFF?text=Comifuro+17",
        slug: "comic-frontier-17",
    },
    {
        id: "event-2",
        title: "Indonesia Comic Con 2025",
        location: "Jakarta Convention Center",
        date: "2025-11-01T10:00:00Z",
        category: "Pop Culture",
        description: "Festival pop culture terbesar di Indonesia dengan booth eksklusif, cosplay competition, dan panel menarik.",
        imageUrl: "https://placehold.co/400x300/BE185D/FFFFFF?text=ICC+2025",
        slug: "indonesia-comic-con-2025",
    },
    {
        id: "event-3",
        title: "Anime Festival Asia Indonesia 2025",
        location: "JI Expo Kemayoran, Jakarta",
        date: "2025-12-13T09:00:00Z",
        category: "Anime Event",
        description: "Festival anime terbesar di Asia Tenggara dengan guest seiyuu, konser J-Pop, dan pameran eksklusif.",
        imageUrl: "https://placehold.co/400x300/4338CA/FFFFFF?text=AFA+ID+2025",
        slug: "anime-festival-asia-indonesia-2025",
    },
];
