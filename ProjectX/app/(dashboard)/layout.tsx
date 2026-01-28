import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { AboutModal } from "@/components/layout/AboutModal";
import { DashboardThemeEnforcer } from "@/components/providers/DashboardThemeEnforcer";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <DashboardThemeEnforcer />
            
            {/* Dark theme background */}
            <div 
                className="fixed inset-0 -z-10 bg-[#1A1A1A]"
            />

            {/* Main Layout Container */}
            <div className="dash-light relative z-10 flex h-[100dvh] p-4 lg:p-5 gap-4 lg:gap-5 overflow-hidden">
                {/* Sidebar - full height left block */}
                <Sidebar />
                
                {/* Right side: Header + Main Content */}
                <div className="flex-1 flex flex-col min-h-0 gap-4 lg:gap-5 overflow-hidden">
                    <Header />
                    
                    {/* Main Content Area - dark theme */}
                    <main className="flex-1 min-w-0 overflow-hidden relative rounded-container shadow-[0_2px_8px_rgba(0,0,0,0.3),0_4px_16px_rgba(0,0,0,0.2)] animate-gradient border border-white/10" style={{
                        background: 'linear-gradient(135deg, #1F2326 0%, #1A2427 25%, #1C2528 50%, #1E2529 75%, #1F2326 100%)'
                    }}>
                        <div className="h-full overflow-y-auto no-scrollbar p-6">
                            {children}
                        </div>
                    </main>
                </div>
                
                <AboutModal />
            </div>
        </>
    );
}
