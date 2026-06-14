import Hero from '@/sections/Hero';
import Highlights from '@/sections/Highlights';
import About from '@/sections/About';
import Dashboard from '@/sections/Dashboard';
import Skills from '@/sections/Skills';
import Experience from '@/sections/Experience';
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
      <Dashboard />
      <Skills />
      <Experience />
      <CurrentFocus />
      <Projects />
      <Testimonials />
      <Certifications />
      <BlogTeaser />
      <Contact />
    </>
  );
}
