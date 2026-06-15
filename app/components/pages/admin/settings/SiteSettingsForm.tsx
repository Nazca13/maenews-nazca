// app/components/pages/admin/settings/SiteSettingsForm.tsx
// Form for editing global site metadata: name, description, logo, favicon, socials.
"use client";

import { Save } from "lucide-react";
import { SiteSettings } from "@/app/typing/Admin";

interface SiteSettingsFormProps {
  settings: SiteSettings;
  saving: boolean;
  onChange: (updated: SiteSettings) => void;
  onSave: () => void;
}

export function SiteSettingsForm({
  settings,
  saving,
  onChange,
  onSave,
}: SiteSettingsFormProps) {
  function patch(partial: Partial<SiteSettings>) {
    onChange({ ...settings, ...partial });
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
      {/* Site Name */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Site Name
        </label>
        <input
          type="text"
          value={settings.siteName}
          onChange={(e) => patch({ siteName: e.target.value })}
          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6D00]/50"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Description
        </label>
        <textarea
          value={settings.siteDescription}
          onChange={(e) => patch({ siteDescription: e.target.value })}
          rows={3}
          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6D00]/50 resize-none"
        />
      </div>

      {/* Logo & Favicon */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Logo URL
          </label>
          <input
            type="text"
            value={settings.logoUrl}
            onChange={(e) => patch({ logoUrl: e.target.value })}
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6D00]/50"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Favicon URL
          </label>
          <input
            type="text"
            value={settings.faviconUrl}
            onChange={(e) => patch({ faviconUrl: e.target.value })}
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6D00]/50"
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Instagram
          </label>
          <input
            type="text"
            value={settings.socialLinks.instagram ?? ""}
            onChange={(e) =>
              patch({
                socialLinks: {
                  ...settings.socialLinks,
                  instagram: e.target.value,
                },
              })
            }
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6D00]/50"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Facebook
          </label>
          <input
            type="text"
            value={settings.socialLinks.facebook ?? ""}
            onChange={(e) =>
              patch({
                socialLinks: {
                  ...settings.socialLinks,
                  facebook: e.target.value,
                },
              })
            }
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
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
}
