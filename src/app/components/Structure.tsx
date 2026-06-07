import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'motion/react';
import { Building2, MessageCircle, Network, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { ChapterMap } from './ChapterMap';

const stats = [
  { value: 1, label: 'Active Chapter', color: '#ff751f' },
  { value: 4, label: 'Launching Soon', color: '#c1ff72' },
  { value: 2, label: 'Countries', color: '#003a89' },
];

const networkFeatures = [
  {
    icon: Building2,
    title: 'Local Chapters',
    description: 'Independent student groups at high schools, each with their own leadership and focus areas.',
  },
  {
    icon: Network,
    title: 'Shared Resources',
    description: 'Access to collective knowledge base, tools, and learning materials across the network.',
  },
  {
    icon: MessageCircle,
    title: 'Central Community',
    description: 'WhatsApp community connecting all members for collaboration, support, and opportunity sharing.',
  },
];

function CountUp({ to, color }: { to: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <div ref={ref} className="text-7xl md:text-8xl font-extrabold leading-none" style={{ color, fontWeight: 800 }}>
      {value}
    </div>
  );
}

function NetworkFeature({ feature, index }: { feature: typeof networkFeatures[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = feature.icon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-white p-8 rounded-3xl border-2 border-transparent hover:border-[#ff751f] transition-all duration-500 overflow-hidden"
    >
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#ff751f]/0 group-hover:bg-[#ff751f]/10 transition-all duration-500 blur-2xl" />
      <div className="relative">
        <div className="inline-flex p-4 bg-[#003a89] rounded-2xl mb-4 group-hover:rotate-6 transition-transform">
          <Icon className="text-[#c1ff72]" size={32} />
        </div>
        <h3 className="text-xl font-extrabold text-[#0a0a0a] mb-3" style={{ fontWeight: 800 }}>{feature.title}</h3>
        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
      </div>
    </motion.div>
  );
}

export function Structure() {
  return (
    <section id="structure" className="relative py-20 lg:py-32 bg-[#f6f5ef] overflow-hidden">
      <div className="absolute inset-0 sm-grid-bg opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-[#ff751f] text-white rounded-full text-xs font-bold tracking-widest mb-6 uppercase">
            Network Structure
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#0a0a0a] mb-6 leading-[1.05]" style={{ fontWeight: 800 }}>
            A distributed network,
            <br />
            <span className="bg-gradient-to-r from-[#003a89] to-[#3533cd] bg-clip-text text-transparent">a unified mission</span>
          </h2>
          <p className="text-lg text-gray-600">
            SportMetr operates through a decentralised network of high school chapters, connected and supported by our core team through a shared WhatsApp Community.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {networkFeatures.map((feature, index) => (
            <NetworkFeature key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Animated stat counters */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-[#0a0a0a]"
            style={{ fontWeight: 800 }}
          >
            Our reach, by the numbers
          </motion.h3>
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative p-6 md:p-10 rounded-3xl bg-white border-2 border-transparent hover:border-[#003a89] transition-all overflow-hidden text-center"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${stat.color}15 0%, transparent 70%)` }}
                />
                <div className="relative">
                  <CountUp to={stat.value} color={stat.color} />
                  <div className="mt-3 text-xs md:text-sm font-bold uppercase tracking-widest text-gray-600">
                    {stat.label}
                  </div>
                  <div className="mt-4 h-1 w-12 mx-auto rounded-full" style={{ backgroundColor: stat.color }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive chapter map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3
            className="text-3xl md:text-4xl font-extrabold text-center mb-3 text-[#0a0a0a]"
            style={{ fontWeight: 800 }}
          >
            Where we are
          </h3>
          <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
            Hover or tap a pin to see the chapter behind it.
          </p>
          <ChapterMap />
        </motion.div>

        {/* Open a chapter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl p-8 md:p-16 text-white text-center overflow-hidden sm-gradient-animated"
        >
          <div className="absolute inset-0 sm-noise" />
          {/* Floating decorations */}
          <div className="absolute top-8 left-8 w-24 h-24 border-2 border-white/20 rounded-full sm-float-slow pointer-events-none" />
          <div className="absolute bottom-8 right-8 w-32 h-32 border-2 border-[#c1ff72]/40 rotate-45 sm-float pointer-events-none" />
          <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-[#ff751f] rounded-full sm-float pointer-events-none" />

          <div className="relative max-w-3xl mx-auto">
            <Building2 size={56} className="mx-auto mb-6 text-[#c1ff72]" />
            <h3 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ fontWeight: 800 }}>
              Open a chapter at your school
            </h3>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Interested in bringing SportMetr to your high school? Fill out our application form to start a new chapter and join our growing network of student leaders.
            </p>
            <Link
              to="/apply"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[#c1ff72] text-[#0a0a0a] rounded-full font-bold uppercase tracking-wider hover:bg-white transition-all hover:scale-105 shadow-2xl"
            >
              Apply to Start a Chapter
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
