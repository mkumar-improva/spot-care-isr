import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Turnstile, { useTurnstile } from "react-turnstile";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { ContactTypes } from "types/ContactTypes";
import { Services } from "services/user.service";
import { StatusMessages } from "constants/StatusMessages";
import { Config } from "constants/config";
import Notifier from "components/Notifier/Notifier";
import { NotifierModel } from "types/NotifierModel";
import TextField from "components/TextField/TextField";
import CustomTextArea from "components/CustomTextArea/CustomTextArea";
import { useContactForm } from "hooks/useContactForm";
import loaderStore from "store/loaderStore";
import { KEYS } from "constants/KeyConstants";

const PageContactFields = () => {
  const {
    formData,
    formErrors,
    handleInputChange,
    handleInputBlur,
    validateForm,
    resetForm,
  } = useContactForm();

  const captchaRef = useRef<ReCAPTCHA>(null);
  const [NotifierDetails, setNotifierDetails] = useState<NotifierModel>({
    message: "",
    mode: "error",
  });
  const { contactLoader, setContactLoader } = loaderStore();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setNotifierDetails({
      message: "",
      mode: "error",
    });

    setContactLoader(true);

    // Use Turnstile token instead of ReCAPTCHA
    if (!turnstileToken) {
      setNotifierDetails({
        message: StatusMessages.ErrorMessage.CaptchaVerification,
        mode: "error",
      });
      setContactLoader(false);
      return;
    }

    const ContactMessage: ContactTypes = {
      fullName: formData.fullName ?? "",
      email: formData.email ?? "",
      message: formData.message ?? "",
    };

    try {
      const result = await Services.CreateContact(ContactMessage);

      if (result.status.toLowerCase() === "success" || result.data.id > 0) {
        setContactLoader(false);
        setNotifierDetails({
          message: StatusMessages.SuccessMessages.MessageSent,
          mode: "success",
        });
        resetForm(); // Reset form after successful submission
        setTurnstileToken(null); // Reset Turnstile token
      } else {
        setNotifierDetails({
          message: StatusMessages.ErrorMessage.WentWrongError,
          mode: "error",
        });
      }
    } catch (ex) {
      setContactLoader(false);

      setNotifierDetails({
        message: StatusMessages.ErrorMessage.WentWrongError,
        mode: "error",
      });
    }
  };

  const handler = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === KEYS.ENTER) {
      e.preventDefault();
      handleSendMessage(e as any);
    }
  }

  // Close notifier handler
  //Handle Notifier close
  const handleNotifierClose = () => {
    setNotifierDetails({
      message: "",
      mode: "error",
    });
  };

  return (
    <form
      className="lg:w-1/2 py-4 w-full flex flex-col justify-start items-start px-4 sm:px-8  rounded-xl bg-[#fafafa] dark:bg-neutral-800 gap-1"
      onSubmit={handleSendMessage}
      onKeyDown={handler}
    >
      <div className="w-full flex flex-col items-start justify-start gap-4">
        <TextField
        name="fullName"
        label="Full name"
        placeHolder=" "
        className="text-left"
        error={formErrors.fullName}
        value={formData.fullName}
        onChange={handleInputChange("fullName")}
        onBlur={handleInputBlur("fullName")}
        required={false}
        autoFocus
      />

      <TextField
        name="email"
        label="Email"
        placeHolder=" "
        type="email"
        className="text-left"
        error={formErrors.email}
        value={formData.email}
        onChange={handleInputChange("email")}
        onBlur={handleInputBlur("email")}
        required={false}
      />

      <CustomTextArea
        name="message"
        placeHolder=" "
        className="text-left"
        label="Leave us a message"
        rows={6}
        error={formErrors.message}
        value={formData.message}
        onChange={handleInputChange("message")}
        onBlur={handleInputBlur("message")}
        required={false}
        draggable={false}
      />
      <div className="recaptcha-container ">
        <Turnstile
          sitekey={Config.KEY.SITE_KEY}
          theme="light"
          size="flexible"
          style={{ width: "100%" }}
          onVerify={(token) => {
            setTurnstileToken(token);
            setNotifierDetails({
              message: "",
              mode: "error",
            });
          }}
          onExpire={() => setTurnstileToken(null)}
          onError={() =>
            setNotifierDetails({
              message: StatusMessages.ErrorMessage.CaptchaVerification,
              mode: "error",
            })
          }
        />
        {/* <ReCAPTCHA
          ref={captchaRef}
          sitekey={Config.KEY.SITE_KEY} // Replace with your Site Key
          theme={"light"}
          size={"normal"}
          onChange={() => {
            setNotifierDetails({
              message: "",
              mode: "error",
            });
          }}
        /> */}
      </div>
      </div>
      {/* Contact Page Notifier */}
      <div
        className={`w-full transition-all duration-300 ease-in-out overflow-hidden ${
          NotifierDetails.message !== "" ? "my-1" : "my-0"
        }`}
      >
        <div
          className={`transform transition-all duration-300 ease-in-out ${
           NotifierDetails.message !== ""
              ? "opacity-100 scale-100 max-h-20 mb-0"
              : "opacity-0 scale-95 max-h-0 mb-0"
          }`}
        >
          <Notifier
            notifierState={NotifierDetails.message !== ""}
            message={NotifierDetails.message}
            mode={NotifierDetails.mode}
            onClose={handleNotifierClose}
          />
        </div>
      </div>

      <ButtonPrimary
        translate="rounded-md"
        loading={contactLoader}
        className="w-full my-3"
        type="submit"
      >
        Send message
      </ButtonPrimary>
    </form>
  );
};

export default PageContactFields;
