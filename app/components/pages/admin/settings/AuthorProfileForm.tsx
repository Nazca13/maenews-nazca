// app/components/pages/admin/settings/AuthorProfileForm.tsx
// Form for editing author profile: avatar, name, email, bio, social links.
"use client";

import { Save } from "lucide-react";
import { AuthorProfile } from "@/app/typing/Admin";
import { AvatarUploader } from "./AvatarUploader";

interface AuthorProfileFormProps {
  author: AuthorProfile;
  saving: boolean;
  onChange: (updated: AuthorProfile) => void;
  onSave: () => void;
}

export function AuthorProfileForm({
  author,
  saving,
  onChange,
  onSave,
}: AuthorProfileFormProps) {
  function patch(partial: Partial<AuthorProfile>) {
    onChange({ ...author, ...partial });
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
      {/* Avatar + Name/Email header */}
      <div className="flex items-center gap-4">
        <AvatarUploader
          avatarUrl={author.avatarUrl}
          name={author.name}
          onChange={(url) => patch({ avatarUrl: url })}
        />
        <div>
          <h3 className="text-lg font-bold text-gray-900">{author.name}</h3>
          <p className="text-sm text-gray-500">{author.email}</p>
        </div>
      </div>

      {/* Name & Email */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Name
          </label>
          <input
            type="text"
            value={author.name}
            onChange={(e) => patch({ name: e.target.value })}
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6D00]/50"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            value={author.email}
            onChange={(e) => patch({ email: e.target.value })}
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6D00]/50"
          />
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Bio
        </label>
        <textarea
          value={author.bio}
          onChange={(e) => patch({ bio: e.target.value })}
          rows={3}
          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6D00]/50 resize-none"
        />
      </div>

      {/* Social Links */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Instagram
          </label>
          <input
            type="text"
            value={author.socialLinks.instagram ?? ""}
            onChange={(e) =>
              patch({
                socialLinks: {
                  ...author.socialLinks,
                  instagram: e.target.value,
                },
              })
            }
            placeholder="@username"
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6D00]/50"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Twitter / X
          </label>
          <input
            type="text"
            value={author.socialLinks.twitter ?? ""}
            onChange={(e) =>
              patch({
                socialLinks: {
                  ...author.socialLinks,
                  twitter: e.target.value,
                },
              })
            }
            placeholder="@username"
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6D00]/50"
          />
        </div>
      </div>

      {/* Save */}
      <button
        onClick={onSave}
        disabled={saving}
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6D00] hover:bg-[#e56200] text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
      >
        <Save size={16} />
        {saving ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
}
