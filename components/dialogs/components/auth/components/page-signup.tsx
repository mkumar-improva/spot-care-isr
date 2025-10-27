"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import TextField from "@/components/ui/TextField/TextField";
import Notifier from "@/components/ui/Notifier/Notifier";
import ButtonPrimary from "@/components/ui/button/types/button-primary";
import useSignUp from "@/hooks/auth/use-signup";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ViewOffSlashIcon,
  ViewIcon,
} from "@hugeicons-pro/core-stroke-rounded/index";

export interface PageSignupProps {
  className?: string;
  callback?: () => void;
}

const PageSignUp: FC<PageSignupProps> = ({ className, callback }) => {
  const {
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    isVerificationStarted,
    setisVerificationStarted,
    email,
    setEmail,
    showPassword,
    setShowPassword,
    NotifierState,
    setNotifierState,
    NotifierDetails,
    setNotifierDetails,
    otpNotifierDetails,
    setOtpNotifierDetails,
    handler,
    onSubmit,
    onLoginClick,
    handleNotifierClose,
    handleInputChange,
    validateField,
    validateForm,
    resetForm,
    clearErrors,
    togglePasswordVisibility,
  } = useSignUp();

  return (
    <div
      className={`w-full md:w-1/2 p-2 xsm:p-4 md:p-8 text-center align-middle justify-center`}
    >
      {/* Render SignUp Form */}
      <div className="w-full flex flex-col items-start justify-start py-[11px] gap-2">
        {/* SignUp Header */}
        <div className="w-full flex flex-col items-start justify-start gap-[.5rem]">
          <h3 className="text-2xl ms:text-[32px] font-medium text-left">
            Sign up
          </h3>
          <h4 className="font-normal text-left text-sm ms:text-base text-gray-500 pl-1">
            Please create your account
          </h4>
        </div>
        {/* SignUp Notifier */}
        <div
          className={`w-full transition-all duration-300 ease-in-out overflow-hidden ${
            NotifierState ? "my-1" : "my-0"
          }`}
        >
          <div
            className={`transform transition-all duration-300 ease-in-out ${
              NotifierState
                ? "opacity-100 scale-100 max-h-20 mb-0"
                : "opacity-0 scale-95 max-h-0 mb-0"
            }`}
          >
            <Notifier
              notifierState={NotifierState}
              message={NotifierDetails.message}
              mode={NotifierDetails.mode}
              link={NotifierDetails.link}
              onClick={NotifierDetails.onClick}
              onClose={handleNotifierClose}
            />
          </div>
        </div>
        {/* SignUp Form */}
        <form
          onKeyDown={handler}
          onSubmit={onSubmit}
          className={`w-full flex flex-col items-start justify-start gap-4`}
        >
          <div className="w-full flex items-start justify-start sm:items-start sm:justify-between gap-4 sm:gap-2 flex-col sm:flex-row">
            <div className="w-full sm:flex-1">
              <TextField
                label="First name"
                name="firstName"
                placeHolder=" "
                value={formData.firstName}
                onChange={handleInputChange("firstName")}
                className="text-left"
                maxLength={20}
                required={false}
                error={
                  formErrors.firstName
                    ? formErrors.firstName
                    : formErrors.lastName
                    ? " "
                    : ""
                }
                autoFocus
              />
            </div>
            <div className="w-full sm:flex-1">
              <TextField
                label="Last name"
                name="lastName"
                placeHolder=" "
                value={formData.lastName}
                onChange={handleInputChange("lastName")}
                maxLength={20}
                className="text-left"
                required={false}
                error={
                  formErrors.lastName
                    ? formErrors.lastName
                    : formErrors.firstName
                    ? " "
                    : ""
                }
              />
            </div>
          </div>
          <TextField
            label="Email"
            placeHolder=" "
            error={formErrors.email}
            value={formData.email}
            onChange={handleInputChange("email")}
            className="text-left"
            required={false}
          />
          <TextField
            label="Phone number"
            type="text"
            placeHolder=" "
            error={formErrors.phone}
            value={formData.phone}
            onChange={handleInputChange("phone")}
            className="text-left"
            required={false}
          />
          <div className="w-full text-left relative">
            <TextField
              label="Password"
              placeHolder=" "
              type={showPassword ? "text" : "password"}
              error={formErrors.password}
              value={formData.password}
              onChange={handleInputChange("password")}
              className=""
              required={false}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-9 flex items-center text-sm text-neutral-500"
            >
              <HugeiconsIcon
                icon={showPassword ? ViewOffSlashIcon : ViewIcon}
                size={20}
                color="currentColor"
              />
            </button>
          </div>
          {/* Submit Button */}
          <div className="w-full flex flex-col items-start justify-start gap-2 mt-[.55rem]">
            <ButtonPrimary
              className="bg-primary-700 font-medium text-white px-6 py-2 text-base hover:bg-primary-800 transition-colors duration-200 ease-in-out rounded-md w-full"
              type="submit"
            >
              Create account
            </ButtonPrimary>

            {/* Login Link */}
            <div className="w-full text-center">
              <span className="text-sm text-gray-500">
                Already have an account?{" "}
                <span
                  onClick={onLoginClick}
                  className={`text-primary-500 hover:underline cursor-pointer font-normal`}
                >
                  Sign in
                </span>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageSignUp;
