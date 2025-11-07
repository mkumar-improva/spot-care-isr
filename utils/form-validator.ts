/**
 * Validates whether a given URL string is a valid image URL.
 * @param urlString - The URL string to validate.
 * @returns A boolean indicating whether the URL is a valid image URL.
 */

import { Validator,ValidationRule } from "types/Validator";
import { Regex } from "constants/Regex";
import { RegexCountryPhoneNumber } from "data/countryPhonenumberRegex";

export function isValidImageUrl(urlString: string): boolean {
  const imageExtensions = [
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".bmp",
    ".webp",
    ".svg",
  ];

  try {
    const url = new URL(urlString);
    return imageExtensions.some((ext) => url.pathname.endsWith(ext));
  } catch (e) {
    return false;
  }
}

export function shallowEqual(object1: any, object2: any): boolean {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
}

export const isValidUrl = (text: string): boolean => {
  const urlRegex =
    /^(https?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.%]+$/i;
  return urlRegex.test(text);
};

const isValidPhoneNumber = (value: string): boolean => {
  // Normalized number (remove spaces/dashes)
  const normalized = value.replace(/[-\s]/g, "");

  const phonePatterns = [
    RegexCountryPhoneNumber.India.mobile,
    RegexCountryPhoneNumber.India.phone,
    RegexCountryPhoneNumber.India.fax,
    RegexCountryPhoneNumber.USA.mobile,
    RegexCountryPhoneNumber.USA.phone,
    RegexCountryPhoneNumber.USA.fax,

    // Extra loose fallback like your old regex
    /^\d{10}$/,          // exactly 10 digits
    /^\d{3}\d{3}\d{4}$/  // US-style without dashes
  ];

  return phonePatterns.some(pattern => pattern.test(normalized));
};

const validationRules: Record<keyof Validator, ValidationRule[]> = {
  email: [
    { validate: v => !!v, message: "Email is required" },
    { validate: v => Regex.email.test(v), message: "Invalid email address" },
  ],
  password: [
    { validate: v => !!v, message: "Password is required" },
    { validate: v => v.length >= 8, message: "Password must be at least 8 characters" },
  ],
  phone: [
    { validate: v => !!v, message: "Phone number is required" },
    { validate: v => isValidPhoneNumber(v), message: "Invalid phone number" }
  ],
  firstName: [
    { validate: v => !!v, message: "First name is required" },
  ],
  lastName: [
    { validate: v => !!v, message: "Last name is required" },
  ],
  confirmPassword: [],
  fullName:[
    { validate: v => !!v, message: "Full name is required" },
  ],
  message:[
    { validate: v => !!v, message: "Message is required" },
  ],
  username: [
    { validate: v => !!v, message: "Username is required" },
  ],
  name: [
    { validate: v => !!v, message: "Name is required" },
  ],
  siteKey: [
    { validate: v => !!v, message: "Site key is required" },
  ],
  description: [
     { validate: v => v.length <= 500, message: "Description must be under 500 characters" },
  ],
};

export const FormValidator = (field: keyof Validator, value: string): string => {
  const rules = validationRules[field];
  if (!rules) return ""; // No validation rules for this field

  for (const rule of rules) {
    if (!rule.validate(value)) {
      return rule.message;
    }
  }
  return "";
};
