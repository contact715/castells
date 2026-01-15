"use client";

import { IndividualSalesPerformance } from "@/components/dashboard/IndividualSalesPerformance";
import { useParams } from "next/navigation";

export default function SalesPersonPage() {
    const params = useParams();
    const id = params.id as string;

    // Capitalize first letter for display
    const name = id.charAt(0).toUpperCase() + id.slice(1);

    return (
        <div className="p-8">
            <IndividualSalesPerformance salespersonId={id} />
        </div>
    );
}
