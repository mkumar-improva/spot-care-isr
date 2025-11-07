"use client";

import Link from "next/link";
import TextField from "@/components/ui/TextField/TextField";
import Checkbox from "@/components/ui/Checkbox/check-box";
import consultantStore, { type FormData } from "@/store/detailscreen/consultingtab/consultant-store";
import { validateField } from "@/utils/validate-field";
import { formatPhoneNumber } from "@/utils/converter";

const ConsultantContactInformation = () => {
  const { formData, formErrors, updateFormField, updateFormError, acceptTerms, setAcceptTerms } = consultantStore();

  const getPlaceholderText = (fieldName: keyof FormData): string => {
    switch (fieldName) {
      case "fullName":
        return "Full name";
      case "phone":
        return "Phone number";
      case "email":
        return "Email";
      default:
        return "";
    }
  };

  const handleInputChange = (name: keyof FormData, value: string) => {
    // Format phone number
    if (name === "phone") {
      updateFormField(name, formatPhoneNumber(value));
    } else {
      updateFormField(name, value);
    }
  };

  const inputFields: {
    name: keyof FormData;
  }[] = [{ name: "fullName" }, { name: "phone" }, { name: "email" }];

  return (
    <div className="w-full flex flex-col items-start justify-start gap-4">
      <div className="w-full flex flex-col items-start justify-start">
        <label className="text-sm font-medium text-neutral-700 mb-[0.5rem]">
          Contact Information
        </label>
        <div className="w-full flex flex-col items-start justify-start gap-2">
          {inputFields.map(({ name }) => {
            return (
              <TextField
                key={name}
                name={name}
                label={getPlaceholderText(name)}
                placeHolder=" "
                value={formData[name]}
                onChange={(e) => {
                  handleInputChange(name, e.target.value);
                }}
                error={formErrors[name]}
                required={false}
              />
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col items-start justify-start gap-0 mt-[.5rem]">
        <div className="w-full flex items-center ml-1">
          <Checkbox
            name="privacy"
            label=" "
            checked={acceptTerms}
            checkboxHeight="h-5"
            checkboxWidth="w-5"
            onChange={() => setAcceptTerms(!acceptTerms)}
          />
          <p className="max-w-xs text-wrap text-sm text-neutral-500">
            I agree to the Spot.care{" "}
            <Link href="/privacy" className="text-primary-500 cursor-pointer hover:underline">
              Privacy policy
            </Link>
            {" "}and{" "}
            <Link href="/terms" className="text-primary-500 cursor-pointer hover:underline">
              Terms of use
            </Link>
            .
          </p>
        </div>
        <p className="text-wrap text-sm text-neutral-500 mt-4">
          Your information may be shared with trusted care providers to reach
          you.
        </p>
      </div>
    </div>
  );
};

export default ConsultantContactInformation;