"use client";
import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from "react";
import { KEYS } from "@/constants/KeyConstants";

interface UseOtpInputProps {
  onSubmit: (otp: string) => void;
  onResendClick?: () => void;
}

const useOtpInput = ({ onSubmit, onResendClick }: UseOtpInputProps) => {
  //state

  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [timer, setTimer] = useState<number>(60); // Initial timer value (60 seconds)
  const [resendEnabled, setResendEnabled] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  //useeffect

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timer > 0) {
      setResendEnabled(false);
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setResendEnabled(true);
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  //handlers

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input if there’s a value and it's not the last box
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(otp.join(""));
  };

  const handleResend = () => {
    if (onResendClick) {
      onResendClick();
    } else {
      console.error("onResendClick is not provided");
    }
    setTimer(60); // Reset the timer
    setResendEnabled(false); // Disable resend immediately
  };

  const handler = (e: KeyboardEvent) => {
    if (e.key === KEYS.ENTER) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return {
    otp,
    inputRefs,
    timer,
    resendEnabled,
    handleChange,
    handleKeyDown,
    handleSubmit,
    handleResend,
    handler
  }
};

export default useOtpInput;
