import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, MotionValue } from 'motion/react';
import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router';

type Viz = {
  id: string;
  type: 'formation' | 'shotmap' | 'radar' | 'heatmap' | 'network' | 'freekick';
  color: string;
  x: string;
  y: string;
  w: number;
  delay: number;
  depth: number;
};

const vizItems: Viz[] = [
  { id: 'formation', type: 'formation', color: '#003a89', x: '7%', y: '16%', w: 165, delay: 0, depth: 30 },
  { id: 'shotmap', type: 'shotmap', color: '#ff751f', x: '80%', y: '19%', w: 160, delay: 0.3, depth: 40 },
  { id: 'radar', type: 'radar', color: '#3533cd', x: '11%', y: '66%', w: 140, delay: 0.6, depth: 50 },
  { id: 'heatmap', type: 'heatmap', color: '#ff751f', x: '79%', y: '63%', w: 165, delay: 0.9, depth: 35 },
  { id: 'network', type: 'network', color: '#003a89', x: '5%', y: '42%', w: 150, delay: 1.2, depth: 25 },
  { id: 'freekick', type: 'freekick', color: '#3533cd', x: '86%', y: '45%', w: 135, delay: 1.5, depth: 45 },
];

function VizShape({ type, color }: { type: Viz['type']; color: string }) {
  const svgProps = { width: '100%', style: { display: 'block' as const } };
  switch (type) {
    case 'formation':
      // tactics board: pitch with a formation of players
      return (
        <svg viewBox="0 0 120 90" {...svgProps}>
          <g stroke={color} strokeWidth="1.5" opacity="0.5" fill="none">
            <rect x="4" y="4" width="112" height="82" rx="3" />
            <line x1="60" y1="4" x2="60" y2="86" />
            <circle cx="60" cy="45" r="12" />
            <rect x="4" y="28" width="14" height="34" />
            <rect x="102" y="28" width="14" height="34" />
          </g>
          {[[14, 45], [32, 20], [32, 45], [32, 70], [58, 30], [58, 60], [86, 45]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="4" fill={color} />
          ))}
        </svg>
      );
    case 'shotmap':
      // shots taken toward the goal, with one trajectory
      return (
        <svg viewBox="0 0 120 90" {...svgProps}>
          <path d="M24,34 L24,10 L96,10 L96,34" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
          <g stroke={color} strokeWidth="1" opacity="0.35">
            <line x1="42" y1="10" x2="42" y2="34" />
            <line x1="60" y1="10" x2="60" y2="34" />
            <line x1="78" y1="10" x2="78" y2="34" />
            <line x1="24" y1="22" x2="96" y2="22" />
          </g>
          {[[46, 60], [64, 74], [82, 56], [56, 50], [92, 68], [34, 70]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="4.5" fill={color} />
          ))}
          <path d="M64,74 C 78,56 88,34 92,14" fill="none" stroke={color} strokeWidth="2" strokeDasharray="3 6" strokeLinecap="round" opacity="0.85" />
        </svg>
      );
    case 'radar':
      // player attribute radar
      return (
        <svg viewBox="0 0 100 100" {...svgProps}>
          <polygon points="50,8 90,38 74,86 26,86 10,38" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
          <polygon points="50,24 74,42 64,72 34,66 26,44" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="2.5" />
        </svg>
      );
    case 'heatmap':
      // positional heatmap over a pitch
      return (
        <svg viewBox="0 0 120 80" {...svgProps}>
          <defs>
            <radialGradient id="vizHeat">
              <stop offset="0%" stopColor={color} stopOpacity="0.9" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </radialGradient>
          </defs>
          <g stroke={color} strokeWidth="1.5" opacity="0.5" fill="none">
            <rect x="4" y="4" width="112" height="72" rx="3" />
            <line x1="60" y1="4" x2="60" y2="76" />
            <circle cx="60" cy="40" r="11" />
          </g>
          <circle cx="42" cy="46" r="26" fill="url(#vizHeat)" />
          <circle cx="76" cy="30" r="30" fill="url(#vizHeat)" />
          <circle cx="92" cy="56" r="18" fill="url(#vizHeat)" />
        </svg>
      );
    case 'network':
      // passing network
      return (
        <svg viewBox="0 0 120 100" {...svgProps}>
          <g stroke={color} strokeWidth="2" opacity="0.55">
            <line x1="18" y1="78" x2="46" y2="40" />
            <line x1="46" y1="40" x2="78" y2="60" />
            <line x1="46" y1="40" x2="86" y2="20" />
            <line x1="78" y1="60" x2="104" y2="80" />
            <line x1="18" y1="78" x2="78" y2="60" />
          </g>
          {[[18, 78], [46, 40], [78, 60], [86, 20], [104, 80]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="6" fill={color} />
          ))}
        </svg>
      );
    case 'freekick':
      // bending ball trajectory into the top corner
      return (
        <svg viewBox="0 0 120 80" {...svgProps}>
          <path d="M96,8 L112,8 L112,26" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
          <path d="M20,64 C 44,66 84,44 104,16" fill="none" stroke={color} strokeWidth="2.5" strokeDasharray="3 6" strokeLinecap="round" />
          <circle cx="20" cy="64" r="8" fill="none" stroke={color} strokeWidth="2.5" />
          <path d="M20,59 L24,62 L22,67 L18,67 L16,62 Z" fill={color} />
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
