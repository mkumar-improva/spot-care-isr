"use client";

import { useState } from "react";
import ButtonPrimary from "@/components/ui/button/types/button-primary";
import ButtonSecondary from "@/components/ui/button/types/button-secondary";
import uiUseStore from "@/store/detailscreen/ui-store";
import { StatusMessages } from "constants/StatusMessages";
import consultantStore from "@/store/detailscreen/consultingtab/consultant-store";
import { NotifierModel } from "@/types/notifier-model";
import Notifier from "@/components/ui/Notifier/Notifier";
import ConsultantContactInfo from "@/components/layout/DetailScreen/components/ConsultingTab/components/consultant-contact-info";
import ConsultantHelpInfo from "@/components/layout/DetailScreen/components/ConsultingTab/components/consultant-help-info";
import ConsultantContactInformation from "@/components/layout/DetailScreen/components/ConsultingTab/components/consultant-contact-information";
import SuccessMessage from "@/components/layout/DetailScreen/components/ConsultingTab/components/success-message";
import {
  useConsultingForm,
  useConsultingService,
} from "@/hooks/detailscreen/consultingtab";


const ConsultingTab = () => {
  const { selectedProviderDetail } = uiUseStore();
  const {
    formData,
    formErrors,
    activeFormIndex,
    acceptTerms,
    animationKey,
    incrementAnimationKey,
    incrementActiveFormIndex,
    decrementActiveFormIndex,
    resetForm,
  } = consultantStore();

  const { validateCurrentStep, stepFields } = useConsultingForm();
  const { serviceType } = useConsultingService();

  const [NotifierDetails, setNotifierDetails] = useState<NotifierModel>({
    message: "",
    mode: "error",
  });

  const [NotifierState, setNotifierState] = useState(false);

  const handlePreviousClick = () => {
    decrementActiveFormIndex();
    setNotifierState(false);
  };

  const handleNextClick = () => {
    const isStepValid = validateCurrentStep(activeFormIndex);
    setNotifierState(false);
    if (isStepValid) {
      incrementActiveFormIndex();
    }
  };
  
  const handleSubmitClick = () => {
    const isStepValid = validateCurrentStep(activeFormIndex);
    if (isStepValid) {
      if (activeFormIndex === FormTabs.length - 2) {
        incrementAnimationKey();
      }
      incrementActiveFormIndex();
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotifierState(false);
    if (!acceptTerms) {
      setNotifierState(true);
      setNotifierDetails({
        message: StatusMessages.ErrorMessage.ConsultingTabAcceptTerms,
        mode: "error",
      });
      return;
    }

    const isStepValid = validateCurrentStep(activeFormIndex);
    if (isStepValid) {
      if (activeFormIndex === FormTabs.length - 2) {
        incrementAnimationKey();
      }
      incrementActiveFormIndex();
    }
  };

  const handleCloseSuccess = () => {
    resetForm();
    incrementAnimationKey();
  };
  const FormTabs = [
    <ConsultantContactInfo />,
    <ConsultantHelpInfo />,
    <ConsultantContactInformation />,
    <SuccessMessage />,
  ];
  const isLastStep = activeFormIndex === FormTabs.length - 1;

  //Notifier close handler
  //Handle Notifier close
  const handleNotifierClose = () => {
    setNotifierState(false);
    setNotifierDetails({
      message: "",
      mode: "error",
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex flex-col items-start justify-start gap-[1rem]"
    >
      {!isLastStep && (
        <div className="w-full flex flex-col items-start justify-start gap-2">
          <p className="text-2xl font-semibold">
            Looking for {serviceType ?? ""}
          </p>
          <p className="text-sm text-neutral-500 text-wrap">
            Learn about pricing and availability for {serviceType ?? ""} homes near{" "}
            {selectedProviderDetail?.locations?.[0]?.city ?? ""}
          </p>
        </div>
      )}

      <div className="w-full relative">
        <div
          className={`w-full transition-all duration-200 ease-in-out overflow-hidden ${
            NotifierState ? "my-1" : "my-0"
          }`}
        >
          <div
            className={`transform transition-all duration-200 ease-in-out ${
              NotifierState
                ? "opacity-100 scale-100 max-h-20 mb-4"
                : "opacity-0 scale-95 max-h-0 mb-0"
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
        {FormTabs.map((tab, index) => (
          <div
            key={index}
            className={`w-full transition-all duration-200 ease-in-out ${
              index === activeFormIndex
                ? "opacity-100 relative translate-x-0"
                : "opacity-0 absolute top-0 left-0 translate-x-4 pointer-events-none"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>
      {!isLastStep && (
        <div className="w-full flex items-center justify-center gap-[.25rem] mt-[.5rem]">
          {FormTabs.map((_, i) => (
            <div
              key={i}
              className={`p-[5px] rounded-full ${
                i === activeFormIndex ? "bg-primary-500" : "bg-neutral-300"
              }`}
            ></div>
          ))}
        </div>
      )}

      {!isLastStep ? (
        <div
          className={`w-full flex ${
            activeFormIndex === 0 ? "justify-end" : "justify-between"
          }`}
        >
          {activeFormIndex > 0 && (
            <ButtonSecondary
              onclick={handlePreviousClick}
            >
              Previous
            </ButtonSecondary>
          )}
          {activeFormIndex < FormTabs.length - 2 ? (
            <ButtonPrimary
              onclick={handleNextClick}
            >
              Next
            </ButtonPrimary>
          ) : (
            <ButtonPrimary
              onclick={handleSubmitClick}
            >
              Submit
            </ButtonPrimary>
          )}
        </div>
      ) : (
        <div className="w-full flex flex-row justify-end items-center">
          <ButtonPrimary onclick={handleCloseSuccess}>
            Done
          </ButtonPrimary>
        </div>
      )}
    </form>
  );
};

export default ConsultingTab;
