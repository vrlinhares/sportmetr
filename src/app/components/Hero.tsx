import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, MotionValue } from 'motion/react';
import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router';

type Viz = {
  id: string;
  type: 'shotchart' | 'winprob' | 'radar' | 'table' | 'scatter' | 'strikezone';
  color: string;
  x: string;
  y: string;
  w: number;
  delay: number;
  depth: number;
};

const vizItems: Viz[] = [
  { id: 'shotchart', type: 'shotchart', color: '#ff751f', x: '7%', y: '15%', w: 172, delay: 0, depth: 30 },
  { id: 'winprob', type: 'winprob', color: '#003a89', x: '79%', y: '18%', w: 178, delay: 0.3, depth: 40 },
  { id: 'radar', type: 'radar', color: '#3533cd', x: '11%', y: '66%', w: 142, delay: 0.6, depth: 50 },
  { id: 'table', type: 'table', color: '#003a89', x: '80%', y: '62%', w: 160, delay: 0.9, depth: 35 },
  { id: 'scatter', type: 'scatter', color: '#ff751f', x: '4%', y: '42%', w: 158, delay: 1.2, depth: 25 },
  { id: 'strikezone', type: 'strikezone', color: '#3533cd', x: '87%', y: '44%', w: 118, delay: 1.5, depth: 45 },
];

function VizShape({ type, color }: { type: Viz['type']; color: string }) {
  const svgProps = { width: '100%', style: { display: 'block' as const } };
  switch (type) {
    case 'shotchart':
      // basketball shot chart: half-court with shot locations
      return (
        <svg viewBox="0 0 120 100" {...svgProps}>
          <g stroke={color} strokeWidth="1.5" opacity="0.5" fill="none">
            <rect x="6" y="6" width="108" height="88" rx="2" />
            <rect x="44" y="6" width="32" height="40" />
            <circle cx="60" cy="46" r="11" />
            <path d="M16,6 L16,28 A 44 44 0 0 0 104 28 L104,6" />
            <circle cx="60" cy="14" r="3.5" />
          </g>
          {[[40, 34], [60, 28], [78, 38], [50, 52], [72, 58], [30, 48], [88, 50], [60, 72]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3.5" fill={color} />
          ))}
        </svg>
      );
    case 'winprob':
      // win-probability curve over a gridded chart
      return (
        <svg viewBox="0 0 130 80" {...svgProps}>
          <g stroke={color} strokeWidth="1" opacity="0.3">
            <line x1="12" y1="8" x2="12" y2="72" />
            <line x1="12" y1="72" x2="126" y2="72" />
            <line x1="12" y1="20" x2="126" y2="20" />
            <line x1="12" y1="56" x2="126" y2="56" />
          </g>
          <line x1="12" y1="40" x2="126" y2="40" stroke={color} strokeWidth="1.5" strokeDasharray="2 4" opacity="0.55" />
          <polyline points="12,52 32,44 50,50 68,28 86,34 104,16 126,22" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {[[12, 52], [32, 44], [50, 50], [68, 28], [86, 34], [104, 16], [126, 22]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="2.6" fill={color} />
          ))}
        </svg>
      );
    case 'radar':
      // player attribute radar with concentric rings and spokes
      return (
        <svg viewBox="0 0 100 100" {...svgProps}>
          <g stroke={color} strokeWidth="1" opacity="0.3" fill="none">
            <polygon points="50,14 84,39 71,80 29,80 16,39" />
            <polygon points="50,32 67,45 60,69 40,69 33,45" />
            <line x1="50" y1="50" x2="50" y2="14" />
            <line x1="50" y1="50" x2="84" y2="39" />
            <line x1="50" y1="50" x2="71" y2="80" />
            <line x1="50" y1="50" x2="29" y2="80" />
            <line x1="50" y1="50" x2="16" y2="39" />
          </g>
          <polygon points="50,22 76,41 63,74 37,67 28,46" fill={color} fillOpacity="0.22" stroke={color} strokeWidth="2" />
        </svg>
      );
    case 'table':
      // league standings: ranked rows with points bars
      return (
        <svg viewBox="0 0 120 90" {...svgProps}>
          <line x1="18" y1="6" x2="18" y2="84" stroke={color} strokeWidth="1" opacity="0.3" />
          {[0, 1, 2, 3, 4].map((i) => {
            const y = 14 + i * 16;
            const w = 86 - i * 15;
            return (
              <g key={i}>
                <circle cx="10" cy={y} r="3.2" fill={color} />
                <rect x="24" y={y - 4} width={w} height="8" rx="2" fill={color} fillOpacity="0.5" />
              </g>
            );
          })}
        </svg>
      );
    case 'scatter':
      // correlation scatter with a trend line
      return (
        <svg viewBox="0 0 120 90" {...svgProps}>
          <g stroke={color} strokeWidth="1" opacity="0.3">
            <line x1="12" y1="8" x2="12" y2="80" />
            <line x1="12" y1="80" x2="114" y2="80" />
          </g>
          <line x1="16" y1="72" x2="110" y2="22" stroke={color} strokeWidth="1.5" strokeDasharray="3 5" opacity="0.7" />
          {[[26, 66], [38, 58], [46, 64], [54, 48], [66, 52], [74, 40], [84, 44], [94, 30], [104, 34], [58, 60]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3" fill={color} />
          ))}
        </svg>
      );
    case 'strikezone':
      // baseball pitch-location zone with home plate
      return (
        <svg viewBox="0 0 90 100" {...svgProps}>
          <g stroke={color} strokeWidth="1.5" opacity="0.5" fill="none">
            <rect x="22" y="16" width="46" height="54" />
            <line x1="37.3" y1="16" x2="37.3" y2="70" />
            <line x1="52.6" y1="16" x2="52.6" y2="70" />
            <line x1="22" y1="34" x2="68" y2="34" />
            <line x1="22" y1="52" x2="68" y2="52" />
            <path d="M30,80 L60,80 L60,88 L45,95 L30,88 Z" />
          </g>
          {[[33, 28], [58, 24], [45, 42], [62, 50], [30, 58], [50, 64], [44, 30]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3.2" fill={color} />
          ))}
        </svg>
      );
  }
}

