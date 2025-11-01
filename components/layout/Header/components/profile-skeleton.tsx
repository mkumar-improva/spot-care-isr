const ProfileSkeleton = () => {
  return (
    <div>
      {/* Match AvatarDropDown button wrapper and avatar sizes */}
      <button
        className="rounded-3xl inline-flex items-center focus:outline-none pointer-events-none"
        disabled
        aria-hidden="true"
      >
        <div className="animate-pulse size-9 md:size-11 bg-neutral-100 dark:bg-neutral-700 rounded-full ring-1 ring-neutral-200 dark:ring-neutral-600" />
      </button>
    </div>
  );
};

export default ProfileSkeleton;
