'use client';

import { AboutSection, OurValuesSection, AreaCoveredSection, TeamMembersSection } from '@/components/aboutComponents';
import { Footer } from '@/components/shared';
import React from 'react';

export default function AboutPage() {
  return (
    <div className=" bg-white">
      {/* About Section */}
      <AboutSection />

      {/* Our Values Section */}
      <OurValuesSection />

      {/* Area Covered Section */}
      <AreaCoveredSection />

      {/* Team Members Section */}
      <TeamMembersSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
