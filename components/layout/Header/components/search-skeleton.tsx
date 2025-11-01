const SearchSkeleton = () => {
  return (
    <button
      className="text-2xl md:text-3xl rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center pointer-events-none"
      disabled
      aria-hidden="true"
      suppressHydrationWarning
    >
      {/* Match SearchTab button footprint */}
      <div className="flex items-center justify-center">
        <div className="animate-pulse w-7 h-7 md:w-8 md:h-8 bg-neutral-200 dark:bg-neutral-600 rounded-full ring-1 ring-neutral-200 dark:ring-neutral-600" />
      </div>
    </button>
  );
};

export default SearchSkeleton;
