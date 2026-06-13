'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Briefcase, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';
import { profile } from '@/data/profile';

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
      {/* Background image */}
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

      {/* Background overlay */}
      <div className="absolute inset-0 bg-primary/70 backdrop-brightness-50" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-32 text-center sm:px-6 lg:px-8">
        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-8 h-40 w-40 overflow-hidden rounded-full border-4 border-white/30 shadow-lg sm:h-48 sm:w-48"
        >
          {imgError ? (
            <span className="flex h-full w-full items-center justify-center bg-gray-200/20 text-4xl font-bold text-gray-700 sm:text-5xl">
              GE
            </span>
          ) : (
            <img
              src={profile.profileImage}
              alt={profile.name}
              className="h-full w-full object-cover"
              onError={() => setImgError(true)}
            />
          )}
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {profile.name}
        </motion.h1>

        {/* Headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-lg leading-relaxed text-white/90 sm:text-xl md:text-2xl"
        >
          {profile.headline}
        </motion.p>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
        >
          Building safer environments through expert fire protection engineering,
          technical excellence, and a commitment to protecting what matters most.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            onClick={() => scrollTo('projects')}
            size="lg"
            className="min-w-[180px]"
          >
            <Briefcase className="h-5 w-5" />
            View Projects
          </Button>
          <Button
            href={profile.resumeUrl}
            variant="outline"
            size="lg"
            className="min-w-[180px] border-white/50 text-white hover:border-accent hover:bg-accent"
          >
            <Download className="h-5 w-5" />
            Download Resume
          </Button>
          <Button
            onClick={() => scrollTo('contact')}
            variant="ghost"
            size="lg"
            className="min-w-[180px] text-white/70 hover:text-accent hover:bg-white/10"
          >
            <Mail className="h-5 w-5" />
            Contact Me
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => scrollTo('highlights')}
          className="mt-16 mx-auto flex animate-bounce items-center justify-center text-white/60 hover:text-white transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDown className="h-6 w-6" />
        </motion.button>
      </div>
    </section>
  );
}
