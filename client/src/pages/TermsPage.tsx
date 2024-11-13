import { ReactElement } from "react";

export default function TermsPage(): ReactElement {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-[#121212] text-[#b3b3b3]">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Terms and Conditions
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Please read these terms and conditions carefully before using
          Spotigit.
        </p>
      </div>

      <div className="space-y-8 mb-12">
        <TermsSection
          title="1. Acceptance of Terms"
          content="By accessing or using Spotigit, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not use our service."
        />
        <TermsSection
          title="2. Description of Service"
          content="Spotigit is a playlist tracking and management tool that integrates with Spotify. We provide users with the ability to version control and collaborate on playlists."
        />
        <TermsSection
          title="3. User Accounts"
          content="To use Spotigit, you must have a valid Spotify account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account."
        />
        <TermsSection
          title="4. Privacy Policy"
          content="Your use of Spotigit is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices."
        />
        <TermsSection
          title="5. Intellectual Property"
          content="The Service and its original content, features, and functionality are owned by Spotigit and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws."
        />
        <TermsSection
          title="6. Limitation of Liability"
          content="Spotigit shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service."
        />
        <TermsSection
          title="7. Changes to Terms"
          content="We reserve the right to modify these terms at any time. We will notify users of any changes by posting the new Terms and Conditions on this page. Continued use of Spotigit after changes constitutes acceptance of the new terms."
        />
        <TermsSection
          title="8. Termination"
          content="We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms."
        />
      </div>

      <div className="text-center">
        <p className="text-lg mb-6">
          By using Spotigit, you acknowledge that you have read, understood, and
          agree to be bound by these Terms and Conditions.
        </p>
      </div>
    </div>
  );
}

function TermsSection({ title, content }: { title: string; content: string }) {
  return (
    <div className="border-b border-[#282828] pb-6">
      <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
      <p className="text-[#b3b3b3]">{content}</p>
    </div>
  );
}
