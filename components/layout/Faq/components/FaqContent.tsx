import FAQItem from './FaqItem';
import { faqData } from '../data';
import {FAQContentProps} from '@/types/Faq';


export default function FAQContent({ 
  category, 
  title, 
  description, 
  questions,
  isMobile 
}: FAQContentProps) {
  const sections = isMobile 
    ? Object.values(faqData) 
    : [{ id: category, title, description, questions }];

  return (
    <div className={isMobile ? "min-h-screen bg-white" : "flex-1 bg-white"}>
      <main className={isMobile ? "max-w-5xl mx-auto px-4 py-8 sm:px-6" : "max-w-5xl mx-auto p-8 lg:p-12"}>
        {isMobile && (
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">FAQ</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              Frequently Asked Questions
            </p>
          </div>
        )}

        <div className={isMobile ? "space-y-6" : ""}>
          {sections.map((section) => (
            <section 
              key={section.id} 
              className={isMobile ? "scroll-mt-24" : ""} 
              id={section.id}
            >
              {isMobile ? (
                <div className="mb-0">
                  <h2 className="text-2xl sm:text-2xl font-bold text-gray-900 mb-1">
                    {section.title}
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-500 leading-relaxed">
                    {section.description}
                  </p>
                </div>
              ) : (
                <div className="mb-0">
                  <h2 className="text-2xl font-extrabold text-gray-900 ">
                    {section.title}
                  </h2>
                  <p className="text-neutral-500 text-lg">
                    {section.description}
                  </p>
                </div>
              )}

              <div className={isMobile ? "bg-white rounded-lg" : "bg-white rounded-xl pr-6"}>
                {section.questions.map((q, index) => (
                  <div key={q.id} className={index !== section.questions.length - 1 ? "border-b border-gray-200" : ""}>
                    <FAQItem
                      question={q.question}
                      answer={q.answer}
                      defaultOpen={false}
                      isMobile={isMobile}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}