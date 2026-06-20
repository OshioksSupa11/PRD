'use client';

import { useEffect, useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import CertificationCard from '@/components/ui/CertificationCard';
import FadeInSection from '@/components/shared/FadeInSection';
import { certifications as fallbackCerts } from '@/data/certifications';

export default function Certifications() {
  const [certifications, setCertifications] = useState(fallbackCerts);
  useEffect(() => {
    fetch('/api/admin/certifications')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setCertifications(data.map(c => ({
            ...c,
            issueDate: c.issue_date || '',
            certificateUrl: c.certificate_url,
            imageUrl: c.image_url,
            verificationUrl: c.verification_url,
            skillTags: c.skill_tags || []
          })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="certifications" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <SectionHeading
            overline="Credentials"
            title="Professional Certifications"
            subtitle="Industry-recognized certifications demonstrating expertise and commitment to professional development."
          />
        </FadeInSection>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert, i) => (
            <FadeInSection key={cert.id} delay={i * 0.05}>
              <CertificationCard certification={cert} />
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
