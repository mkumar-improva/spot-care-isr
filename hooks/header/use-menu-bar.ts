"use client";
import { useRef } from "react";
import {
  LoginIcon,
  UserAddIcon,
  LogoutIcon,
  UserCircleIcon,
  CustomerSupportIcon,
  City02Icon,
} from "@hugeicons-pro/core-stroke-rounded/index";

const useMenuBar = () => {
  //references
  const menuBarRef = useRef<HTMLDivElement>(null);

  //handlers
  const _onAccountClicked = () => {};
  const _onHelpClicked = () => {};
  const _loginFunction = () => {};
  const _signupFunction = () => {};
  const _logout = () => {};

  //menu items
  const solutions = [
    {
      name: "Account",
      icon: UserCircleIcon,
      function: _onAccountClicked,
    },
    {
      name: "List your business",
      icon: City02Icon,
      function: () => {},
    },
  ];

  const solutionsFoot = [
    {
      name: "Help",
      icon: CustomerSupportIcon,
      function: _onHelpClicked,
    },
    {
      name: "Login",
      icon: LoginIcon,
      function: _loginFunction,
    },
    {
      name: "Sign up",
      icon: UserAddIcon,
      function: _signupFunction,
    },
    {
      name: "Logout",
      icon: LogoutIcon,
      function: _logout,
    },
  ];

  return {
    menuBarRef,
    solutions,
    solutionsFoot,
  };
};

export default useMenuBar;
