import { User, Calendar, TrendingUp, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

// Types
export interface SalesPerson {
    id: string;
    name: string;
    role: string;
    avatar: string;
    status: "active" | "inactive";
}

export interface SalesMetrics {
    newLeads: number;
    calls: number;
    resultCalls: number;
    approvedTests: number;
    paidTests: number;
    contracts: number;
    salesAmount: number;
    plan: number; // Personal Plan
    teamPlan: number; // Generic team plan
    managerSalary: number;
    kpiBonus: number;
    kpiPercent: number;
    fines: number;
    dailyPlanMet: boolean; // For "Fire" visual effect
    conversion: {
        leadToApproved: number;
        leadToPaid: number;
        leadToContract: number;
        callToApproved: number;
        callToPaid: number;
        approvedToPaid: number;
    };
}

export interface WorkShift {
    date: string; // ISO date string YYYY-MM-DD
    type: 'shift' | 'off' | 'vacation' | 'sick';
}

// Data extracted from "Сводная таблица.html" and "Александр.html"

export const SALES_PEOPLE: SalesPerson[] = [
    {
        id: "evgeny_zh",
        name: "Евгений Ж.",
        role: "Ведущий Менеджер",
        avatar: "/avatars/evgeny.jpg", // Placeholder
        status: "active"
    },
    {
        id: "alexander",
        name: "Александр",
        role: "Менеджер",
        avatar: "/avatars/alex.jpg",
        status: "active"
    },
    { // Adding Angelica from the Graphic
        id: "angelica",
        name: "Анжелика",
        role: "Менеджер",
        avatar: "/avatars/angelica.jpg",
        status: "active"
    }
];

// Mock data based on the provided spreadsheets
export const SALES_DATA: Record<string, SalesMetrics> = {
    "evgeny_zh": {
        newLeads: 59,
        calls: 450, // Extrapolated as not explicitly in summary, but required for charts
        resultCalls: 197,
        approvedTests: 20,
        paidTests: 9,
        contracts: 0,
        salesAmount: 950000, // > 800k plan -> >100%
        plan: 800000,
        teamPlan: 5000000,
        managerSalary: 72500,
        kpiBonus: 7500,
        kpiPercent: 100,
        fines: 0,
        dailyPlanMet: true, // Fire Effect
        conversion: {
            leadToApproved: 33.9,
            leadToPaid: 15.3,
            leadToContract: 5,
            callToApproved: 10.2,
            callToPaid: 4.6,
            approvedToPaid: 45.0
        }
    },
    "alexander": {
        newLeads: 50, // derived from Александр.html Jan 2022
        calls: 380,
        resultCalls: 180, // approx
        approvedTests: 18,
        paidTests: 8,
        contracts: 1,
        salesAmount: 120000,
        plan: 800000,
        teamPlan: 5000000,
        managerSalary: 45000, // Estimated
        kpiBonus: 5000,
        kpiPercent: 45,
        fines: 2500, // From Александр.html Jan 2022
        dailyPlanMet: true, // Example: Alexander hit daily target
        conversion: {
            leadToApproved: 36,
            leadToPaid: 16,
            leadToContract: 2,
            callToApproved: 9,
            callToPaid: 4,
            approvedToPaid: 44
        }
    },
    "angelica": {
        newLeads: 45,
        calls: 320,
        resultCalls: 150,
        approvedTests: 15,
        paidTests: 7,
        contracts: 0,
        salesAmount: 0,
        plan: 800000,
        teamPlan: 5000000,
        managerSalary: 6000,
        kpiBonus: 3000,
        kpiPercent: 50,
        fines: 0,
        dailyPlanMet: true,
        conversion: {
            leadToApproved: 30,
            leadToPaid: 14,
            leadToContract: 0,
            callToApproved: 8,
            callToPaid: 3,
            approvedToPaid: 40
        }
    }
};

// Helper to generate schedule based on pattern in График.html
// Pattern seems to be: 2 days on, 2 days off, or similar 2/2 or 5/2. 
// "Анжелика" and "Александр" have '1's in the html.
export const generateWorkSchedule = (year: number, month: number): Record<string, WorkShift[]> => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const schedule: Record<string, WorkShift[]> = {};

    SALES_PEOPLE.forEach(person => {
        const shifts: WorkShift[] = [];
        for (let day = 1; day <= daysInMonth; day++) {
            const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            // Simple logic to mimic variety: 
            // Evgeny: Mon-Fri
            // Alexander: 2/2 starting day 1
            // Angelica: 2/2 starting day 2

            let type: 'shift' | 'off' = 'off';

            if (person.id === 'evgeny_zh') {
                const dayOfWeek = new Date(year, month, day).getDay();
                if (dayOfWeek !== 0 && dayOfWeek !== 6) type = 'shift';
            } else if (person.id === 'alexander') {
                if ((day % 4 === 1) || (day % 4 === 2)) type = 'shift';
            } else {
                if ((day % 4 === 3) || (day % 4 === 0)) type = 'shift';
            }

            shifts.push({ date, type });
        }
        schedule[person.id] = shifts;
    });

    return schedule;
};

