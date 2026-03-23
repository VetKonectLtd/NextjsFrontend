import Footer from "@/components/shared/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description: "Learn more about our privacy practices and how we protect your information.",
  openGraph: {
    title: "Privacy Policy | Vet Konect",
    description: "Learn more about our privacy practices and how we protect your information.",
    url: "https://vetkonect.com/privacy",
    images: [{ url: "https://www.vetkonect.com/images/og-logo.png" }],
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Privacy Policy | Vet Konect",
    description: "Learn more about our privacy practices and how we protect your information.",
    images: [`https://www.vetkonect.com/images/og-logo.png`],
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 py-6 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20">
        
        {/* Header */}
        <div className="mb-14 border-b pb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Vet Konect Privacy Policy
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Vet Konect is committed to protecting your personal information and
            safeguarding your privacy. This Privacy Policy explains how we
            collect, use, process, and protect information when you access our
            mobile application and web platform.
          </p>

          <p className="text-sm text-gray-500 mt-4">
            Last Updated: {new Date().getFullYear()}
          </p>
        </div>

        <div className="space-y-16 text-gray-700 leading-relaxed text-[15px]">
          
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              1. Introduction
            </h2>
            <p>
              By accessing or using Vet Konect, you consent to the data
              practices described in this Privacy Policy. We process your
              information in accordance with applicable data protection laws
              and industry best practices to ensure confidentiality, integrity,
              and availability of your data.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              2. Information We Collect
            </h2>

            <p className="mb-6">
              We collect information that identifies, relates to, or could
              reasonably be linked to you or your animals, including:
            </p>

            <ul className="list-disc ml-6 space-y-3">
              <li>
                <strong>Account Information:</strong> Name, email address,
                phone number, and location data to connect you with relevant
                veterinary professionals.
              </li>
              <li>
                <strong>Professional Information:</strong> For veterinarians
                and para-professionals, professional certifications, clinic
                details, licensing information, and registration numbers.
              </li>
              <li>
                <strong>Animal & Farm Data:</strong> Species, breed, age,
                medical history, vaccination records, production data, and
                nutritional requirements entered into our tools.
              </li>
              <li>
                <strong>Technical Information:</strong> Device type, operating
                system, IP address, and system logs collected automatically
                when you access our services.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              3. Purpose of Data Collection
            </h2>

            <ul className="list-disc ml-6 space-y-3">
              <li>
                <strong>Service Facilitation:</strong> To connect pet owners
                and livestock farmers with licensed veterinary professionals
                and verified vendors.
              </li>
              <li>
                <strong>Tool Functionality:</strong> To power features such as
                the Feed Calculator and Disease Predictor based on user-provided
                inputs.
              </li>
              <li>
                <strong>Communication:</strong> To send appointment reminders,
                notifications, updates, and essential alerts related to animal
                health and platform usage.
              </li>
              <li>
                <strong>Safety & Verification:</strong> To verify professional
                credentials and prevent fraud, abuse, or unauthorized activity
                on the platform.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              4. Data Processing & Sharing
            </h2>

            <ul className="list-disc ml-6 space-y-3">
              <li>
                <strong>Secure Storage:</strong> All data is stored securely
                and accessible only to authorized personnel with legitimate
                operational need.
              </li>
              <li>
                <strong>No Sale of Data:</strong> Vet Konect does not sell,
                rent, or trade your personal data to third parties.
              </li>
              <li>
                <strong>Limited Sharing:</strong> Information is shared only
                with veterinary professionals or vendors you explicitly choose
                to engage with.
              </li>
              <li>
                <strong>Anonymized Analytics:</strong> We may use aggregated,
                anonymized data for statistical research and improvement of
                animal health services across regions.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              5. Artificial Intelligence & Learning Models
            </h2>

            <p className="mb-4">
              Vet Konect utilizes Artificial Intelligence (AI) technologies to
              enhance livestock productivity and pet care outcomes.
            </p>

            <ul className="list-disc ml-6 space-y-3">
              <li>
                <strong>Functionality:</strong> AI-powered tools such as the
                Disease Predictor and Feed Calculator analyze patterns in the
                data you provide.
              </li>
              <li>
                <strong>Data Usage:</strong> Animal health and farm data may be
                processed to generate recommendations and predictions.
              </li>
              <li>
                <strong>Continuous Improvement:</strong> Our systems may learn
                from anonymized datasets to identify disease trends and optimize
                nutritional recommendations, contributing to improved early
                warning systems.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              6. Cookies & Local Storage
            </h2>

            <p className="mb-4">
              Vet Konect values transparency in digital privacy practices.
            </p>

            <ul className="list-disc ml-6 space-y-3">
              <li>
                <strong>No Cross-Site Tracking:</strong> We do not use cookies
                to track your browsing behavior across external websites or to
                serve third-party targeted advertisements.
              </li>
              <li>
                <strong>Local Storage:</strong> Secure local storage may be
                used solely to maintain login sessions and user preferences so
                that you do not need to re-enter credentials upon each visit.
              </li>
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              7. Your Rights
            </h2>

            <p>
              Depending on applicable data protection regulations, you may have
              the right to request access, correction, deletion, or restriction
              of your personal data. For privacy-related inquiries, users may
              contact Vet Konect through official support channels provided on
              the platform.
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
}