"use client";
import Radiobox from "@/components/ui/radio-box/radio-box";
import useSortFilter from "@/hooks/list/use-sort-filter";
import ButtonClose from "@/components/ui/button/types/button-close";

const SortFilterDialog = () => {
  const {
    filterOptions,
    setIsSortingDialogOpen,
    sortByOptions,
  } = useSortFilter();

  return (
    <div className="relative w-[80vw] md:w-[60vw] lg:hidden rounded-xl flex flex-col gap-[2rem]">
      {/* Dialog header */}
      <div className="flex flex-row text-neutral-700 dark:text-neutral-300 text-center justify-between items-center border-b dark:border-neutral-800 p-4 relative">
        <p className="text-xl font-semibold flex-grow">Sort</p>
      </div>
      {/* Dialog Content */}
      <div className="w-full pl-6 pr-5 pt-0 pb-5 flex flex-col gap-6">
        {filterOptions.map(({ key, label, subLabel, checked }) => (
          <div key={key}>
            <Radiobox
              name="filterGroup"
              value={key}
              label={label}
              subLabel={subLabel}
              checked={checked}
              onChange={(value) => sortByOptions(value)}
            />
          </div>
        ))}
      </div>
      {/* Close Button */}
      <span className="absolute right-3 top-3">
        <ButtonClose
          onClick={() => setIsSortingDialogOpen(false)}
          isHover={false}
        />
      </span>
    </div>
  );
};

export default SortFilterDialog;
