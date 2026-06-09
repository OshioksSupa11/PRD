import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import ContactForm from '@/components/ui/ContactForm';
import FadeInSection from '@/components/shared/FadeInSection';
import { profile } from '@/data/profile';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone}`,
  },
  {
    icon: Globe,
    label: 'LinkedIn',
    value: 'Connect on LinkedIn',
    href: profile.linkedinUrl,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 bg-bg-alt">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <SectionHeading
            overline="Get In Touch"
            title="Let&apos;s Work Together"
            subtitle="Have a project in mind or want to discuss opportunities? I'd love to hear from you."
          />
        </FadeInSection>

        <div className="mt-16 grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Contact Info */}
          <FadeInSection className="lg:col-span-2" delay={0.1}>
            <div className="rounded-xl border border-border bg-white p-8">
              <h3 className="text-lg font-bold text-primary">
                Contact Information
              </h3>
              <p className="mt-2 text-sm text-text-muted">
                Feel free to reach out through any of the channels below. I typically
                respond within 24 hours.
              </p>

              <div className="mt-8 space-y-6">
                {contactMethods.map((method) => (
                  <a
                    key={method.label}
                    href={method.href}
                    target={method.label === 'LinkedIn' ? '_blank' : undefined}
                    rel={
                      method.label === 'LinkedIn'
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="flex items-center gap-4 group"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 transition-colors group-hover:bg-accent/20">
                      <method.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
                        {method.label}
                      </span>
                      <span className="text-sm font-medium text-text group-hover:text-accent transition-colors">
                        {method.value}
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Location */}
              <div className="mt-8 border-t border-border pt-6">
                <div className="flex items-center gap-3 text-sm text-text-muted">
                  <MapPin className="h-4 w-4 text-accent" />
                  Lagos, Nigeria
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* Contact Form */}
          <FadeInSection className="lg:col-span-3" delay={0.2}>
            <div className="rounded-xl border border-border bg-white p-8">
              <h3 className="text-lg font-bold text-primary">
                Send a Message
              </h3>
              <p className="mt-2 text-sm text-text-muted">
                Fill out the form below and I will get back to you as soon as possible.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
