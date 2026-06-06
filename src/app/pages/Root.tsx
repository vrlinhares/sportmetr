import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { AnnouncementBar } from '../components/AnnouncementBar';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

export function Root() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-[#f6f5ef]">
      <ScrollToTop />
      <AnnouncementBar />
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <Outlet />
      <Footer />
    </div>
  );
}
