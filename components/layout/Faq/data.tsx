import {FAQCategory} from '@/types/Faq';

export const faqData: Record<string, FAQCategory> = {
  'about-spotcare': {
    id: 'about-spotcare',
    title: 'About Spot.care',
    description: 'Learn what Spot.care is and how it differs from traditional home-care agencies.',
    questions: [
      {
        id: 'as-1',
        question: 'What is Spot.care?',
        answer: `Spot.care is a trusted healthcare and senior-care discovery platform that 
connects families, patients, and organizations with verified care providers. 
We help you find home caregivers, nurses, therapists, and senior living 
facilities — all in one place.`
      },
      {
        id: 'as-2',
        question: 'How does Spot.care differ from a home-care agency?',
        answer: `Unlike an agency, Spot.care does not employ caregivers or manage care 
delivery. We provide listings, tools, and guidance to help you compare 
providers and make your own informed choices.`
      },
      {
        id: 'as-3',
        question: 'Who can use Spot.care?',
        answer: `Anyone looking for care — individuals, families, or healthcare organizations 
— can use Spot.care to find qualified providers. Care professionals and 
facilities can also join Spot.care to reach more clients.`
      },
      {
        id: 'as-4',
        question: 'Where is Spot.care available?',
        answer: `Spot.care currently serves users across the United States and continues to 
expand coverage to more cities and care categories.`
      }
    ]
  },
  'finding-care': {
    id: 'finding-care',
    title: 'Finding and Choosing Care',
    description: 'How to search, filter, compare, and contact providers on Spot.care.',
    questions: [
      {
        id: 'fc-1',
        question: 'How do I find a caregiver or healthcare provider?',
        answer: `You can search by service type (e.g., home care, physical therapy), location, 
or provider name. You’ll see profiles with experience, specialties, contact 
details, and user reviews.`
      },
      {
        id: 'fc-2',
        question: 'Can I filter results to match my needs?',
        answer: `Yes! Use filters for location, care type, certifications, gender, experience 
level, and availability to refine your search results.`
      },
      {
        id: 'fc-3',
        question: 'How do I compare different providers?',
        answer: `Each listing shows qualifications, ratings, service offerings, and reviews so 
you can easily compare and shortlist your best matches.`
      },
      {
        id: 'fc-4',
        question: 'How do I contact a provider?',
        answer: `Select a provider and click Contact or Request Info. You can send a secure 
message or request a callback directly from their profile.`
      },
      {
        id: 'fc-5',
        question: 'Are all providers verified or licensed?',
        answer: `Spot.care reviews all listings for accuracy and completeness. Providers are 
encouraged to upload credentials, but families should always verify licenses 
and certifications directly.`
      }
    ]
  },
  'pricing-payments': {
    id: 'pricing-payments',
    title: 'Pricing and Payments',
    description: 'Information on service costs, payments, and insurance.',
    questions: [
      {
        id: 'pp-1',
        question: 'How much does care typically cost?',
        answer: `Prices vary by service, provider experience, and region. Each listing may 
include an estimated hourly or monthly rate. Spot.care itself does not set 
or collect payments.`
      },
      {
        id: 'pp-2',
        question: 'Does Spot.care charge users or families?',
        answer: `No, browsing and contacting providers on Spot.care is completely free. 
Providers may pay a small fee for premium listing options.`
      },
      {
        id: 'pp-3',
        question: 'How do payments between clients and providers work?',
        answer: `Spot.care does not process payments. Families and providers handle 
payment terms directly. We recommend confirming rates and agreements in 
writing before starting care.`
      },
      {
        id: 'pp-4',
        question: 'Can I use insurance or Medicare for services found through Spot.care?',
        answer: `Many providers accept insurance or Medicare depending on the service 
type. Check the provider’s profile or ask them directly.`
      }
    ]
  },
  'providers-verification': {
    id: 'providers-verification',
    title: 'Providers and Verification',
    description: 'Details about providers, screening, and reviews.',
    questions: [
      {
        id: 'pv-1',
        question: 'Who are the providers listed on Spot.care?',
        answer: `Providers range from individual caregivers and nurses to senior living 
centers, home health agencies, and medical equipment suppliers.`
      },
      {
        id: 'pv-2',
        question: 'How are providers screened?',
        answer: `Spot.care checks for duplicate, incomplete, or fraudulent listings. 
However, background checks and license verification should be confirmed 
by users before hiring.`
      },
      {
        id: 'pv-3',
        question: 'Can I see reviews or ratings for providers?',
        answer: `Yes. Each provider profile includes verified reviews and ratings shared by 
real users who have interacted with them.`
      },
      {
        id: 'pv-4',
        question: 'Can I trust the reviews on Spot.care?',
        answer: `We monitor all feedback for authenticity and inappropriate content. Reviews
reflect genuine user experiences and cannot be edited by providers.`
      }
    ]
  },
  'trust-safety': {
    id: 'trust-safety',
    title: 'Trust, Safety and Privacy',
    description: 'How Spot.care ensures safety, privacy, and handles fraud.',
    questions: [
      {
        id: 'ts-1',
        question: 'How can I make sure my loved one is safe when hiring care?',
        answer: `We suggest: Asking for identification and professional references; 
requesting certifications or training proof; meeting in public before home 
visits; using written agreements for duties and payment.`
      },
      {
        id: 'ts-2',
        question: 'What should I do if I suspect fraud or inappropriate behavior?',
        answer: `Report the issue immediately using the Report Provider button on their 
profile. Our moderation team investigates all reports and may suspend or 
remove listings.`
      },
      {
        id: 'ts-3',
        question: 'How does Spot.care protect user data?',
        answer: `We use secure encryption and privacy-first data practices. Your information 
is never sold or shared with third parties without consent.`
      },
      {
        id: 'ts-4',
        question: 'Does Spot.care share my personal data with providers?',
        answer: `No. Providers only see the contact details you choose to share when you 
message or inquire through the platform.`
      }
    ]
  },
  'for-providers': {
    id: 'for-providers',
    title: 'For Providers',
    description: 'How to join, list, and improve visibility on Spot.care.',
    questions: [
      {
        id: 'fp-1',
        question: 'How can I list my services on Spot.care?',
        answer: `Go to Join as a Provider, create an account, and fill out your profile with 
service details, credentials, and contact information. You can preview your 
listing before publishing.`
      },
      {
        id: 'fp-2',
        question: 'How much does it cost to list my services?',
        answer: `Basic listings are free. Providers can upgrade to premium plans for 
additional visibility and lead-generation features.`
      },
      {
        id: 'fp-3',
        question: 'Can I edit or remove my listing?',
        answer: `Yes. Log in to your provider dashboard to update information or deactivate 
your profile anytime.`
      },
      {
        id: 'fp-4',
        question: 'How can I improve my visibility on Spot.care?',
        answer: `Keep your profile complete and updated — include credentials, photos, a 
clear description of services, and respond promptly to inquiries.`
      }
    ]
  },
  'technical-support': {
    id: 'technical-support',
    title: 'Technical and Support',
    description: 'Login issues, verification emails, and reporting problems.',
    questions: [
      {
        id: 'tst-1',
        question: 'Why can’t I log in to my account?',
        answer: `Ensure you’re using the correct email and password. If you forgot your 
password, click Forgot Password to reset it via email.`
      },
      {
        id: 'tst-2',
        question: 'I didn’t receive a verification email — what should I do?',
        answer: `Check your spam folder. If it’s not there, resend the email or contact our 
support team at support@spot.care.`
      },
      {
        id: 'tst-3',
        question: 'How can I report a technical problem or bug?',
        answer: `You can reach our support team via the Help Center or email. Please include
a description, browser/device type, and screenshots if possible.`
      }
    ]
  },
  'feedback-updates': {
    id: 'feedback-updates',
    title: 'Feedback and Updates',
    description: 'Suggestions, feature requests, and platform updates.',
    questions: [
      {
        id: 'fu-1',
        question: 'Can I suggest a new feature or improvement?',
        answer: `Absolutely! We love feedback. Send your suggestions through the Feedback 
section or email us directly.`
      },
      {
        id: 'fu-2',
        question: 'How often is Spot.care updated?',
        answer: `Provider listings are reviewed regularly. Our platform is updated weekly 
with new features, listings, and verified reviews.`
      }
    ]
  }
};
