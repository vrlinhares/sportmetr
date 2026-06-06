import { Link } from 'react-router';

const messages = [
  { icon: '◆', text: 'BRING SPORTMETR TO YOUR SCHOOL' },
  { icon: '●', text: 'OPEN A CHAPTER TODAY' },
  { icon: '▲', text: 'STUDENT-LED · ANALYTICS · STRATEGY' },
  { icon: '◆', text: '5 CHAPTERS · 3 STATES · 2 COUNTRIES' },
  { icon: '★', text: 'THE GAME BEHIND THE GAME' },
];

export function AnnouncementBar() {
  const items = [...messages, ...messages, ...messages];
  return (
    <Link
      to="/apply"
      className="block bg-[#003a89] text-white py-2.5 mt-28 overflow-hidden relative group hover:bg-[#002a69] transition-colors"
    >
      <div className="flex sm-marquee-track whitespace-nowrap will-change-transform">
        {items.map((m, i) => (
          <span key={i} className="flex items-center gap-3 px-6 text-sm font-bold tracking-wider shrink-0">
            <span className="text-[#c1ff72]">{m.icon}</span>
            <span>{m.text}</span>
          </span>
        ))}
      </div>
    </Link>
  );
}
