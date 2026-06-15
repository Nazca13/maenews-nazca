// app/components/pages/admin/settings/SettingsPage.tsx
// Orchestrates three settings tabs: Site Settings, Author Profile, Trending Manager.
// All heavy form UI is delegated to sub-components.
"use client";

import { useEffect, useState } from "react";
import { adminApi } from "@/app/lib/adminApi";
import { SiteSettings, AuthorProfile } from "@/app/typing/Admin";
import { FormPageHeader } from "@/app/components/ui/admin/FormPageHeader";
import { SiteSettingsForm } from "./SiteSettingsForm";
import { AuthorProfileForm } from "./AuthorProfileForm";
import { TrendingManagerPanel } from "./TrendingManagerPanel";
import { Globe, User, TrendingUp } from "lucide-react";

type Tab = "site" | "author" | "trending";

type TrendingItem = {
  id: string;
  title: string;
  slug: string;
  pinned: boolean;
};

const TABS: { id: Tab; label: string; Icon: typeof Globe }[] = [
  { id: "site", label: "Site Settings", Icon: Globe },
  { id: "author", label: "Author Profile", Icon: User },
  { id: "trending", label: "Trending Manager", Icon: TrendingUp },
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("site");
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [author, setAuthor] = useState<AuthorProfile | null>(null);
  const [trending, setTrending] = useState<TrendingItem[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminApi.getSiteSettings().then(setSettings);
    adminApi.getAuthorProfile().then(setAuthor);
    adminApi.getTrendingManager().then(setTrending);
  }, []);

  async function handleSaveSettings() {
    if (!settings) return;
    setSaving(true);
    await adminApi.updateSiteSettings(settings);
    setSaving(false);
  }

  async function handleSaveAuthor() {
    if (!author) return;
    setSaving(true);
    await adminApi.updateAuthorProfile(author);
    setSaving(false);
  }

  function handleTrendingToggle(slug: string) {
    setTrending((prev) =>
      prev.map((t) => (t.slug === slug ? { ...t, pinned: !t.pinned } : t))
    );
  }

  return (
    <div>
      <FormPageHeader title="Settings" backHref="/admin" />

      {/* Tab Bar */}
      <div className="flex gap-1 mb-6 bg-white border border-gray-200 rounded-xl p-1 w-fit">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activeTab === id
                ? "bg-[#FF6D00] text-white"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === "site" && settings && (
        <SiteSettingsForm
          settings={settings}
          saving={saving}
          onChange={setSettings}
          onSave={handleSaveSettings}
        />
      )}

      {activeTab === "author" && author && (
        <AuthorProfileForm
          author={author}
          saving={saving}
          onChange={setAuthor}
          onSave={handleSaveAuthor}
        />
      )}

      {activeTab === "trending" && (
        <TrendingManagerPanel
          items={trending}
          onToggle={handleTrendingToggle}
        />
      )}
    </div>
  );
}
