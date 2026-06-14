import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Hero from '@/sections/Hero';
import Highlights from '@/sections/Highlights';
import About from '@/sections/About';
import Dashboard from '@/sections/Dashboard';
import Skills from '@/sections/Skills';
import Experience from '@/sections/Experience';
import Achievements from '@/sections/Achievements';
import CurrentFocus from '@/sections/CurrentFocus';
import Projects from '@/sections/Projects';
import Testimonials from '@/sections/Testimonials';
import Certifications from '@/sections/Certifications';
import BlogTeaser from '@/sections/BlogTeaser';
import Contact from '@/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <About />

      <section className="py-2">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-light transition-colors"
          >
            View Full Profile
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Dashboard />
      <Skills />
      <Experience />
      <Achievements />
      <CurrentFocus />
      <Projects />

      <section className="py-2 bg-bg-alt">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-light transition-colors"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Testimonials />
      <Certifications />

      <section className="py-2">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-light transition-colors"
          >
            View All Certifications
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <BlogTeaser />

      <section className="py-2">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-light transition-colors"
          >
            View All Articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Contact />

      <section className="py-2 bg-bg-alt">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-light transition-colors"
          >
            Full Contact Page
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
