// app/components/pages/admin/event/EventBannerUploader.tsx
// Thin semantic wrapper around the shared ThumbnailUploader,
// scoped to event banners. Keeps the event editor declarative.
"use client";

import { ThumbnailUploader } from "../article/ThumbnailUploader";

interface EventBannerUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

export function EventBannerUploader({ value, onChange }: EventBannerUploaderProps) {
  return <ThumbnailUploader value={value} onChange={onChange} label="Event Banner" />;
}
