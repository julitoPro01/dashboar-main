
"use client";

import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { InventoryPocily } from "./operation-status/InventoryPolicy";
import { RecordStatus } from "./operation-status/RecordStatus";
import { SaleStatus } from "./operation-status/SaleStatus";
import { OperationStatusInfo } from "./operation-status/OperationStatusInfo";

export const OperationalStatus = () => {

    return (
        <section className="space-y-3">

            {/* Section header */}
            <div className="flex items-center justify-between">

                <h3 className="flex items-center gap-3 text-text font-semibold">
                    <IoShieldCheckmarkOutline
                        size={18}
                        className="text-primary"
                    />

                    <span>
                        5. Estados operativos independientes
                    </span>
                </h3>

                <OperationStatusInfo />
            </div>

            <div className="space-y-2 text-sm">

                {/* Record status */}
                <RecordStatus />

                {/* Inventory policy */}
                <InventoryPocily />

                {/* Sale status */}
                <SaleStatus />

            </div>

        </section>
    );
};