// ------------------------------------------------------------------
// HISTORICAL DATA (Spreadsheet Replication)
// ------------------------------------------------------------------

export interface DailySalesStats {
    day: number;
    newLeads: number;
    resultCalls: number;
    approvedTests: number;
    paidTests: number;
    contracts: number;
    positions: number;
    salesAmount: number;
}

export interface MonthlyKPIData {
    id: string; // "YYYY-MM"
    monthName: string;
    daily: DailySalesStats[];
    kpi: {
        newLeads: { fact: number; plan: number; bonus: number; percent: number };
        resultCalls: { fact: number; plan: number; bonus: number; percent: number };
        approvedTests: { fact: number; plan: number; bonus: number; percent: number };
        paidTests: { fact: number; plan: number; bonus: number; percent: number };
        contracts: { fact: number; plan: number; bonus: number; percent: number };
        salesSum: { fact: number; plan: number; bonus: number; percent: number };
        teamPlan: { fact: number; plan: number; bonus: number; percent: number }; // Bonus here is derived
        totalBonus: number;
        kpiPercentTotal: number;
    };
    finance: {
        salary: number;
        bonus: number;
        fines: number;
        totalPayout: number;
    };
    violations: {
        description: string;
        amount: number;
    }[];
    support: {
        month2: string[];
        month3: string[];
    };
    conversions: {
        leadToApproved: number;
        leadToPaid: number;
        leadToContract: number;
        callToApproved: number;
        callToPaid: number;
        approvedToPaid: number;
    };
}

// Helper to generate empty days
const generateDaily = (days: number): DailySalesStats[] =>
    Array.from({ length: days }, (_, i) => ({
        day: i + 1,
        newLeads: 0,
        resultCalls: 0,
        approvedTests: 0,
        paidTests: 0,
        contracts: 0,
        positions: 0,
        salesAmount: 0
    }));

