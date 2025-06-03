import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Features } from '@/components/sections/Features';
import { Consultants } from '@/components/sections/Consultants';
import { Expertise } from '@/components/sections/Expertise';
import { AIMatching } from '@/components/sections/AIMatching';
import { CTA } from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'MatchKin Redesigned',
  description: 'AI-powered matching for seamless collaboration. Find the perfect fit for your consulting needs.',
};

// Enable static generation for optimal performance
export const dynamic = 'force-static';
export const revalidate = false;

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Header />
      <Hero />
      <About />
      <Features />
      <Consultants />
      <Expertise />
      <AIMatching />
      <CTA />
      <Footer />
    </main>
  );
}
