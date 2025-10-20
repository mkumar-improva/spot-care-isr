import { useRef, useState } from "react";
import useSearchUiStore from "store/ui/search-ui-store";
import useHeaderUiStore from "store/ui/header-ui-store";
import { useOutsideAlerter } from "../common/use-outsider-click";

const useProviderSearchForm = () => {
  /*--Begining of refs----------*/
  const containerRef = useRef<HTMLDivElement>(null);
  /*----------End of refs----------*/

  /*----------Begining of state ----------*/
  const [showVerticalLine, setShowVerticalLine] = useState(true);
  const [isShowPopoOver, setIsShowPopOver] = useState(false);
  const [isRecord, setIsRecord] = useState(true);
  const [error, setError] = useState(false);
  let params: Record<string, string | number> = {};

  /*----------End of state ----------*/

  /*----------Begining of Store Import----------*/
  const { locationValue, } =
    useSearchUiStore();
  const { isHomePage } = useHeaderUiStore();
  /*----------End of Store Import----------*/


  useOutsideAlerter(containerRef, () => {
    setShowVerticalLine(true);
    setIsShowPopOver(false);
  });

  return {
    containerRef,
    showVerticalLine,
    isShowPopoOver,
    isRecord,
    isHomePage,
    locationValue,
    error,

    setShowVerticalLine,
  };
};

export default useProviderSearchForm;
