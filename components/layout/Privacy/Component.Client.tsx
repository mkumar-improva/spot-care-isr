"use client";

import { Config } from "constants/config";
import React from "react";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="w-full max-w-screen-2xl xl:max-w-screen-2xl mx-auto  py-6 px-4 lg:px-[10rem] xl:px-[22rem] 2xl:px-[24rem] bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="w-full flex items-center justify-between mb-2">
        {/* <ButtonSecondary
          className="border-gray-200"
          onClick={() => navigate("/")}
        >
          <span>
            <ArrowLeftIcon className="w-5 h-5" />
          </span>
          &nbsp;Back
        </ButtonSecondary> */}
        <h1 className="text-3xl font-bold text-center">Privacy Policy</h1>
        <div className="hidden xsm:block w-[100px]"></div>
        {/*to keep h1 in center*/}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-left">
        Effective date: 12 December 2024
      </p>

      <p className="my-8">
        Spot.care is committed to protecting your privacy. This Privacy Policy
        explains how we collect, use, disclose, and safeguard your information
        when you use the Spot.care Portal (“Portal”). By accessing or using the
        Portal, you agree to the terms of this Privacy Policy.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        1. Information we collect
      </h2>
      <p className="ml-6 mb-4">
        We collect various types of information to provide and improve the
        Portal. The types of information we may collect include:
      </p>

      <h3 className="text-lg font-medium mb-2">a. Personal information</h3>
      <ul className="list-disc list-outside space-y-2 ml-6 mb-4">
        <li>
          <strong>Account information:</strong> Name, email address, phone
          number, job title, organization, and other details provided during
          registration or profile updates.
        </li>
        <li>
          <strong>Authentication information:</strong> Usernames, passwords, and
          security questions.
        </li>
      </ul>

      <h3 className="text-lg font-medium mb-2">b. Usage data</h3>
      <ul className="list-disc list-outside ml-6 mb-4 space-y-2">
        <li>
          <strong>Log data:</strong> IP addresses, browser type, operating
          system, and other technical details collected automatically when you
          use the Portal.
        </li>
        <li>
          <strong>Activity information:</strong> Actions performed on the
          Portal, such as searches, clicks, and file uploads or downloads.
        </li>
      </ul>

      <h3 className="text-lg font-medium mb-2">c. Provider data</h3>
      <ul className="list-disc list-outside ml-6 mb-4 space-y-2">
        <li>
          Information submitted by providers, including professional
          qualifications, services offered, and contact details.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        2. How we use your information
      </h2>
      <ul className="list-disc list-outside ml-6 mb-4 space-y-2">
        <li>
          <strong>To provide and improve services:</strong> Ensure smooth
          operation of the Portal, including account management and access to
          resources.
        </li>
        <li>
          <strong>To communicate with you:</strong> Send updates, respond to
          inquiries, or provide support.
        </li>
        <li>
          <strong>To monitor and analyze usage:</strong> Improve functionality,
          troubleshoot technical issues, and optimize user experience.
        </li>
        <li>
          <strong>To ensure security:</strong> Protect against unauthorized
          access, fraud, and misuse of the Portal.
        </li>
        <li>
          <strong>To comply with legal obligations:</strong> Meet applicable
          legal and regulatory requirements.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        3. Sharing and disclosure of information
      </h2>
      <ul className="list-disc list-outside ml-6 mb-4 space-y-2">
        <li>
          <strong>Service providers:</strong> Trusted vendors and contractors
          who assist us in operating the Portal, such as hosting providers and
          analytics tools, under confidentiality agreements.
        </li>
        <li>
          <strong>Legal requirements:</strong> When required by law or to
          protect the rights, property, or safety of Spot.care, our users, or
          others.
        </li>
        <li>
          <strong>Business transactions:</strong> In the event of a merger,
          acquisition, or sale of assets, your information may be transferred to
          the successor organization.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        4. Your choices and rights
      </h2>
      <ul className="list-disc list-outside ml-6 mb-4 space-y-2">
        <li>
          <strong>Access and update information:</strong> Review and update your
          account information via the Portal.
        </li>
        <li>
          <strong>Opt-out:</strong> Unsubscribe from non-essential
          communications using the opt-out mechanism provided.
        </li>
        <li>
          <strong>Data deletion:</strong> Request deletion of your personal
          information by contacting us, subject to legal and contractual
          obligations.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">5. Data security</h2>
      <p className="ml-6 mb-4">
        We implement appropriate technical and organizational measures to
        safeguard your information against unauthorized access, loss, or misuse.
        However, no system can be completely secure. Please use the Portal
        responsibly and report any suspected security issues.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">6. Retention of data</h2>
      <p className="ml-6 mb-4">
        We retain your information only for as long as necessary to fulfill the
        purposes outlined in this Privacy Policy or to comply with legal
        obligations.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        7. Cookies and tracking technologies
      </h2>
      <p className="ml-6 mb-4">
        The Portal uses cookies and similar technologies to enhance user
        experience and analyze usage. You can manage your cookie preferences
        through your browser settings.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">8. Children's privacy</h2>
      <p className="ml-6 mb-4">
        The Portal is not intended for use by individuals under the age of 18.
        We do not knowingly collect personal information from minors. If we
        become aware that a minor has provided us with personal information, we
        will take steps to delete it.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        9. Changes to this privacy policy
      </h2>
      <p className="ml-6 mb-4">
        We may update this Privacy Policy from time to time. Any changes will be
        effective when posted, and your continued use of the Portal constitutes
        acceptance of the updated policy.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact us</h2>
      <p className="ml-6 mb-4">
        If you have any questions, concerns, or requests regarding this Privacy
        Policy, please contact us at{" "}
        <a
          href="mailto:support@spot.care"
          className="text-blue-500 dark:text-blue-300 underline"
        >
          support@spot.care
        </a>
        .
      </p>
    </div>
  );
};

export default PrivacyPolicy;
