"use client";

import SelectField from "@/components/ui/SelectField/select-field";
import consultantStore, { type FormData } from "@/store/detailscreen/consultingtab/consultant-store";
import { formatPhoneNumber } from "@/utils/converter";
import { validateField } from "@/utils/validate-field";

const ConsultantContactInfo = () => {
  const {
    formData,
    formErrors,
    updateFormField,
    updateFormError,
  } = consultantStore();

  const handleInputChange = (name: keyof FormData, value: string) => {
    if (name === "phone") {
      updateFormField(name, formatPhoneNumber(value));
    } else {
      updateFormField(name, value);
    }
  };

  const selectFields: {
    label: string;
    name: string;
    key: keyof typeof formData;
    options: string[];
  }[] = [
    {
      label: "Reason for consulting",
      name: "Select below reason",
      key: "reason",
      options: [
        "Care Availability",
        "Employment Opportunity",
        "Other Inquiry",
      ],
    },
    {
      label: "Contacting on behalf of",
      name: "Select below contact",
      key: "onBehalf",
      options: ["Myself", "Family Member", "Loved One", "Other"],
    },
  ];

  return (
    <div className="w-full flex flex-col items-start justify-start gap-4">
      {selectFields.map(({ label, name, options, key }) => {
        return (
          <SelectField
            label={label}
            name={name}
            defaultOption={name}
            key={key}
            value={formData[key]}
            error={formErrors[key]}
            onChange={(e) => {
              handleInputChange(key, e.target.value);
            }}
            options={options}
            autoSelectFirst={true}
          />
        );
      })}
    </div>
  );
};

export default ConsultantContactInfo;