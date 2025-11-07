const HeroSearchSkeleton = () => {
  return (
    <div
      className="w-fit absolute top-[1.1rem] left-1/2 -translate-x-1/2 flex items-center justify-between border border-neutral-200 dark:border-neutral-6000 pr-[.4rem] rounded-full shadow transition-all visible"
      aria-hidden="true"
    >
      <div className="flex items-center font-medium text-sm">
        <span className="flex items-center pl-5 pr-4 py-2 md:py-3">
          <span className="animate-pulse h-4 w-20 md:w-24 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
        </span>
        <span className="h-4 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
        <span className="flex items-center px-4 py-2 md:py-3">
          <span className="animate-pulse h-4 w-20 md:w-24 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
        </span>
        <span className="h-4 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
        <span className="flex items-center px-4 py-2 md:py-3">
          <span className="animate-pulse h-4 w-16 md:w-20 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
        </span>
      </div>
      <div className="size-8 flex items-center justify-center">
        <div className="animate-pulse size-8 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
      </div>
    </div>
  );
};

export default HeroSearchSkeleton;