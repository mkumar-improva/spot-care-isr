import { Providers } from "@/types/provider-details";
import { FC } from "react";
import { socialMediaTypes } from "@/utils/social-media-types";
import { useSocialMediaDropdown } from "@/hooks/detailscreen/providerinfo";

interface SocialMediaSectionProps {
  providers: Providers | null;
}

const SocialMediaSection: FC<SocialMediaSectionProps> = ({ providers }) => {
  const { 
    isDropdownOpen, 
    headerCount, 
    dropdownRef, 
    toggleDropdown 
  } = useSocialMediaDropdown();

  const headerSocialMedia = providers?.socialMedia?.slice(0, headerCount) || [];
  const tailSocialMedia = providers?.socialMedia?.slice(headerCount) || [];

  return (
    <>
      {headerSocialMedia && headerSocialMedia.length > 0 && (
        <div className="flex items-center justify-start gap-2 text-neutral-500">
          <p className="text-base">Available on</p>
          <div className="flex items-center justify-start gap-3 text-neutral-500">
            {headerSocialMedia.map((socialMedia, index) => {
              // Find the matching social media type
              const socialType = socialMediaTypes.find(
                (type) => type.id === socialMedia.socialMediaType?.id
              );

              if (!socialType) return null;

              return (
                <a
                  key={`social-header-${socialMedia.id || index}-${socialMedia.socialMediaType?.id}`}
                  href={socialMedia.socialMediaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:text-neutral-700 transition-colors flex items-center justify-start gap-1 
                          border border-neutral-300 px-2 py-1 rounded-full hover:bg-neutral-100"
                >
                  {socialType.icon}{" "}
                  <span className="text-xs">{socialType.typeName}</span>
                </a>
              );
            })}
            {tailSocialMedia && tailSocialMedia.length > 0 && (
              // More icon
              <div className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center justify-center border border-neutral-300 px-2 py-1 rounded-full cursor-pointer relative hover:bg-neutral-100"
                  onClick={toggleDropdown}
                >
                  <p className="text-xs text-neutral-500">⋯</p>
                </div>
                {/* More social media list */}
                {isDropdownOpen && (
                  <ul className="absolute bg-white z-10 border border-neutral-100 shadow-md shadow-neutral-200 rounded-lg flex flex-col top-[2.5rem] overflow-hidden">
                    {tailSocialMedia.map((socialMedia, index) => {
                      const socialType = socialMediaTypes.find(
                        (type) =>
                          type.id === socialMedia.socialMediaType?.id
                      );
                      if (!socialType) return null;
                      return (
                        <li
                          key={index}
                          className={`bg-white px-5 hover:bg-neutral-100 ${
                            index === 0 ? "pt-4 " : "pt-3 "
                          }${
                            index === tailSocialMedia.length - 1
                              ? "pb-4"
                              : "pb-3"
                          }`}
                        >
                          <a
                            href={socialMedia.socialMediaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer flex items-center justify-start gap-1"
                          >
                            {socialType.icon}
                            <span className="text-xs">
                              {socialType.typeName}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SocialMediaSection;
