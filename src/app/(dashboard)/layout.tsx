import AuthWrapper from "@/components/Layout/AuthWrapper";
import Navbar from "@/components/Dashboard/Layout/Navbar";
import Sidebar from "@/components/Dashboard/Layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper>
      <section className="flex h-screen w-full">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <Navbar />
          <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
            {children}
          </div>
        </main>
      </section>
    </AuthWrapper>
  );
}
