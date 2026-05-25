import { Profile } from "@/components/account";
import { Metadata } from "next";

const baseUrl = "https://www.vetkonect.com";

export const metadata: Metadata = {
  title: "My Account",
  description:
    "View and manage your account details, settings, and preferences.",
  openGraph: {
    title: "My Account | Vet Konect",
    description:
      "View and manage your account details, settings, and preferences.",
    url: "https://vetkonect.com/dashboard/account",
    images: [{ url: `${baseUrl}/images/og-logo.png` }],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "My Account | Vet Konect",
    description:
      "View and manage your account details, settings, and preferences.",
    images: [`${baseUrl}/images/og-logo.png`],
  },
};

const AccountPage = () => {
  return (
    <div className="w-11/12 mt-3 m-auto">
      <Profile />
    </div>
  );
};

export default AccountPage;
