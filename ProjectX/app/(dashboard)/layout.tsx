import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import FloatingAssistant from "@/components/layout/FloatingAssistant";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-ivory dark:bg-dark-bg p-6 gap-6">
            <Header />
            <div className="flex-1 flex overflow-hidden gap-6">
                <Sidebar />
                <main className="flex-1 overflow-hidden relative rounded-card bg-surface dark:bg-dark-surface border border-black/5 dark:border-white/5">
                    <div className="h-full overflow-y-auto p-0 no-scrollbar">
                        {children}
                    </div>
                </main>
            </div>
            <FloatingAssistant />
        </div>
    );
}
