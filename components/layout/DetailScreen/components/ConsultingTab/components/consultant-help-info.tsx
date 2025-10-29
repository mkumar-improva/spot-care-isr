"use client";

import CustomTextArea from "@/components/ui/CustomTextArea/custom-text-area";
import SelectField from "@/components/ui/SelectField/select-field";
import careTypePresent from "@/utils/care-type-present";
import uiUseStore from "@/store/detailscreen/ui-store";
import { useCareTypes } from "@/hooks/detailscreen";
import consultantStore, { type FormData } from "@/store/detailscreen/consultingtab/consultant-store";
import { validateField } from "@/utils/validate-field";

const ConsultantHelpInfo = () => {
  const { selectedProviderDetail } = uiUseStore();
  const { careTypes } = useCareTypes();
  const { formData, formErrors, updateFormField, updateFormError } = consultantStore();

  const handleInputChange = (name: keyof FormData, value: string) => {
    updateFormField(name, value);
  };
    const city = selectedProviderDetail?.locations?.[0]?.city ?? "";

    const profilesToAdd =
      selectedProviderDetail?.services
        ?.filter((profile: string) => careTypePresent(profile, careTypes))
        ?.map((profile: string) => `${profile} Homes (Near ${city})`) || [];
    const interesetedInOptions = [];
    interesetedInOptions.unshift(...profilesToAdd);

    return (
      <div className="w-full flex flex-col items-start justify-start gap-2">
        <CustomTextArea
          label="How can we help?"
          name="helpText"
          className="text-left"
          placeHolder=" "
          rows={4}
          draggable={false}
          required={false}
          value={formData.helpText}
          onChange={(e) => {
            handleInputChange("helpText", e.target.value);
          }}
          error={formErrors.helpText}
        />
        <SelectField
          label="Interested in"
          name="interestedIn"
          options={interesetedInOptions}
          value={formData.interestedIn}
          onChange={(e) => {
            handleInputChange("interestedIn", e.target.value);
          }}
          error={formErrors.interestedIn}
          defaultOption="Select below option"
          key="interestedIn"
          autoSelectFirst={true}
        />
      </div>
    );
  };

export default ConsultantHelpInfo;
