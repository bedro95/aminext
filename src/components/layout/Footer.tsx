import Link from "next/link";
import { ChartBar } from "@phosphor-icons/react/dist/ssr";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--muted)] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-sky-500/20">
                <ChartBar size={15} weight="duotone" color="white" />
              </div>
              <span className="text-sm font-bold text-[var(--foreground)]">Senku</span>
            </div>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-xs">
              Tracking how artificial intelligence is reshaping every profession on Earth. Data-driven, always updated.
            </p>
            <p className="text-xs text-[var(--muted-foreground)]">
              Data sourced from Oxford University, McKinsey Global Institute, WEF, Goldman Sachs, and Bureau of Labor Statistics.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Explore</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Our Mission</h3>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              In the age of AGI, transparency matters. {SITE_NAME} exists to give every person on Earth clear, honest data about how AI is transforming work — so they can adapt, prepare, and thrive.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted-foreground)]">© {currentYear} Senku — The Human Automation Index.</p>
          <p className="text-xs text-[var(--muted-foreground)]">Built for the AGI era · senku.fun</p>
        </div>
      </div>
    </footer>
  );
}
