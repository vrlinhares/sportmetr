import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, MotionValue } from 'motion/react';
import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router';

const floatingWords = [
  { text: 'analytics', color: '#ff751f', x: '8%', y: '18%', size: 'text-4xl', delay: 0, depth: 30 },
  { text: 'strategy', color: '#c1ff72', x: '82%', y: '22%', size: 'text-3xl', delay: 0.4, depth: 40 },
  { text: 'data', color: '#3533cd', x: '12%', y: '70%', size: 'text-5xl', delay: 0.8, depth: 50 },
  { text: 'business', color: '#ff751f', x: '78%', y: '68%', size: 'text-3xl', delay: 1.2, depth: 35 },
  { text: 'performance', color: '#003a89', x: '6%', y: '45%', size: 'text-2xl', delay: 1.6, depth: 25 },
  { text: 'metrics', color: '#c1ff72', x: '85%', y: '48%', size: 'text-2xl', delay: 2.0, depth: 45 },
];

function FloatingWord({ word, mx, my }: { word: typeof floatingWords[number]; mx: MotionValue<number>; my: MotionValue<number> }) {
  const px = useTransform(mx, [-0.5, 0.5], [-word.depth, word.depth]);
  const py = useTransform(my, [-0.5, 0.5], [-word.depth * 0.7, word.depth * 0.7]);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 0.18, scale: 1 }}
      transition={{ delay: word.delay, duration: 1.2, ease: 'easeOut' }}
      style={{ left: word.x, top: word.y, x: px, y: py, color: word.color }}
      className={`absolute font-extrabold tracking-tight ${word.size} pointer-events-none select-none uppercase`}
    >
      {word.text}
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
  const headlines = ['Game Behind the Game', 'Data Behind the Win', 'Code Behind the Court', 'Numbers Behind the Goals'];

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
      {/* Floating sport-business words reacting to cursor */}
      {floatingWords.map((w) => (
        <FloatingWord key={w.text} word={w} mx={smoothX} my={smoothY} />
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
            className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#0a0a0a] leading-[0.95] mb-8 tracking-tight"
            style={{ fontWeight: 800 }}
          >
            Learn the
            <br />
            <span className="relative inline-block overflow-hidden align-bottom" style={{ minHeight: '1.1em' }}>
              <motion.span
                key={headlineIdx}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block bg-gradient-to-r from-[#003a89] via-[#3533cd] to-[#ff751f] bg-clip-text text-transparent"
              >
                {headlines[headlineIdx]}
              </motion.span>
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
              { v: '5', l: 'Chapters' },
              { v: '3', l: 'States' },
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
