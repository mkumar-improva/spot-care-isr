import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Hospital02Icon } from "@hugeicons-pro/core-stroke-rounded/index";
import { KEYS } from "@/constants/KeyConstants";
import useClaimStore from "@/store/detailscreen/claim-store";

interface ClaimListingCardV2Props {
  providerCode: string;
}

const ClaimListingCardV2: React.FC<ClaimListingCardV2Props> = ({
  providerCode,
}) => {
  const { setShowLogin, setProviderInfoDialogOpen, setSelectedProviderCode } = useClaimStore();

  const handleClaimClick = () => {
    const isLoggedIn = localStorage.getItem(KEYS.ISLOGGEDIN) === "true";
    if (isLoggedIn) {
      setSelectedProviderCode(providerCode);
      setProviderInfoDialogOpen(true);
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className="w-full flex items-center justify-between rounded-xl p-4 bg-blue-50 border border-blue-100 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="bg-blue-100 text-[#3242e1] rounded-full p-2 hidden lg:block">
          <HugeiconsIcon
            icon={Hospital02Icon}
            className="size-6 lg:size-7 xl:size-8 -scale-x-100"
          />
        </div>
        <div>
          <p className="font-medium text-gray-900">
            Is this your provider profile?
          </p>
          <p className="text-sm text-gray-600">Claim and manage for free</p>
        </div>
      </div>
      <button
        onClick={handleClaimClick}
        className="text-sm rounded-xl p-2 border border-[#2937be] text-[#2937be] hover:bg-[#dbeafe]"
      >
        Claim now
      </button>
    </div>
  );
};

export default ClaimListingCardV2;
