import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-ivory dark:bg-dark-bg lg:p-4 lg:gap-4">
            <Header />
            <div className="flex-1 flex overflow-hidden lg:gap-4">
                <Sidebar />
                <main className="flex-1 overflow-hidden rounded-[2rem] bg-transparent relative">
                    <div className="h-full overflow-y-auto p-4 md:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}



