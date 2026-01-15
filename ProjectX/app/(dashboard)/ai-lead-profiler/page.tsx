"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";
import { Modal } from "@/components/ui/Modal";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import {
    UserSearch,
    Eye,
    Facebook,
    Twitter,
    Linkedin,
    FileText,
    Plus,
    Search,
    MapPin,
    Globe,
    Users,
    Star,
    Smartphone,
    Activity,
    ShieldCheck,
    Instagram,
    MessageCircle
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import { HeaderActions } from "@/components/layout/HeaderActions";

interface Lead {
    id: string;
    name: string;
    phone: string;
    email: string;
    zip: string;
    leadScore: number;
    propertyValue: string;
    socialProfiles: {
        facebook?: string;
        twitter?: string;
        linkedin?: string;
        instagram?: string;
        whatsapp?: string;
        telegram?: string;
    };
    aiSummary: string;
    salesCheatSheet?: string[];
    qualitySignals: {
        verifiedMobile: boolean;
        voipCheck: "pass" | "fail";
        botDetection: "pass" | "fail";
        qualification: "high" | "medium" | "low";
        addressVerified: boolean;
    };
}

const mockLeads: Lead[] = [
    {
        id: "1",
        name: "John Doe",
        phone: "+1 (555) 123-4567",
        email: "john.doe@email.com",
        zip: "10005",
        leadScore: 95,
        propertyValue: "$1.2M",
        socialProfiles: {
            facebook: "facebook.com/johndoe",
            linkedin: "linkedin.com/in/johndoe",
            whatsapp: "+15551234567",
        },
        aiSummary: "High-value homeowner, active on social media, previous HVAC service history",
        salesCheatSheet: [
            "💰 High-Value Property: Pitch premium 'Inverter' systems.",
            "⚠️ Home built before 2000: HVAC likely nearing end of life.",
            "👔 Decision Maker: Likely values time over lowest price."
        ],
        qualitySignals: {
            verifiedMobile: true,
            voipCheck: "pass",
            botDetection: "pass",
            qualification: "high",
            addressVerified: true
        }
    },
    {
        id: "2",
        name: "Jane Smith",
        phone: "+1 (555) 234-5678",
        email: "jane.smith@email.com",
        zip: "10010",
        leadScore: 78,
        propertyValue: "$850K",
        socialProfiles: {
            twitter: "twitter.com/janesmith",
            telegram: "t.me/janesmith",
        },
        aiSummary: "Mid-value property, new homeowner, interested in maintenance services",
        salesCheatSheet: [
            "🏠 New Homeowner: Pitch 'Peace of Mind' maintenance plan.",
            "⚡ Energy Conscious: Mention SEER2 ratings."
        ],
        qualitySignals: {
            verifiedMobile: true,
            voipCheck: "pass",
            botDetection: "pass",
            qualification: "medium",
            addressVerified: false
        }
    },
    {
        id: "3",
        name: "Bob Johnson",
        phone: "+1 (555) 345-6789",
        email: "bob.j@email.com",
        zip: "10020",
        leadScore: 65,
        propertyValue: "$600K",
        socialProfiles: {},
        aiSummary: "Lower engagement, needs nurturing, potential for long-term value",
        salesCheatSheet: [
            "📉 Budget Conscious: Lead with financing options.",
            "🔧 Repair vs Replace: Focus on extending unit life."
        ],
        qualitySignals: {
            verifiedMobile: false,
            voipCheck: "fail",
            botDetection: "pass",
            qualification: "low",
            addressVerified: true
        }
    },
    {
        id: "4",
        name: "Alice Williams",
        phone: "+1 (555) 456-7890",
        email: "alice.w@email.com",
        zip: "10001",
        leadScore: 88,
        propertyValue: "$1.5M",
        socialProfiles: {
            facebook: "facebook.com/alicew",
            linkedin: "linkedin.com/in/alicew",
            twitter: "twitter.com/alicew",
            instagram: "instagram.com/alicew",
            whatsapp: "+15554567890",
        },
        aiSummary: "Premium client, strong social presence, multiple properties",
        salesCheatSheet: [
            "🏢 Mutli-Property Owner: Pitch portfolio maintenance deal.",
            "🌟 VIP Status: Offer priority dispatch."
        ],
        qualitySignals: {
            verifiedMobile: true,
            voipCheck: "pass",
            botDetection: "pass",
            qualification: "high",
            addressVerified: true
        }
    },
];

export default function AILeadProfilerPage() {
    const [propertyWeight, setPropertyWeight] = useState(40);
    const [socialWeight, setSocialWeight] = useState(20);
    const [trustWeight, setTrustWeight] = useState(20);
    const [verificationWeight, setVerificationWeight] = useState(20);
    const [qualificationWeight, setQualificationWeight] = useState(0);
    const [requireTrueCaller, setRequireTrueCaller] = useState(false);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [showProfileModal, setShowProfileModal] = useState(false);

    const WhatsAppIcon = ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.431 5.63 1.432h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );

    const TelegramIcon = ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M11.944 0C5.346 0 0 5.346 0 11.944s5.346 11.944 11.944 11.944 11.944-5.346 11.944-11.944S18.542 0 11.944 0zm5.862 8.133l-2.029 9.564c-.15.68-.555.845-1.127.525l-3.091-2.278-1.492 1.435c-.164.164-.303.303-.62.303l.222-3.149 5.732-5.179c.249-.221-.054-.344-.385-.124l-7.087 4.462-3.051-.954c-.664-.208-.679-.664.138-.983l11.939-4.601c.553-.207 1.037.124.832.98z" />
        </svg>
    );

    const getScoreBadge = (score: number) => {
        if (score >= 90) return <Badge variant="success">{score}/100</Badge>;
        if (score >= 70) return <Badge variant="info">{score}/100</Badge>;
        if (score >= 50) return <Badge variant="warning">{score}/100</Badge>;
        return <Badge variant="danger">{score}/100</Badge>;
    };

    return (
        <div
            className="flex flex-col h-full gap-8"
        >

            <HeaderActions>
                <Button className="rounded-[2rem]">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Lead Score Report
                </Button>
            </HeaderActions>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Leads Table */}
                <div className="lg:col-span-2">
                    <Card variant="default">
                        <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">Recent Profiled Leads</h3>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>ZIP</TableHead>
                                        <TableHead>Lead Score</TableHead>
                                        <TableHead>Property Value</TableHead>
                                        <TableHead>Social Profiles</TableHead>
                                        <TableHead>AI Summary</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockLeads.map((lead) => (
                                        <TableRow key={lead.id}>
                                            <TableCell className="font-medium">{lead.name}</TableCell>
                                            <TableCell>{lead.phone}</TableCell>
                                            <TableCell>{lead.email}</TableCell>
                                            <TableCell>{lead.zip}</TableCell>
                                            <TableCell>{getScoreBadge(lead.leadScore)}</TableCell>
                                            <TableCell>{lead.propertyValue}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    {lead.socialProfiles.facebook && (
                                                        <Facebook className="w-4 h-4 text-bblue-500" />
                                                    )}
                                                    {lead.socialProfiles.twitter && (
                                                        <Twitter className="w-4 h-4 text-bblue-400" />
                                                    )}
                                                    {lead.socialProfiles.linkedin && (
                                                        <Linkedin className="w-4 h-4 text-bblue-600" />
                                                    )}
                                                    {lead.socialProfiles.instagram && (
                                                        <Instagram className="w-4 h-4 text-pink-500" />
                                                    )}
                                                    {lead.socialProfiles.whatsapp && (
                                                        <WhatsAppIcon className="w-4 h-4 text-green-500" />
                                                    )}
                                                    {lead.socialProfiles.telegram && (
                                                        <TelegramIcon className="w-4 h-4 text-blue-400" />
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">
                                                {lead.aiSummary}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedLead(lead);
                                                        setShowProfileModal(true);
                                                    }}
                                                >
                                                    <Eye className="w-4 h-4 mr-1" />
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </div>

                {/* Lead Score Configuration */}
                <div>
                    <Card variant="default">
                        <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">
                            Lead Score Configuration
                        </h3>
                        <div className="flex flex-col h-full gap-8">
                            <div>
                                <Slider
                                    label="Trust (Bot/IP) Weight"
                                    min={0}
                                    max={100}
                                    value={trustWeight}
                                    onChange={(e) => setTrustWeight(Number(e.target.value))}
                                />
                            </div>
                            <div>
                                <Slider
                                    label="Verification (SMS/HLR) Weight"
                                    min={0}
                                    max={100}
                                    value={verificationWeight}
                                    onChange={(e) => setVerificationWeight(Number(e.target.value))}
                                />
                            </div>
                            <div>
                                <Slider
                                    label="Qualification Answers Weight"
                                    min={0}
                                    max={100}
                                    value={qualificationWeight}
                                    onChange={(e) => setQualificationWeight(Number(e.target.value))}
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={requireTrueCaller}
                                        onChange={(e) => setRequireTrueCaller(e.target.checked)}
                                        className="w-4 h-4 rounded"
                                    />
                                    <span className="text-sm font-sans text-text-primary dark:text-white">
                                        Require TrueCaller Verification for max score
                                    </span>
                                </label>
                            </div>
                        </div>
                    </Card>
                </div>
            </div >

            {/* View Full Profile Modal */}
            < Modal
                isOpen={showProfileModal}
                onClose={() => {
                    setShowProfileModal(false);
                    setSelectedLead(null);
                }
                }
                title={selectedLead ? `Lead Profile: ${selectedLead.name}` : "Lead Profile"}
                size="lg"
            >
                {selectedLead && (
                    <div className="flex flex-col h-full gap-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-1 font-sans">
                                    Lead Score
                                </p>
                                <div className="text-3xl font-display font-semibold text-coral">
                                    {selectedLead.leadScore}/100
                                </div>
                                {getScoreBadge(selectedLead.leadScore)}
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-1 font-sans">
                                    Property Value
                                </p>
                                <div className="text-2xl font-display font-semibold text-text-primary dark:text-white">
                                    {selectedLead.propertyValue}
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                                Contact Information
                            </p>
                            <div className="space-y-2">
                                <p className="text-sm font-sans text-text-primary dark:text-white">
                                    <span className="font-medium">Phone:</span> {selectedLead.phone}
                                </p>
                                <p className="text-sm font-sans text-text-primary dark:text-white">
                                    <span className="font-medium">Email:</span> {selectedLead.email}
                                </p>
                                <p className="text-sm font-sans text-text-primary dark:text-white">
                                    <span className="font-medium">ZIP Code:</span> {selectedLead.zip}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                                Social Profiles
                            </p>
                            <div className="flex gap-4">
                                {selectedLead.socialProfiles.facebook && (
                                    <div className="flex items-center gap-2">
                                        <Facebook className="w-5 h-5 text-bblue-500" />
                                        <span className="text-sm font-sans text-text-primary dark:text-white">Facebook</span>
                                    </div>
                                )}
                                {selectedLead.socialProfiles.twitter && (
                                    <div className="flex items-center gap-2">
                                        <Twitter className="w-5 h-5 text-bblue-400" />
                                        <span className="text-sm font-sans text-text-primary dark:text-white">Twitter</span>
                                    </div>
                                )}
                                {selectedLead.socialProfiles.linkedin && (
                                    <div className="flex items-center gap-2">
                                        <Linkedin className="w-5 h-5 text-bblue-600" />
                                        <span className="text-sm font-sans text-text-primary dark:text-white">LinkedIn</span>
                                    </div>
                                )}
                                {selectedLead.socialProfiles.instagram && (
                                    <div className="flex items-center gap-2">
                                        <Instagram className="w-5 h-5 text-pink-500" />
                                        <span className="text-sm font-sans text-text-primary dark:text-white">Instagram</span>
                                    </div>
                                )}
                                {selectedLead.socialProfiles.whatsapp && (
                                    <div className="flex items-center gap-2">
                                        <WhatsAppIcon className="w-5 h-5 text-green-500" />
                                        <span className="text-sm font-sans text-text-primary dark:text-white">WhatsApp</span>
                                    </div>
                                )}
                                {selectedLead.socialProfiles.telegram && (
                                    <div className="flex items-center gap-2">
                                        <TelegramIcon className="w-5 h-5 text-blue-400" />
                                        <span className="text-sm font-sans text-text-primary dark:text-white">Telegram</span>
                                    </div>
                                )}
                                {Object.keys(selectedLead.socialProfiles).length === 0 && (
                                    <p className="text-sm font-sans text-text-secondary dark:text-white/70">
                                        No social profiles found
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                                Quality Signals
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-black/5 dark:bg-white/5">
                                    <Smartphone className={twMerge("w-4 h-4", selectedLead.qualitySignals.verifiedMobile ? "text-green-500" : "text-red-500")} />
                                    <span className="text-xs">SMS Verified</span>
                                </div>
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-black/5 dark:bg-white/5">
                                    <ShieldCheck className={twMerge("w-4 h-4", selectedLead.qualitySignals.voipCheck === "pass" ? "text-green-500" : "text-yellow-500")} />
                                    <span className="text-xs">Mobile (Non-VOIP)</span>
                                </div>
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-black/5 dark:bg-white/5">
                                    <Activity className={twMerge("w-4 h-4", selectedLead.qualitySignals.botDetection === "pass" ? "text-green-500" : "text-red-500")} />
                                    <span className="text-xs">Human Behavior</span>
                                </div>
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-black/5 dark:bg-white/5">
                                    <MapPin className={twMerge("w-4 h-4", selectedLead.qualitySignals.addressVerified ? "text-green-500" : "text-yellow-500")} />
                                    <span className="text-xs">Addres Validated</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                                AI Summary
                            </p>
                            <p className="text-sm font-sans text-text-primary dark:text-white leading-relaxed">
                                {selectedLead.aiSummary}
                            </p>
                        </div>
                    </div>
                )}
            </Modal >
        </div >
    );
}



