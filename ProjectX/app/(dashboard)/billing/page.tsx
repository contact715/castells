"use client";

import { motion } from "framer-motion";
import { CreditCard, Zap, BarChart, Download, Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function BillingPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold font-display tracking-tight text-white flex items-center gap-3">
                <CreditCard className="w-8 h-8 text-green-500" />
                Billing & Usage
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Current Plan */}
                <Card variant="default" className="lg:col-span-1 bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <div className="text-sm text-green-400 font-bold uppercase tracking-wide mb-1">Current Plan</div>
                            <h2 className="text-3xl font-bold text-white">Growth Scale</h2>
                        </div>
                        <span className="bg-green-500 text-black text-xs font-bold px-2 py-1 rounded">$497/mo</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                        {["Unlimited AI Calls", "5 Seats Included", "Priority Support", "API Access"].map(f => (
                            <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                                <Check className="w-4 h-4 text-green-500" /> {f}
                            </li>
                        ))}
                    </ul>
                    <Button className="w-full bg-white text-black hover:bg-gray-200">Manage Subscription</Button>
                </Card>

                {/* Usage Meter */}
                <Card variant="default" className="lg:col-span-2">
                    <h3 className="font-bold text-white mb-6 flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-500" /> Metered Usage (This Month)</h3>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-white">AI Voice Minutes</span>
                                <span className="text-text-secondary">842 / 1,000 Included</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full w-[84%] bg-green-500 rounded-full" />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-white">Vision Analysis API</span>
                                <span className="text-text-secondary">128 / 500 Included</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full w-[25%] bg-blue-500 rounded-full" />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-white">SMS Segments</span>
                                <span className="text-text-secondary">4,021 / 5,000 Included</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full w-[80%] bg-purple-500 rounded-full" />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Invoices */}
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-white">Invoices</h3>
                    <Button variant="ghost" size="sm">View All</Button>
                </div>
                <div className="divide-y divide-white/10">
                    {[
                        { id: "INV-2024-001", date: "Oct 1, 2025", amount: "$497.00", status: "Paid" },
                        { id: "INV-2024-002", date: "Sep 1, 2025", amount: "$497.00", status: "Paid" },
                        { id: "INV-2024-003", date: "Aug 1, 2025", amount: "$497.00", status: "Paid" },
                    ].map((inv) => (
                        <div key={inv.id} className="py-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-white/5 rounded">
                                    <FileTextIcon className="w-5 h-5 text-text-secondary" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">{inv.id}</div>
                                    <div className="text-xs text-text-secondary">{inv.date}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-white">{inv.amount}</span>
                                <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded border border-green-500/20">{inv.status}</span>
                                <Button variant="ghost" size="sm"><Download className="w-4 h-4" /></Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

function FileTextIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
    )
}
