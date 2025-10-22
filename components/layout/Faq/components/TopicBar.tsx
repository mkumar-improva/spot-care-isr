import { HugeiconsIcon } from '@hugeicons/react';
import { 
  Home09Icon,
  Search02Icon,
  CreditCardIcon,
  UserCheck02Icon,
  ShieldUserIcon,
  Briefcase08Icon,
  Settings01Icon,
  Comment01Icon,
  CheckmarkBadge01Icon,
  Hospital02Icon
} from "@hugeicons-pro/core-stroke-rounded/index";

interface TopicbarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'about-spotcare', name: 'About Spot.care', icon: Home09Icon },
  { id: 'finding-care', name: 'Finding and Choosing Care', icon: Search02Icon },
  { id: 'pricing-payments', name: 'Pricing and Payments', icon: CreditCardIcon },
  { id: 'providers-verification', name: 'Providers and Verification', icon: CheckmarkBadge01Icon },
  { id: 'trust-safety', name: 'Trust, Safety and Privacy', icon: ShieldUserIcon },
  { id: 'for-providers', name: 'For Providers', icon: Hospital02Icon },
  { id: 'technical-support', name: 'Technical and Support', icon: Settings01Icon },
  { id: 'feedback-updates', name: 'Feedback and Updates', icon: Comment01Icon },
];

export default function Topicbar({ activeCategory, onCategoryChange }: TopicbarProps) {
  return (
    <aside className="w-full lg:w-96 flex-shrink-0">
      <div className="h-auto  px-6 py-8">
        <div className="bg-gray-50 rounded-xl  p-4">
          <div className="mb-6 pl-2">
            <h1 className="text-2xl font-bold text-gray-900">FAQ</h1>
            <p className="text-sm text-gray-500 mt-1">Frequently Asked Questions</p>
          </div>

          <nav>
            <ul className="space-y-2">
              {categories.map((category) => {
                const isActive = activeCategory === category.id;
                return (
                  <li key={category.id}>
                    <button
                      onClick={() => onCategoryChange(category.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <HugeiconsIcon
                        icon={category.icon}
                        className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`}
                      />
                      <span
                        className={`font-medium text-sm text-left ${
                          isActive ? 'text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        {category.name}
                      </span>
                    </button>
                  </li>

                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
}