"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Image } from "lucide-react";

interface MediaUploadDropzoneProps {
  onUpload: (files: File[]) => void;
}

export function MediaUploadDropzone({ onUpload }: MediaUploadDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onUpload(acceptedFiles);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"] },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
        isDragActive
          ? "border-[#FF6D00] bg-orange-50 scale-[1.01]"
          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${isDragActive ? "bg-[#FF6D00]/10" : "bg-gray-100"}`}>
          <Upload size={24} className={isDragActive ? "text-[#FF6D00]" : "text-gray-400"} />
        </div>
        <p className="text-sm font-medium text-gray-700">
          {isDragActive ? "Drop files here" : "Drag & drop media files"}
        </p>
        <p className="text-xs text-gray-400 mt-1">or click to browse. PNG, JPG, WebP, GIF</p>
      </div>
    </div>
  );
}
