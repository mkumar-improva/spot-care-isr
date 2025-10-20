"use client";

import { useRef, useState } from "react";
import useSearchUiStore from "store/ui/search-ui-store";
import useHeaderUiStore from "store/ui/header-ui-store";

const useProviderInputType = () => {
  /*--Begining of refs----------*/
  const inputRef = useRef<HTMLInputElement>(null);
  /*----------End of refs----------*/

  /*----------Begining of state ----------*/
  const [onFocus, setOnFocus] = useState(false);
  /*----------End of state ----------*/

  /*----------Begining of Store Import----------*/
  const { isHomePage } = useHeaderUiStore();
  const { locationValue, searchProviderName, setSearchProviderName } =
    useSearchUiStore((state) => ({
      locationValue: state.locationValue,
      searchProviderName: state.searchProviderName,
      setSearchProviderName: state.setSearchProviderName,
    }));
  /*----------End of Store Import----------*/

  //const values
  const placeHolder = "Provider";
  const desc = "Search provider by name";

  //handlers
  const handleSpanClick = () => {
    inputRef.current?.focus();
  };

  const handleProviderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProviderName(e.target.value);
  };

  const handleClearData = () => {
    setSearchProviderName("");
    inputRef.current?.focus();
  };

  return {
    inputRef,
    onFocus,
    isHomePage,
    locationValue,
    placeHolder,
    desc,
    searchProviderName,

    setOnFocus,
    setSearchProviderName,

    handleSpanClick,
    handleProviderNameChange,
    handleClearData,
  };
};

export default useProviderInputType;
