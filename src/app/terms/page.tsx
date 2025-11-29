"use client";

import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Terms & Conditions
      </h1>
      <p className="text-sm text-gray-600 mb-6">Last updated: Nov 26, 2025</p>

      <section className="prose prose-sm max-w-none text-gray-700 mb-6">
        <p>
          Welcome to Vet Konect. These Terms and Conditions govern your use of
          our platform. By using our services, you agree to comply with and be
          bound by these terms. Please read them carefully.
        </p>

        <h3>Using our services</h3>
        <p>
          You may not use our services for unlawful purposes. You are
          responsible for the information you provide and any content you
          upload.
        </p>

        <h3>Promotions & payments</h3>
        <p>
          Ads promotions are provided according to the plans available on our
          platform. Promotion requests are subject to validation and payment as
          described in the product flow.
        </p>

        <h3>Contact</h3>
        <p>
          If you have questions about these terms, please contact our support
          team via the contact page.
        </p>
      </section>

      <div className="mt-6">
        <Link href="/" className="text-primary-600 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
