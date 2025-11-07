import Notifier from "@/components/ui/Notifier/Notifier";

interface NotifierSectionProps {
  NotifierState: boolean;
  NotifierDetails: {
    message: string;
    mode: "error" | "success" | "warning";
  };
  handleNotifierClose: () => void;
}

export default function NotifierSection({
  NotifierState,
  NotifierDetails,
  handleNotifierClose,
}: NotifierSectionProps) {
  return (
    <div
      className={`w-full transition-all duration-300 ease-in-out overflow-hidden ${
        NotifierState ? "max-h-20 opacity-100 mb-4" : "max-h-0 opacity-0"
      }`}
    >
      <div
        className={`transform transition-all duration-300 ease-in-out ${
          NotifierState
            ? "translate-y-0 scale-100"
            : "-translate-y-2 scale-95"
        }`}
      >
        <Notifier
          notifierState={NotifierState}
          message={NotifierDetails.message}
          mode={NotifierDetails.mode}
          onClose={handleNotifierClose}
        />
      </div>
    </div>
  );
}