function FloatingViz({ viz, mx, my }: { viz: Viz; mx: MotionValue<number>; my: MotionValue<number> }) {
  const px = useTransform(mx, [-0.5, 0.5], [-viz.depth, viz.depth]);
  const py = useTransform(my, [-0.5, 0.5], [-viz.depth * 0.7, viz.depth * 0.7]);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 0.16, scale: 1 }}
      transition={{ delay: viz.delay, duration: 1.2, ease: 'easeOut' }}
      style={{ left: viz.x, top: viz.y, x: px, y: py, width: viz.w }}
      className="hidden lg:block absolute pointer-events-none select-none"
      aria-hidden
    >
      <VizShape type={viz.type} color={viz.color} />
    </motion.div>
  );
}

function ParallaxOrb({ mx, my, dx, dy, className }: { mx: MotionValue<number>; my: MotionValue<number>; dx: number; dy: number; className: string }) {
  const x = useTransform(mx, [-0.5, 0.5], [-dx, dx]);
  const y = useTransform(my, [-0.5, 0.5], [-dy, dy]);
  return <motion.div style={{ x, y }} className={className} />;
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const [headlineIdx, setHeadlineIdx] = useState(0);
  const headlines = ['Game Behind the Game', 'Data Behind the Win', 'Numbers Behind the Goals'];

  useEffect(() => {
    const id = setInterval(() => setHeadlineIdx((i) => (i + 1) % headlines.length), 3200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - r.left - r.width / 2) / r.width);
      mouseY.set((e.clientY - r.top - r.height / 2) / r.height);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#f6f5ef] sm-grid-bg"
    >
      {/* Floating data illustrations reacting to cursor */}
      {vizItems.map((v) => (
        <FloatingViz key={v.id} viz={v} mx={smoothX} my={smoothY} />
      ))}

      {/* Animated geometric orbs */}
      <ParallaxOrb mx={smoothX} my={smoothY} dx={-40} dy={-40} className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#ff751f]/20 blur-3xl" />
      <ParallaxOrb mx={smoothX} my={smoothY} dx={40} dy={40} className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-[#3533cd]/25 blur-3xl" />
      <ParallaxOrb mx={smoothX} my={smoothY} dx={20} dy={-20} className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-[#c1ff72]/30 blur-3xl" />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#003a89] text-white rounded-full text-sm font-bold mb-8 shadow-lg"
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Zap size={16} fill="#c1ff72" stroke="#c1ff72" />
            </motion.span>
            STUDENT-LED · GLOBAL NETWORK
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#0a0a0a] leading-[0.95] mb-8 tracking-tight"
            style={{ fontWeight: 800 }}
          >
            Learn the
            <br />
            <span className="relative grid">
              {/* Invisible copies of every phrase reserve height for the tallest
                  one at the current width, so the layout never shifts as the text
                  rotates. Applies at all breakpoints (desktop and mobile). */}
              {headlines.map((h) => (
                <span key={h} aria-hidden className="col-start-1 row-start-1 invisible">
                  {h}
                </span>
              ))}
              <span className="col-start-1 row-start-1 overflow-hidden">
                <motion.span
                  key={headlineIdx}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block bg-gradient-to-r from-[#003a89] via-[#3533cd] to-[#ff751f] bg-clip-text text-transparent"
                >
                  {headlines[headlineIdx]}
                </motion.span>
              </span>
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-12"
          >
            SportMetr is a student-led network bridging the gap between sports business, analytics, and technology.
            Join a community of passionate learners exploring the future of sports through collaborative learning and real case studies.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/apply"
              className="group relative px-8 py-4 bg-[#ff751f] text-white rounded-full font-bold flex items-center justify-center gap-2 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#ff751f] via-[#3533cd] to-[#ff751f] bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity sm-gradient-animated" />
              <span className="relative">Open a Chapter</span>
              <ArrowRight size={20} className="relative group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 border-2 border-[#003a89] text-[#003a89] rounded-full font-bold hover:bg-[#003a89] hover:text-[#c1ff72] transition-all"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Live ticker stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 flex items-center justify-center gap-8 md:gap-16 text-[#003a89] flex-wrap"
          >
            {[
              { v: '2', l: 'Active Chapters' },
              { v: '3', l: 'Launching Soon' },
              { v: '2', l: 'Countries' },
            ].map((s, i: number) => (
              <div key={s.l} className="flex items-center gap-3">
                <div className="text-4xl md:text-5xl font-extrabold">{s.v}</div>
                <div className="text-xs uppercase tracking-widest text-gray-600 font-bold">{s.l}</div>
                {i < 2 && <div className="hidden md:block w-px h-12 bg-[#003a89]/20 ml-8" />}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#003a89] text-xs uppercase tracking-widest font-bold flex flex-col items-center gap-2"
      >
        Scroll
        <div className="w-px h-12 bg-gradient-to-b from-[#003a89] to-transparent" />
      </motion.div>
    </section>
  );
}
