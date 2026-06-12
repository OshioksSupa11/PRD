import SectionHeading from '@/components/ui/SectionHeading';
import CertificationCard from '@/components/ui/CertificationCard';
import FadeInSection from '@/components/shared/FadeInSection';
import { certifications } from '@/data/certifications';

export default function Certifications() {
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
