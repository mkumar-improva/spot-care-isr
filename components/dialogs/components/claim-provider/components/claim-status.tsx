import { Alert01Icon, CheckmarkCircle02Icon, Clock01Icon } from "@hugeicons-pro/core-stroke-rounded/index"
import { HugeiconsIcon } from "@hugeicons/react"
import ButtonSecondary from "@/components/ui/button/types/button-secondary"

interface StatusPopupProps {
    status: "approved" | "pending" | "none",
    onClick?: () => void
}

export default function ClaimStatus({ status = "pending", onClick }: StatusPopupProps) {
    const isApproved = status === "approved"

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-xl border border-gray-200">
                {/* Header */}
                <div className="text-center pt-8 pb-4 px-6">
                    <div className="flex justify-center mb-4">
                        {isApproved ? (
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <HugeiconsIcon
                                    icon={CheckmarkCircle02Icon}
                                    className="w-8 h-8 text-green-600"
                                />
                            </div>
                        ) : (
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                                <HugeiconsIcon
                                    icon={Alert01Icon}
                                    className="w-8 h-8 text-orange-600"
                                />
                            </div>
                        )}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        {isApproved ? "Application Approved!" : "Application Pending"}
                    </h2>
                </div>

                {/* Content */}
                <div className="text-center space-y-4 px-6 pb-8">
                    <p className="text-gray-600 leading-relaxed">
                        {isApproved
                            ? "Congratulations! Your application has been successfully approved. You can now access all features and services."
                            : "Your application is currently under review. Our team is carefully evaluating your submission."}
                    </p>

                    {!isApproved && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <HugeiconsIcon
                                    icon={Clock01Icon}
                                    className="w-8 h-8 text-blue-600"
                                />
                                <span className="font-medium text-blue-800">Please Wait</span>
                            </div>
                            <p className="text-sm text-blue-700">
                                {
                                    "We'll review your application within the next 2 days. You'll receive an email notification once the review is complete."
                                }
                            </p>
                        </div>
                    )}

                    <div className="pt-4">
                        <ButtonSecondary
                            className="w-full px-4 py-3 rounded-md font-medium transition-colors duration-200"
                            onclick={onClick}
                        >
                            {isApproved ? "Continue" : "Got it"}
                        </ButtonSecondary>
                    </div>
                </div>
            </div>
        </div>
    )
}
