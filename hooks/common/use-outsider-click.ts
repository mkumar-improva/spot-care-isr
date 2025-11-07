import { useEffect } from "react";

export function useOutsideAlerter(
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
  ignoreSelector?: string
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;

      const clickedOutside = ref.current && !ref.current.contains(target);
      const clickedInsideIgnored = ignoreSelector && target.closest(ignoreSelector);

      if (clickedOutside && !clickedInsideIgnored) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, ignoreSelector]);
}
