// app/components/pages/admin/settings/AvatarUploader.tsx
// Displays current avatar and allows the user to upload a new one via drag-drop.
"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { User, Camera } from "lucide-react";

interface AvatarUploaderProps {
  avatarUrl: string;
  name: string;
  onChange: (url: string) => void;
}

export function AvatarUploader({ avatarUrl, name, onChange }: AvatarUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => onChange(reader.result as string);
      reader.readAsDataURL(file);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative w-20 h-20 rounded-full cursor-pointer transition-all ${
        isDragActive ? "ring-2 ring-[#FF6D00] ring-offset-2" : ""
      }`}
    >
      <input {...getInputProps()} />

      {/* Avatar image or placeholder */}
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <div className="w-full h-full rounded-full bg-[#FF6D00]/10 flex items-center justify-center">
          <User size={32} className="text-[#FF6D00]" />
        </div>
      )}

      {/* Overlay on hover */}
      <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
        <Camera size={20} className="text-white" />
      </div>
    </div>
  );
}
