import { FaqComponent } from "@/components/layout/Faq/Component";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | Spot.care - Healthcare Questions Answered',
  description: 'Find answers to common questions about Spot.care. Learn how to connect with top healthcare providers, including assisted living, skilled nursing, hospice, and home health services.',
};

export default function Page() {
	return <FaqComponent />;
}
