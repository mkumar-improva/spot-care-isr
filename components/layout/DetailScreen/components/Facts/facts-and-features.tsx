import { Fragment } from "react";
import type { Section } from "@/types/provider-details";
import {
  useFactsGrouping,
  useTextFormatter,
  useSectionIcons,
} from "@/hooks/detailscreen/facts";

interface FactsSectionProps {
  facts: Section[];
}

export default function FactsSection({ facts }: FactsSectionProps) {
  const { groupedData } = useFactsGrouping(facts);
  const { convertToNormalCase } = useTextFormatter();
  const { getSectionIcon } = useSectionIcons();

  return (
    <div className="w-full flex flex-col items-start justify-start gap-[1rem]">
      {Object.entries(groupedData).map(([careType, sections], index) => (
        <div
          key={careType}
          className="w-full flex flex-col items-start justify-start gap-[1rem]"
        >
          <div className="w-full bg-primary-50 border border-primary-200 py-2 px-3 rounded-md">
            <p className="text-[22px] font-medium text-primary tracking-wide">
              {careType}
            </p>
          </div>
          {/* Facts and Feature Contents */}
          <div className="w-full flex flex-col items-start justify-start gap-[1rem]">
            <div className="w-full flex flex-col items-start justify-start ">
              <div className="w-full columns-1 lg:columns-2 gap-x-2 space-y-2">
                {sections.map((section: Section, sectionIndex: number) => (
                  <Fragment key={`${careType}-section-${sectionIndex}`}>
                    {section.subSections.map((subsection, subsectionIndex) => (
                      <div
                        key={`${careType}-subsection-${subsectionIndex}-${subsection.subSectionName}`}
                        className="flex flex-col items-start justify-start bg-white md:px-1"
                      >
                        <p className="mb-1 text-base text-neutral-900 font-medium subsection-heading py-2">
                          {convertToNormalCase(subsection.subSectionName)}
                        </p>
                        {subsection.questions.map((e, questionIndex) => (
                          <ul key={`question-${questionIndex}-${e.questionText.substring(0, 20)}`}>
                            {e.responses.map((response, responseIndex) => (
                              <li
                                key={`response-${responseIndex}-${response.responseText.substring(0, 20)}`}
                                className="flex items-start gap-[6px] mb-[.5rem] font-[400] text-neutral-500"
                              >
                                {getSectionIcon(convertToNormalCase(section.sectionName))}
                                <p className="text-sm leading-[1.5rem]">
                                  {e.questionText.replace(/[?:]/g, "")}:{" "}
                                  {/https?:\/\//.test(response.responseText) ? (
                                    <a
                                      href={response.responseText}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 underline text-sm"
                                    >
                                      View CMS details
                                    </a>
                                  ) : (
                                    <span className={`text-sm font-medium`}>
                                      {response.responseText}
                                    </span>
                                  )}
                                </p>
                              </li>
                            ))}
                          </ul>
                        ))}
                      </div>
                    ))}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
