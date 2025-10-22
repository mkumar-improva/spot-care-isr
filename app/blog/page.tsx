import { BlogComponent } from "@/components/layout/Blog/Component";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spot.Care | Blog',
  description: 'Stay updated with the latest news, insights, and tips about healthcare and care providers from SpotCare.',
};

export default function BlogPage() {
    return <BlogComponent />;
}