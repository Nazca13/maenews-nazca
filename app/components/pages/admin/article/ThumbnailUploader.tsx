"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, X } from "lucide-react";

interface ThumbnailUploaderProps {
  value: string;
  onChange: (url: string) => void;
  /** Display label shown above the upload zone. Defaults to "Thumbnail". */
  label?: string;
}

export function ThumbnailUploader({ value, onChange, label = "Thumbnail" }: ThumbnailUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        onChange(reader.result as string);
      };
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
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
      {value ? (
        <div className="relative group">
          <img
            src={value}
            alt="Thumbnail"
            className="w-full h-48 object-cover rounded-lg border border-gray-200"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-[#FF6D00] bg-orange-50"
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          }`}
        >
          <input {...getInputProps()} />
          <ImagePlus size={32} className="mx-auto text-gray-300 mb-2" />
          <p className="text-sm text-gray-500">
            {isDragActive ? "Drop image here" : "Click or drag to upload"}
          </p>
          <p className="text-[11px] text-gray-400 mt-1">PNG, JPG, WebP up to 5MB</p>
        </div>
      )}
    </div>
  );
}
