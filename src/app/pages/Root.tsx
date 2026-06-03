import { useState } from 'react';
import { Outlet } from 'react-router';
// import { AnnouncementBar } from '../components/AnnouncementBar';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export function Root() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-white">
      {/* <AnnouncementBar /> */}
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <Outlet />
      <Footer />
    </div>
  );
}
