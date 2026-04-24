import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel · Rincones Bari",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {children}
    </div>
  );
}
