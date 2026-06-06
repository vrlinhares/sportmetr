import { useEffect } from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Structure } from '../components/Structure';
import { ImageBanner } from '../components/ImageBanner';
import { JoinCTA } from '../components/JoinCTA';

export function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Structure />
      <ImageBanner />
      <JoinCTA />
    </>
  );
}
