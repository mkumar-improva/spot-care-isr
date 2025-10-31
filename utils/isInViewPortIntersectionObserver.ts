export interface InviewPortType {
  callback: () => void;
  target: HTMLElement | null;
  options: IntersectionObserverInit | undefined;
  freezeOnceVisible: boolean;
}

const checkInViewIntersectionObserver = ({
  target,
  options = { root: null, rootMargin: `0%`, threshold: 0 },
  callback,
  freezeOnceVisible = false,
}: InviewPortType) => {
  const _funCallback: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        //
        callback();
        //  ---- IF TRUE WE WILL UNOBSERVER AND FALSE IS NO
        if (freezeOnceVisible) {
          observer.unobserve(entry.target);
        }
      }
    });
  };

  // _checkBrowserSupport-----
  if (typeof window.IntersectionObserver === "undefined") {
    console.error(
      "window.IntersectionObserver === undefined! => Your Browser is Not supported"
    );
    return;
  }

  const observer = new IntersectionObserver(_funCallback, options);
  target && observer.observe(target);
};

export default checkInViewIntersectionObserver;
