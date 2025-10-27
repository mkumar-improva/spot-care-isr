import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon, Hospital02Icon } from "@hugeicons-pro/core-stroke-rounded/index";

interface ClaimListingCardProps {
    ProviderName: string;
}

const ClaimListingCard: React.FC<ClaimListingCardProps> = ({ ProviderName }) => {
    return (
        <div className="w-full flex items-center justify-between bg-blue-50 rounded-2xl p-4 border border-blue-100 shadow-sm">
            <div className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                    <HugeiconsIcon
                        icon={Hospital02Icon}
                        className="size-6 lg:size-7 xl:size-8 -scale-x-100"
                    />
                </div>
                <div>
                    <p className="font-medium text-gray-900">Claim {ProviderName} ?</p>
                    <p className="text-sm text-gray-600">Claim this provider for free</p>
                </div>
            </div>
            <button className="text-blue-500 border border-blue-100 hover:border-blue-400 hover:text-blue-600 p-3 rounded-xl text-sm font-medium  inline-flex items-center gap-1">
                Claim Now
                <HugeiconsIcon
                    icon={ArrowRight02Icon}
                    className="size-4 lg:size-4 xl:size-5"
                />
            </button>
        </div>
    );
};

export default ClaimListingCard;
