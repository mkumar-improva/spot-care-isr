import { StatusMessages } from "@/constants/StatusMessages";

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  reason: string;
  onBehalf: string;
  helpText: string;
  interestedIn: string;
};

export const validateField = (
  name: keyof FormData,
  value: string,
  onError?: (fieldName: keyof FormData, error: string) => void
) => {
  let error = "";

  switch (name) {
    case "email":
      if (!value) {
        error = StatusMessages.SchemaMessage.EmailRequired;
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
      ) {
        error = StatusMessages.SchemaMessage.EmailAddressValidation;
      }
      break;
    case "fullName":
      if (!value) {
        error = StatusMessages.SchemaMessage.FullNameRequired;
      } else if (value.length > 25) {
        error =
          StatusMessages.SchemaMessage.FullNameCondition.maximumValidation;
      }
      break;
    case "phone":
      if (!value) {
        error = StatusMessages.SchemaMessage.PhoneNumberRequired;
      } else if (!/^\d{3}-?\d{3}-?\d{4}$/.test(value)) {
        error = StatusMessages.SchemaMessage.PhoneNumberValid;
      }
      break;
    case "reason":
      if (!value) {
        error = StatusMessages.SchemaMessage.ReasonForConsultingRequired;
      }
      break;
    case "onBehalf":
      if (!value) {
        error = StatusMessages.SchemaMessage.ContactingOnBehalfOfRequired;
      }
      break;
    case "helpText":
      if (!value) {
        error = StatusMessages.SchemaMessage.HelpTextRequired;
      }
      break;
    case "interestedIn":
      if (!value) {
        error = StatusMessages.SchemaMessage.InterestedInRequired;
      }
      break;
    default:
      break;
  }

  // Call the callback if provided
  onError?.(name, error);
  
  return error === "";
};