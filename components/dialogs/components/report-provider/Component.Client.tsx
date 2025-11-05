"use client";
import ButtonClose from "@/components/ui/button/types/button-close";
import ButtonSecondary from "@/components/ui/button/types/button-secondary";
import ButtonPrimary from "@/components/ui/button/types/button-primary";
import Input from "@/components/ui/Input/Input";
import { Services } from "@/services/service";
import { StatusMessages } from "@/constants/StatusMessages";
import { TitleCase } from "@/utils/converter";
import { KEYS } from "@/constants/KeyConstants";
import Notifier from "@/components/ui/Notifier/Notifier";
import TextField from "@/components/ui/TextField/TextField";
import { useReportProviderDialog } from "@/hooks/dialog/report-provider-hook";

const ReportIssueDialog = () => {
  const {
    showReportDialog,
    dialogProviderName,
    dialogProviderCode,
    reportOptions,
    selectedOptionId,
    setSelectedOptionId,
    reportValue,
    setReportValue,
    isError,
    setIsError,
    isEmptyReport,
    setIsEmptyReport,
    reportIssueLoader,
    isDarkUi,
    saveReport,
    handleClose,
  } = useReportProviderDialog();


  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem(KEYS.ISLOGGEDIN) === "true";

  const handleNotifierClose = () => {
    setIsError(false);
  };

  return (
    <div className="relative">
      <div
        className="w-[90vw] md:w-full rounded-xl flex relative"
        data-nc-id="ReportIssue"
      >
        <div className="flex-1 justify-center items-center w-screen md:w-98 space-y-0 relative">
          <div className="flex flex-row text-neutral-700 dark:text-neutral-300 text-center justify-between items-center border-b dark:border-neutral-800 p-4 relative">
            <p className="text-2xl font-semibold truncate max-w-[16rem] sm:max-w-[26rem] mx-auto overflow-hidden ">
              {TitleCase((dialogProviderName ?? "").replace("''", "'"))}
            </p>
            <span className="flex-shrink-0 absolute right-3 top-3">
              <ButtonClose onClick={handleClose} />
            </span>
          </div>
          <div className="w-full flex flex-col text-neutral-700 dark:text-neutral-300 justify-start items-start gap-y-6 pl-6 pr-5 pt-0 pb-5">
            <div className="flex flex-col items-start justify-start w-full pt-[1rem]">
              {/* Report issue Notifier */}
              <div
                className={`w-full transition-all duration-300 ease-in-out overflow-hidden ${
                  isError ? "mt-0 mb-2" : "my-0"
                }`}
              >
                <div
                  className={`transform transition-all duration-300 ease-in-out ${
                    isError
                      ? "opacity-100 scale-100 max-h-20 mb-0"
                      : "opacity-0 scale-95 max-h-0 mb-0"
                  }`}
                >
                  <Notifier
                    notifierState={isError}
                    message={StatusMessages.ErrorMessage.ReportIssueNoCategory}
                    mode={"error"}
                    onClose={handleNotifierClose}
                  />
                </div>
              </div>
              <p className="text-[22px] text-neutral-900 font-medium">Report This Provider</p>
            </div>
            {Array.isArray(reportOptions) && reportOptions.map((option: { id: number; category: string }) => (
              <div key={option.id} className="flex flex-row items-center">
                <Input
                  id={option.id.toString()}
                  type="radio"
                  name="radio"
                  className="hidden radioBoxShadow"
                  checked={option.id === selectedOptionId}
                  onChange={() => {
                    setIsError(false);
                    setIsEmptyReport(false);
                    setSelectedOptionId(option.id);
                  }}
                />
                <label
                  htmlFor={option.id.toString()}
                  className="flex items-center cursor-pointer gap-x-2 text-base"
                  onClick={() => {
                    setIsError(false);
                    setIsEmptyReport(false);
                    setSelectedOptionId(option.id);
                  }}
                >
                  <span
                    className={`w-4 h-4 inline-block rounded-full border border-grey ${
                      isDarkUi
                        ? "shadow-radio-dark-custom-inset"
                        : "shadow-radio-white-custom-inset"
                    }`}
                  ></span>
                  {option.category}
                </label>
              </div>
            ))}
            <div className="w-full flex flex-col justify-center items-center gap-y-3">
              <div className="w-full">
                <span className="text-[22px] font-medium text-neutral-800 dark:text-neutral-200">
                  Report Something Else
                </span>
                <TextField
                  name="report"
                  label=" "
                  className="mt-2 text-base"
                  value={reportValue}
                  onChange={(e) => {
                    setReportValue(e.target.value);
                    // Clear error when user starts typing
                    if (isEmptyReport && e.target.value.trim() !== "") {
                      setIsEmptyReport(false);
                    }
                  }}
                  error={
                    isEmptyReport
                      ? StatusMessages.ErrorMessage
                          .ReportIssueAdditionalInformation
                      : ""
                  }
                />
              </div>
              <div className="w-full flex flex-row justify-between items-center mt-[1rem]">
                <ButtonSecondary
                  onclick={handleClose}
                >
                  Cancel
                </ButtonSecondary>
                <ButtonPrimary
                  loading={reportIssueLoader}
                  disabled={!isLoggedIn || reportIssueLoader}
                  onclick={async () => {
                    await saveReport();
                  }}
                >
                  Submit
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportIssueDialog;
