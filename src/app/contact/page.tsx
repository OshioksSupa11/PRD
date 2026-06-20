import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MessageCircle, MapPin, Globe } from 'lucide-react';
import ContactForm from '@/components/ui/ContactForm';
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
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Chat on WhatsApp',
    href: `https://wa.me/${profile.whatsappNumber.replace(/\D/g, '')}`,
  },
  {
    icon: Globe,
    label: 'LinkedIn',
    value: 'Connect on LinkedIn',
    href: profile.linkedinUrl,
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-primary pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Get In Touch
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-border bg-bg p-8">
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
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
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

                <div className="mt-8 border-t border-border pt-6">
                  <div className="flex items-center gap-3 text-sm text-text-muted">
                    <MapPin className="h-4 w-4 text-accent" />
                    Imo, Nigeria
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-xl border border-border bg-bg p-8">
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