export const SALES_HISTORY: Record<string, MonthlyKPIData[]> = {
    "alexander": [
        {
            id: "2022-11",
            monthName: "Ноябрь 2022",
            daily: generateDaily(30).map(d => {
                // Mapping provided sample data loosely to days for visual density
                if ([1, 2, 3, 4, 8, 9].includes(d.day)) d.newLeads = Math.floor(Math.random() * 5);
                if ([1, 2, 3, 5, 6, 7, 8, 9, 10, 12, 13].includes(d.day)) d.resultCalls = Math.floor(Math.random() * 15 + 5);
                if ([1, 2, 3, 5, 7, 8].includes(d.day)) d.approvedTests = Math.floor(Math.random() * 3);
                if ([1, 2, 5, 9].includes(d.day)) d.paidTests = 1;
                return d;
            }),
            kpi: {
                newLeads: { fact: 59, plan: 10, bonus: 0, percent: 100 }, // Capped at 100 equivalent in logic usually
                resultCalls: { fact: 197, plan: 10, bonus: 2500, percent: 100 },
                approvedTests: { fact: 20, plan: 10, bonus: 2500, percent: 100 },
                paidTests: { fact: 9, plan: 7, bonus: 2500, percent: 100 },
                contracts: { fact: 0, plan: 1, bonus: 0, percent: 0 },
                salesSum: { fact: 0, plan: 20000, bonus: 0, percent: 0 },
                teamPlan: { fact: 0, plan: 80000, bonus: 0, percent: 0 },
                totalBonus: 7500,
                kpiPercentTotal: 60
            },
            finance: {
                salary: 7500,
                bonus: 14000, // From "Премия..." total fields
                fines: 0,
                totalPayout: 21500
            },
            violations: [],
            support: {
                month2: ["Уфа ИП Хатмуллин", "Казань МебБюро", "РостовНД Кухни61"],
                month3: ["СПБ Штонда", "Саратов Perfektum", "Волгоград Коновалов"]
            },
            conversions: {
                leadToApproved: 33.9,
                leadToPaid: 15.3,
                leadToContract: 0,
                callToApproved: 10.2,
                callToPaid: 4.6,
                approvedToPaid: 45.0
            }
        },
        {
            id: "2022-12",
            monthName: "Декабрь 2022",
            daily: generateDaily(31).map(d => {
                if ([4, 5, 6, 7, 10, 11].includes(d.day)) d.newLeads = Math.floor(Math.random() * 6);
                if (d.day > 3 && d.day < 25) d.resultCalls = Math.floor(Math.random() * 15 + 5);
                return d;
            }),
            kpi: {
                newLeads: { fact: 32, plan: 50, bonus: 0, percent: 64 },
                resultCalls: { fact: 241, plan: 190, bonus: 2500, percent: 100 },
                approvedTests: { fact: 5, plan: 20, bonus: 625, percent: 25 },
                paidTests: { fact: 5, plan: 7, bonus: 1786, percent: 71 },
                contracts: { fact: 2, plan: 2, bonus: 2500, percent: 100 },
                salesSum: { fact: 65200, plan: 50000, bonus: 5000, percent: 100 },
                teamPlan: { fact: 65200, plan: 80000, bonus: 0, percent: 82 },
                totalBonus: 12411,
                kpiPercentTotal: 79
            },
            finance: {
                salary: 15671,
                bonus: 7000,
                fines: 0,
                totalPayout: 22671
            },
            violations: [],
            support: {
                month2: ["РостовНД Кухни61"],
                month3: ["Казань ИП Ильясов", "Ижевск МоллиМеб"]
            },
            conversions: {
                leadToApproved: 16,
                leadToPaid: 16,
                leadToContract: 6,
                callToApproved: 2,
                callToPaid: 2,
                approvedToPaid: 100
            }
        },
        {
            id: "2023-01",
            monthName: "Январь 2023",
            daily: generateDaily(31),
            kpi: {
                newLeads: { fact: 27, plan: 30, bonus: 0, percent: 0 }, // Data slightly ambiguous, using placeholder
                resultCalls: { fact: 150, plan: 80, bonus: 0, percent: 100 },
                approvedTests: { fact: 6, plan: 5, bonus: 0, percent: 100 },
                paidTests: { fact: 5, plan: 5, bonus: 10000, percent: 100 },
                contracts: { fact: 0, plan: 1, bonus: 0, percent: 0 },
                salesSum: { fact: 65000, plan: 25000, bonus: 2500, percent: 100 },
                teamPlan: { fact: 65000, plan: 70000, bonus: 0, percent: 93 },
                totalBonus: 12500,
                kpiPercentTotal: 67
            },
            finance: {
                salary: 24250,
                bonus: 6000,
                fines: 0,
                totalPayout: 24250 // Check math
            },
            violations: [],
            support: { month2: ["Саратов Перфектум"], month3: ["Ростов ТумакМеб"] },
            conversions: {
                leadToApproved: 22,
                leadToPaid: 19,
                leadToContract: 0,
                callToApproved: 4,
                callToPaid: 4, // derived
                approvedToPaid: 83
            }
        }
    ],
    "evgeny_zh": [
        {
            id: "2022-11",
            monthName: "Ноябрь 2022",
            daily: generateDaily(30).map(d => {
                if ([1, 2, 3, 4, 8, 9, 11, 15, 18, 19, 20].includes(d.day)) d.newLeads = Math.floor(Math.random() * 8);
                if (d.day > 0) d.resultCalls = Math.floor(Math.random() * 20 + 5);
                return d;
            }),
            kpi: {
                newLeads: { fact: 59, plan: 10, bonus: 0, percent: 100 },
                resultCalls: { fact: 197, plan: 10, bonus: 2500, percent: 100 },
                approvedTests: { fact: 20, plan: 10, bonus: 2500, percent: 100 },
                paidTests: { fact: 9, plan: 7, bonus: 2500, percent: 100 },
                contracts: { fact: 0, plan: 1, bonus: 0, percent: 0 },
                salesSum: { fact: 0, plan: 20000, bonus: 0, percent: 0 },
                teamPlan: { fact: 0, plan: 80000, bonus: 0, percent: 0 },
                totalBonus: 7500,
                kpiPercentTotal: 60
            },
            finance: {
                salary: 7500,
                bonus: 7500,
                fines: 0,
                totalPayout: 15000
            },
            violations: [],
            support: { month2: [], month3: [] },
            conversions: {
                leadToApproved: 33.9,
                leadToPaid: 15.3,
                leadToContract: 0,
                callToApproved: 10.2,
                callToPaid: 4.6,
                approvedToPaid: 45.0
            }
        },
        {
            id: "2022-12",
            monthName: "Декабрь 2022", // Minimal data or identical format
            daily: generateDaily(31),
            kpi: {
                newLeads: { fact: 50, plan: 50, bonus: 0, percent: 100 },
                resultCalls: { fact: 200, plan: 190, bonus: 2500, percent: 100 },
                approvedTests: { fact: 15, plan: 20, bonus: 0, percent: 75 },
                paidTests: { fact: 6, plan: 7, bonus: 0, percent: 85 },
                contracts: { fact: 1, plan: 2, bonus: 0, percent: 50 },
                salesSum: { fact: 45000, plan: 50000, bonus: 0, percent: 90 },
                teamPlan: { fact: 45000, plan: 80000, bonus: 0, percent: 56 },
                totalBonus: 2500,
                kpiPercentTotal: 70
            },
            finance: {
                salary: 12000,
                bonus: 2500,
                fines: 0,
                totalPayout: 14500
            },
            violations: [],
            support: { month2: [], month3: [] },
            conversions: {
                leadToApproved: 30,
                leadToPaid: 12,
                leadToContract: 2,
                callToApproved: 7,
                callToPaid: 3,
                approvedToPaid: 40
            }
        }
    ]
};

