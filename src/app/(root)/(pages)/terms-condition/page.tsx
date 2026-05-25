import Footer from "@/components/shared/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Read our terms and conditions to understand your rights and responsibilities.",
  openGraph: {
    title: "Terms and Conditions | Vet Konect",
    description:
      "Read our terms and conditions to understand your rights and responsibilities.",
    url: "https://vetkonect.com/terms",
    images: [{ url: "https://www.vetkonect.com/images/og-logo.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms and Conditions | Vet Konect",
    description:
      "Read our terms and conditions to understand your rights and responsibilities.",
    images: [`https://www.vetkonect.com/images/og-logo.png`],
  },
};

export default function TermsAndConditions() {
  return (
    <div className="bg-gray-50 py-6 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-14 border-b pb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Vet Konect User Policy & Terms of Service
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Welcome to Vet Konect. These Terms of Service ("Terms") govern your
            access to and use of the Vet Konect platform. By accessing,
            registering, or using our services, you acknowledge that you have
            read, understood, and agreed to be legally bound by these Terms.
          </p>

          <p className="text-sm text-gray-500 mt-4">
            Last Updated: {new Date().getFullYear()}
          </p>
        </div>

        <div className="space-y-16 text-gray-700 leading-relaxed text-[15px]">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              1. Professional Disclaimer & No-Emergency Clause
            </h2>

            <p className="mb-4">
              Vet Konect is a digital marketplace and facilitation platform
              designed to connect animal owners with licensed veterinary
              professionals and verified vendors. The platform provides access
              to telemedicine and consultative advisory services only.
            </p>

            <p className="mb-4">
              Vet Konect does not replace physical veterinary clinics,
              hospitals, or emergency facilities. Users experiencing animal
              health emergencies must immediately seek in-person veterinary
              care.
            </p>

            <p>
              <strong>Veterinarian-Client-Patient Relationship (VCPR):</strong>{" "}
              In accordance with the Veterinary Surgeons Act and the Veterinary
              Council of Nigeria (VCN), a formal VCPR typically requires a
              physical examination of the animal. Digital consultations provided
              through this platform are advisory in nature and do not establish
              a formal VCPR unless the practitioner has previously conducted an
              in-person examination.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">
              2. User Roles & Responsibilities
            </h2>

            <div className="space-y-10">
              {/* Veterinarians */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  2.1 Veterinarians
                </h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    Must maintain valid and current registration with the
                    Veterinary Council of Nigeria (VCN) or equivalent national
                    regulatory authority.
                  </li>
                  <li>
                    Are solely responsible for the medical advice, diagnoses,
                    and recommendations they provide.
                  </li>
                  <li>
                    Must maintain appropriate professional indemnity insurance.
                  </li>
                </ul>
              </div>

              {/* VPPs */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  2.2 Veterinary Para-Professionals (VPPs)
                </h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    Must operate strictly within the scope of practice defined
                    by the VCN for their qualification.
                  </li>
                  <li>
                    Are expressly prohibited from conducting independent
                    surgeries or issuing definitive medical diagnoses outside
                    their legal scope.
                  </li>
                </ul>
              </div>

              {/* Pet Owners */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  2.3 Pet Owners
                </h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    Must provide accurate and complete medical and vaccination
                    histories for their animals.
                  </li>
                  <li>
                    Acknowledge that digital advice is followed at their own
                    risk.
                  </li>
                  <li>
                    Must seek immediate physical veterinary care when advised by
                    a professional.
                  </li>
                </ul>
              </div>

              {/* Livestock Farmers */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  2.4 Livestock Farmers
                </h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Must maintain accurate herd or flock health records.</li>
                  <li>
                    Are responsible for implementing professional advice
                    appropriately.
                  </li>
                  <li>
                    Must report suspected disease outbreaks to qualified
                    professionals or relevant authorities without delay.
                  </li>
                  <li>
                    Acknowledge that the platform provides advisory services and
                    does not replace in-person veterinary supervision.
                  </li>
                </ul>
              </div>

              {/* Vendors */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  2.5 Vendors
                </h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    Must ensure all products comply with relevant regulatory
                    authorities (including NAFDAC and SON where applicable).
                  </li>
                  <li>
                    Are solely responsible for product quality, authenticity,
                    and regulatory compliance.
                  </li>
                  <li>
                    The sale of banned, expired, counterfeit, or unregistered
                    products is strictly prohibited and will result in immediate
                    account termination.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              3. Independent Contractors & Limitation of Liability
            </h2>

            <p className="mb-4">
              Veterinarians, Veterinary Para-Professionals, and Vendors using
              the platform operate as independent contractors. They are not
              employees, agents, or representatives of Vet Konect.
            </p>

            <p>
              Vet Konect acts solely as a facilitator of connections between
              users. We are not liable for misdiagnosis, treatment failure,
              livestock loss, professional negligence, or defective products.
              Any claims arising from professional services or product sales
              must be directed to the responsible practitioner or vendor.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              4. Financial Terms
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                Payments are processed through secure third-party payment
                gateways (e.g., Paystack).
              </li>
              <li>
                Vet Konect charges a platform service fee for facilitating
                consultations and marketplace transactions.
              </li>
              <li>
                Refunds are only granted in cases of verified technical platform
                failure that prevented service delivery. Dissatisfaction with
                medical advice does not qualify for a refund.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              5. Prohibited Conduct & Professional Verification
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                All animal health professionals must provide valid VCN
                registration numbers.
              </li>
              <li>
                Vet Konect reserves the right to suspend or terminate accounts
                suspected of operating without proper licensure or outside their
                lawful scope of practice.
              </li>
              <li>
                The platform does not facilitate the distribution of controlled
                substances to unauthorized persons.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              6. Data Privacy & NDPR Compliance
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                Digital consultations (text, audio, or video) may be recorded
                and securely stored for medical record-keeping and quality
                assurance.
              </li>
              <li>
                Livestock disease data may be shared with relevant government
                authorities where required for mandatory outbreak reporting.
              </li>
              <li>
                We implement industry-standard encryption and security measures
                to protect personal and financial information in compliance with
                the Nigeria Data Protection Regulation (NDPR).
              </li>
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              7. Acceptance of Terms
            </h2>
            <p>
              By clicking “I Agree,” registering an account, or using the Vet
              Konect platform, you confirm that you have read, understood, and
              agreed to be legally bound by this User Policy & Terms of Service.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
