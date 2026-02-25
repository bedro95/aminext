import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-6xl mb-4">🤖</p>
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Page Not Found</h1>
      <p className="text-[var(--muted-foreground)] mb-8 max-w-sm">
        Even AI can&apos;t find this page. It may have been automated away.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 dark:bg-sky-400 dark:hover:bg-sky-500 text-white dark:text-slate-900 font-semibold text-sm transition-all"
      >
        <ArrowLeft size={14} />
        Back to Home
      </Link>
    </div>
  );
}
