'use client';

import { AboutSection, OurValuesSection, AreaCoveredSection, TeamMembersSection, ContactSection } from '@/components/aboutComponents';
import { Footer } from '@/components/shared';
import React from 'react';

export default function AboutPage() {
  return (
    <div className=" bg-white overflow-hidden">
      {/* About Section */}
      <AboutSection />

      {/* Our Values Section */}
      <OurValuesSection />

      {/* Area Covered Section */}
      <AreaCoveredSection />

      {/* Team Members Section */}
      <TeamMembersSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
