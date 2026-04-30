import { ReactNode } from "react"
import Header from "@/components/shared/main/Header"
import Footer from "@/components/shared/main/Footer"
import ScrollToTop from "@/components/shared/main/ScrollToTop"
import MaintenancePage from "@/components/MaintenancePage"
import { TrafficTracker } from "@/components/shared/TrafficTracker"

async function getSiteSettings() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/site-settings`,
      { next: { revalidate: 30 } },
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const settings = await getSiteSettings();

  if (settings?.maintenanceMode) {
    return <MaintenancePage />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <TrafficTracker />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
