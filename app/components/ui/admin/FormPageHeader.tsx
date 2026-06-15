import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

interface FormPageHeaderProps {
  title: string;
  backHref: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function FormPageHeader({
  title,
  backHref,
  actionLabel,
  actionHref,
  onAction,
}: FormPageHeaderProps) {
  const actionProps = actionHref
    ? { href: actionHref }
    : onAction
      ? { onClick: onAction }
      : {};

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <Link
          href={backHref}
          className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      </div>

      {actionLabel && (
        actionHref ? (
          <Link
            href={actionHref}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6D00] hover:bg-[#e56200] text-white text-sm font-semibold rounded-lg transition-colors"
          >
            <Plus size={16} />
            {actionLabel}
          </Link>
        ) : (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6D00] hover:bg-[#e56200] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <Plus size={16} />
            {actionLabel}
          </button>
        )
      )}
    </div>
  );
}
