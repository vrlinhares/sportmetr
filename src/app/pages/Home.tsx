import { useEffect } from 'react';
import { Hero } from '../components/Hero';
import { ImageBanner } from '../components/ImageBanner';
import { SummitNotice } from '../components/SummitNotice';
import { JoinCTA } from '../components/JoinCTA';

export function Home() {
  // Scroll to section if hash is present in URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.substring(1); // Remove the '#'
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100); // Small delay to ensure DOM is ready
    }
  }, []);

  return (
    <>
      <SummitNotice />
      <Hero />
      <ImageBanner />
      <JoinCTA />
    </>
  );
}
