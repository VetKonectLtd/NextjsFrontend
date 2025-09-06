'use client';

import { Profile } from '@/components/account';

const AccountPage = () => {
  // Default to vet profile - you can change this based on user authentication/role
  return <Profile userRole="vet" />;
};

export default AccountPage;