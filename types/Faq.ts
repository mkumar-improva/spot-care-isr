export interface Question {
  id: string;
  question: string;
  answer: string;
}

export interface FAQContentProps {
  category: string;
  title: string;
  description: string;
  questions: Question[];
  isMobile: boolean;
}

export interface FAQItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
  isMobile?: boolean;
}

export interface TopicbarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}


export interface FAQCategory {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}