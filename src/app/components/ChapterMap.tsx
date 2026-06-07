import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Chapter = {
  id: string;
  name: string;
  location: string;
  x: number;
  y: number;
  status: 'active' | 'launching';
};

const chapters: Chapter[] = [
  {
    id: 'tbsrj',
    name: 'The British School Rio de Janeiro (Barra)',
    location: 'Rio de Janeiro, BRA',
    x: 420,
    y: 525,
    status: 'active',
  },
  {
    id: 'rio-2',
    name: 'Opening Soon',
    location: 'Rio de Janeiro, BRA',
    x: 432,
    y: 518,
    status: 'launching',
  },
  {
    id: 'sao-paulo',
    name: 'Opening Soon',
    location: 'São Paulo, BRA',
    x: 398,
    y: 540,
    status: 'launching',
  },
  {
    id: 'campinas',
    name: 'Opening Soon',
    location: 'Campinas, BRA',
    x: 388,
    y: 532,
    status: 'launching',
  },
  {
    id: 'rockville',
    name: 'Opening Soon',
    location: 'Rockville, USA',
    x: 245,
    y: 180,
    status: 'launching',
  },
];

const STATUS_COLORS = {
  active: '#c1ff72',
  launching: '#ff751f',
};

// Simplified but recognizable Americas silhouette (stylised, not survey-accurate)
const USA_PATH =
  'M 70 110 L 120 95 L 200 88 L 290 90 L 360 100 L 380 130 L 365 160 L 350 180 L 345 210 L 305 220 L 250 218 L 200 210 L 160 195 L 120 175 L 90 155 Z';
const MEXICO_PATH =
  'M 200 220 L 260 222 L 285 245 L 290 280 L 305 305 L 280 320 L 250 305 L 225 280 L 210 250 Z';
const CENTRAL_PATH =
  'M 305 308 L 335 318 L 348 340 L 330 358 L 310 348 Z';
const BRAZIL_PATH =
  'M 340 410 L 405 388 L 455 400 L 478 430 L 475 475 L 458 515 L 425 548 L 388 555 L 358 540 L 342 510 L 332 470 L 330 435 Z';
const SOUTH_REST_PATH =
  'M 332 425 L 348 470 L 342 525 L 328 575 L 315 615 L 305 595 L 305 545 L 312 490 L 322 450 Z';

function Pin({ chapter, hovered, onHover }: { chapter: Chapter; hovered: string | null; onHover: (id: string | null) => void }) {
  const color = STATUS_COLORS[chapter.status];
  const isHover = hovered === chapter.id;
  return (
    <g
      onMouseEnter={() => onHover(chapter.id)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: 'pointer' }}
    >
      {/* Outer pulse ring */}
      <motion.circle
        cx={chapter.x}
        cy={chapter.y}
        r={6}
        fill={color}
        fillOpacity={0.4}
        animate={{ r: [6, 22], opacity: [0.5, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
      />
      {/* Second pulse (offset) */}
      <motion.circle
        cx={chapter.x}
        cy={chapter.y}
        r={6}
        fill={color}
        fillOpacity={0.4}
        animate={{ r: [6, 22], opacity: [0.5, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 1.1 }}
      />
      {/* Static dot */}
      <circle cx={chapter.x} cy={chapter.y} r={isHover ? 10 : 7} fill={color} stroke="#003a89" strokeWidth={2.5} style={{ transition: 'r 0.2s' }} />
      {/* Hit area */}
      <circle cx={chapter.x} cy={chapter.y} r={24} fill="transparent" />
    </g>
  );
}

export function ChapterMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  const activeCount = chapters.filter((c) => c.status === 'active').length;
  const launchingCount = chapters.filter((c) => c.status === 'launching').length;

  return (
    <div className="relative">
      <div className="grid lg:grid-cols-5 gap-8 items-center">
        {/* Map */}
        <div className="lg:col-span-3 relative">
          <div className="relative rounded-3xl bg-[#003a89] p-6 md:p-10 overflow-hidden border-2 border-[#003a89]">
            {/* Dot grid background */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="dotgrid" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.1" fill="#c1ff72" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dotgrid)" />
            </svg>

            <svg
              viewBox="0 0 600 700"
              xmlns="http://www.w3.org/2000/svg"
              className="relative w-full h-auto"
              style={{ maxHeight: '520px' }}
            >
              {/* Country silhouettes */}
              <g>
                {[USA_PATH, MEXICO_PATH, CENTRAL_PATH, BRAZIL_PATH, SOUTH_REST_PATH].map((d, i) => (
                  <motion.path
                    key={i}
                    d={d}
                    fill="#003a89"
                    stroke="#c1ff72"
                    strokeWidth={1.5}
                    strokeOpacity={0.4}
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: i * 0.15, ease: 'easeInOut' }}
                  />
                ))}
              </g>

              {/* Connection arcs between chapters */}
              {chapters.slice(1).map((c, i) => {
                const from = chapters[0];
                const midX = (from.x + c.x) / 2;
                const midY = (from.y + c.y) / 2 - Math.abs(from.x - c.x) * 0.25;
                const d = `M ${from.x} ${from.y} Q ${midX} ${midY} ${c.x} ${c.y}`;
                return (
                  <motion.path
                    key={c.id}
                    d={d}
                    fill="none"
                    stroke="#c1ff72"
                    strokeWidth={1.2}
                    strokeDasharray="4 6"
                    strokeOpacity={0.5}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.6 + i * 0.2 }}
                  />
                );
              })}

              {/* Pins */}
              {chapters.map((c) => (
                <Pin key={c.id} chapter={c} hovered={hovered} onHover={setHovered} />
              ))}
            </svg>

            {/* Compass label */}
            <div className="absolute top-4 right-4 text-[10px] text-[#c1ff72]/60 font-bold tracking-widest uppercase">
              The Americas
            </div>
          </div>
        </div>

        {/* Legend / chapter list */}
        <div className="lg:col-span-2">
          <div className="mb-6 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#c1ff72] border-2 border-[#003a89]" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-600">
                Active ({activeCount})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff751f] border-2 border-[#003a89]" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-600">
                Launching ({launchingCount})
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {chapters.map((c) => {
              const color = STATUS_COLORS[c.status];
              const isHover = hovered === c.id;
              return (
                <motion.button
                  key={c.id}
                  onMouseEnter={() => setHovered(c.id)}
                  onMouseLeave={() => setHovered(null)}
                  whileHover={{ x: 6 }}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                    isHover ? 'bg-white border-[#003a89] shadow-lg' : 'bg-white/70 border-transparent'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: color, boxShadow: isHover ? `0 0 12px ${color}` : 'none' }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      {c.location}
                    </div>
                    <div className="text-sm font-extrabold text-[#0a0a0a] truncate" style={{ fontWeight: 800 }}>
                      {c.name}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hover detail popup */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-6 inline-flex items-center gap-3 px-5 py-3 bg-[#003a89] text-white rounded-full text-sm font-bold"
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: STATUS_COLORS[chapters.find((c) => c.id === hovered)!.status] }}
            />
            {chapters.find((c) => c.id === hovered)?.name}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
