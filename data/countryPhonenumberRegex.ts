export const RegexCountryPhoneNumber = {
  India: {
    // +91 followed by 10 digits, starting with 6–9 (mobile numbers)
    mobile: /^\+91[6-9]\d{9}$/,

    // +91 followed by 10 digits for landline; STD codes can vary (2–4 digits)
    // but overall 10 digits after +91 is standard (e.g., +912212345678)
    phone: /^\+91\d{10}$/,

    // Fax numbers use same format as landline
    fax: /^\+91\d{10}$/,
  },

  USA: {
    // +1 followed by a valid NANP 10-digit number:
    // Area code and exchange code cannot start with 0 or 1
    // Format: +1AAAEEE####  (A = area, E = exchange, # = subscriber)
    mobile: /^\+1[2-9]\d{2}[2-9]\d{6}$/,

    // Same structure for landline
    phone: /^\+1[2-9]\d{2}[2-9]\d{6}$/,

    // Same structure for fax
    fax: /^\+1[2-9]\d{2}[2-9]\d{6}$/,
  },
};
