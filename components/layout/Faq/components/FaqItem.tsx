import { useState, useRef, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { PlusSignIcon,MinusSignIcon } from '@hugeicons-pro/core-stroke-rounded/index';
import {FAQItemProps} from '@/types/Faq';

export default function FAQItem({ 
      question, 
      answer, 
      defaultOpen = false,
      isMobile = false 
    }: FAQItemProps) {
      const [isOpen, setIsOpen] = useState(defaultOpen);
      const contentRef = useRef<HTMLDivElement>(null);
      const [maxHeight, setMaxHeight] = useState<string>('0px');

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen]);

  const containerClasses = "py-2"; 

  const buttonClasses = isMobile
    ? "w-full flex items-center justify-between py-2 text-left transition-colors "
    : "w-full flex items-center justify-between py-2 text-left transition-colors ";

  const contentClasses = isMobile
    ? "overflow-hidden transition-all duration-300 ease-in-out px-5 pt-0"
    : "overflow-hidden transition-all duration-300 ease-in-out px-6 ";

  return (
    <div className={containerClasses}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={buttonClasses}
        aria-expanded={isOpen}
      >
        <span className="font-md text-gray-900 text-base sm:text-base pr-4 ">
          {question}
        </span>
        <HugeiconsIcon 
          icon={isOpen ? MinusSignIcon : PlusSignIcon}
          className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 transition-transform duration-300"
        />
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight }}
        className={contentClasses}
      >
        <div>
          <p className="text-neutral-500 pb-1.5 text-base sm:text-base leading-relaxed ">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}