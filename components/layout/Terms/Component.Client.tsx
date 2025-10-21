"use client";

import React from "react";
import { Helmet } from "react-helmet-async";
import { Config } from "constants/config";

const TermsOfUse: React.FC = () => {
  return (
    <div className="w-full max-w-screen-2xl xl:max-w-screen-2xl mx-auto px-4 lg:px-[10rem] xl:px-[22rem] 2xl:px-[24rem] py-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="w-full flex items-center justify-start mb-6">
        {/* <ButtonSecondary
          className="border-gray-200"
          onClick={() => navigate("/")}
        >
          <span>
            <ArrowLeftIcon className="w-5 h-5" />
          </span>
          &nbsp;Back
        </ButtonSecondary> */}
        <h1 className="text-3xl font-bold text-center">Terms of use</h1>
        <div className="hidden xsm:block w-[100px]"></div>
        {/*to keep h1 in center*/}
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        1. Acceptance of terms
      </h2>
      <p className="ml-6 mb-4">
        By accessing or using the Spot.care, you agree to be bound by these
        terms of use ("Terms"). If you do not agree to these terms, do not use
        this portal.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        2. Modification of terms
      </h2>
      <p className="ml-6 mb-4">
        Spot.care reserves the right, at our discretion, to change, modify, add,
        or remove portions of these Terms at any time. Please check these Terms
        periodically for changes. Your continued use of the Portal following the
        posting of changes to these Terms will mean you accept those changes.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">3. Privacy policy</h2>
      <p className="ml-6 mb-4">
        Your privacy is important to us. Our Privacy Policy is incorporated into
        these Terms by reference and explains how we collect, use, and share
        information about you when you use our Portal.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        4. Access and use of the portal
      </h2>
      <ul className="list-disc list-outside ml-8 mb-4 space-y-2">
        <li>
          <strong>Eligibility:</strong> You must be at least 18 years old to use
          the Portal.
        </li>
        <li>
          <strong>Permission to use the portal:</strong> Spot.care grants you a
          personal, non-transferable, and non-exclusive right and license to use
          the resources provided on the Portal, provided that you comply with
          these Terms.
        </li>
        <li>
          <strong>Portal availability:</strong> We do not guarantee that the
          Portal will always be available or be uninterrupted. Access to the
          Portal is permitted on a temporary basis.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">5. Prohibited uses</h2>
      <p className="ml-6 mb-4">
        You may use the Portal only for lawful purposes and in accordance with
        these Terms. You agree not to use the Portal:
      </p>
      <ul className="list-disc list-outside ml-8 mb-4 space-y-2">
        <li>
          In any way that violates any applicable national or international law
          or regulation.
        </li>
        <li>
          For the purpose of exploiting, harming, or attempting to exploit or
          harm minors in any way by exposing them to inappropriate content or
          otherwise.
        </li>
        <li>
          To transmit, or procure the sending of, any advertising or promotional
          material without our prior written consent, except where specifically
          allowed in relation to provider services.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        6. Intellectual property rights
      </h2>
      <p className="ml-6 mb-4">
        The content, layout, design, data, databases, and graphics on this
        Portal are protected by intellectual property laws. You agree not to
        copy, download, use, redesign, reconfigure, or retransmit anything from
        the Portal without Spot.care's express prior written consent.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">7. Provider data</h2>
      <p className="ml-6 mb-4">
        Providers are responsible for ensuring that their data and information
        on the Portal are accurate, up-to-date, and comply with relevant
        regulations. Spot.care is not responsible for any inaccuracies in any
        provider data.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">8. Termination</h2>
      <p className="ml-6 mb-4">
        We may terminate or suspend your access to our Portal immediately,
        without prior notice or liability, for any reason whatsoever, including
        without limitation if you breach these Terms.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        9. Disclaimers and limitations of liability
      </h2>
      <p className="ml-6 mb-4">
        The Portal and its content are provided on an "as is" and "as available"
        basis. Spot.care does not make any representations or warranties of any
        kind, express or implied, as to the operation of their services, or the
        information, content, or materials included on this Portal.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">10. Governing law</h2>
      <p className="ml-6 mb-4">
        These Terms shall be governed by and construed in accordance with the
        laws of the jurisdiction in which Spot.care operates, without giving
        effect to any principles of conflicts of law.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        11. Dispute resolution
      </h2>
      <p className="ml-6 mb-4">
        Any disputes arising out of or related to these Terms will be handled
        through final and binding arbitration, under the rules of the American
        Arbitration Association.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">12. Contact us</h2>
      <p className="ml-6 mb-4">
        If you have any questions about these Terms, please contact us at{" "}
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

export default TermsOfUse;
