'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Briefcase, Mail, Shield, Award, FolderCheck, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { profile } from '@/data/profile';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

const trustIndicators = [
  { label: 'Years Experience', value: '6+', icon: Shield },
  { label: 'Certifications', value: '8', icon: Award },
  { label: 'Projects', value: '45+', icon: FolderCheck },
  { label: 'Training Courses', value: '10+', icon: GraduationCap },
];

export default function Hero() {
  const [imgError, setImgError] = useState(false);
  const [bgError, setBgError] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary"
    >
      <div className="absolute inset-0">
        {!bgError && (
          <img
            src="https://hqsdmfmiawyxynyciwrx.supabase.co/storage/v1/object/public/profile-images/Background%203.jpeg"
            alt=""
            className="h-full w-full object-cover"
            onError={() => setBgError(true)}
          />
        )}
      </div>

      <div className="absolute inset-0 bg-primary/70 backdrop-brightness-50" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-32 sm:px-6 lg:px-8 lg:grid lg:grid-cols-5 lg:gap-12 lg:items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <div className="mx-auto w-full max-w-sm rounded-xl shadow-2xl overflow-hidden lg:mx-0">
            {imgError ? (
              <span className="flex h-64 w-full items-center justify-center bg-gray-200/20 text-5xl font-bold text-gray-700 sm:h-80 sm:text-6xl">
                GE
              </span>
            ) : (
              <img
                src={profile.profileImage}
                alt={profile.name}
                className="h-64 w-full object-cover sm:h-80"
                onError={() => setImgError(true)}
              />
            )}
          </div>
        </motion.div>

        <div className="mt-10 lg:col-span-3 lg:mt-0 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Hi, I&apos;m {profile.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg leading-relaxed text-accent-light sm:text-xl md:text-2xl"
          >
            Fire Protection Engineer & Emerging Technology Builder
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg lg:max-w-none"
          >
            Helping organizations improve safety, reliability, and operational efficiency
            through engineering expertise and digital innovation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
          >
            <Link href="/projects">
              <Button size="lg" className="min-w-[180px]">
                <Briefcase className="h-5 w-5" />
                View My Work
              </Button>
            </Link>
            <Button
              href={profile.resumeUrl}
              variant="secondary"
              size="lg"
              className="min-w-[180px]"
              onClick={() => trackEvent(AnalyticsEvents.RESUME_DOWNLOAD, { format: 'designed' })}
            >
              <Download className="h-5 w-5" />
              Download Resume
            </Button>
            <Link href="/contact">
              <Button
                variant="ghost"
                size="lg"
                className="min-w-[180px] text-white/70 hover:text-accent hover:bg-bg/10"
              >
                <Mail className="h-5 w-5" />
                Contact Me
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 flex flex-col items-center gap-4 lg:items-start"
          >
            {trustIndicators.map((indicator) => (
              <div key={indicator.label} className="flex items-center gap-2 text-white/80 whitespace-nowrap">
                <indicator.icon className="h-4 w-4 text-accent-light" />
                <span className="text-sm">
                  <strong className="text-white">{indicator.value}</strong>{' '}
                  <span className="text-white/60">{indicator.label}</span>
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex justify-center lg:justify-start"
          >
            <button
              onClick={() => scrollTo('highlights')}
              className="flex animate-bounce items-center justify-center text-white/60 hover:text-white transition-colors"
              aria-label="Scroll down"
            >
              <ArrowDown className="h-6 w-6" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
