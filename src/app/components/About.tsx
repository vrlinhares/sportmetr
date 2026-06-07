import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { BookOpen, Globe, Lightbulb, Target } from 'lucide-react';
import vitorImage from '../../imports/IMG_3898__2_.png';
import guilhermeImage from '../../imports/3ee4c89b-72f0-43ae-a255-7628a343b403.jpg';

const features = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'Empowering students to explore the intersection of sports business, analytics, and technology through collaborative learning and the exploration of real case studies.',
    accent: '#ff751f',
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Connect with like-minded students across multiple chapters and regions, sharing ideas, experiences, and opportunities.',
    accent: '#c1ff72',
  },
  {
    icon: BookOpen,
    title: 'Continuous Learning',
    description: 'Engage in learning through ongoing club sessions, discussing solutions to industry problems and investigating real-world concepts.',
    accent: '#3533cd',
  },
  {
    icon: Lightbulb,
    title: 'Beyond The Data',
    description: 'Understand how context, decision-making, and human factors shape outcomes in sports, including how data is interpreted and translated into strategic choices.',
    accent: '#003a89',
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hover, setHover] = useState(false);
  const Icon = feature.icon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative p-8 rounded-3xl bg-[#f6f5ef] border-2 border-[#003a89]/10 hover:border-[#003a89] transition-all duration-500 cursor-default overflow-hidden group sm-hover-tilt"
    >
      <motion.div
        animate={{ scale: hover ? 8 : 1, opacity: hover ? 0.08 : 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-8 left-8 w-16 h-16 rounded-full"
        style={{ backgroundColor: feature.accent }}
      />

      <div className="relative">
        <motion.div
          animate={{ rotate: hover ? 360 : 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="mb-6 inline-flex p-4 rounded-2xl"
          style={{ backgroundColor: `${feature.accent}25` }}
        >
          <Icon size={32} style={{ color: feature.accent }} />
        </motion.div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold tracking-widest text-gray-400">0{index + 1}</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <h3 className="text-2xl font-extrabold text-[#0a0a0a] mb-3" style={{ fontWeight: 800 }}>
          {feature.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
      </div>
    </motion.div>
  );
}

function Founder({ name, role, image, scale }: { name: string; role: string; image: string; scale?: number }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      whileHover={{ y: -8 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="text-center group"
    >
      <div className="relative inline-block mb-4">
        <motion.div
          animate={{ rotate: hover ? 6 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute -inset-2 bg-gradient-to-br from-[#ff751f] via-[#003a89] to-[#3533cd] rounded-full blur-md opacity-60"
        />
        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-[#f6f5ef] shadow-2xl">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            style={scale ? { transform: `scale(${scale}) translateX(12px)` } : undefined}
          />
        </div>
      </div>
      <h4 className="text-xl font-extrabold text-[#0a0a0a]" style={{ fontWeight: 800 }}>{name}</h4>
      <p className="text-gray-600 text-sm uppercase tracking-wider mt-1">{role}</p>
    </motion.div>
  );
}

export function About() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="about" className="relative py-20 lg:py-32 bg-[#f6f5ef] overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-[#c1ff72]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#ff751f]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-[#003a89] text-[#c1ff72] rounded-full text-xs font-bold tracking-widest mb-6 uppercase">
            <span className="w-2 h-2 bg-[#c1ff72] rounded-full animate-pulse" />
            About SportMetr
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#0a0a0a] mb-6 leading-[1.05]" style={{ fontWeight: 800 }}>
            Building the future of sports through{' '}
            <span className="inline-block">
              <span className="bg-gradient-to-r from-[#ff751f] to-[#3533cd] bg-clip-text text-transparent">business and data</span>
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            SportMetr is a community making sports analytics education more accessible, helping students understand the industry and see a place for themselves in it.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>

        {/* Founders */}
        <div className="text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-[#0a0a0a] mb-3"
            style={{ fontWeight: 800 }}
          >
            Our Founders
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 mb-12 uppercase tracking-widest text-sm"
          >
            The team behind the movement
          </motion.p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-20 mb-20">
            <Founder name="Vitor Linhares" role="Co-Founder · Head of Expansion" image={vitorImage} />
            <Founder name="Guilherme Cavalcanti" role="Co-Founder · Lead Content Organiser" image={guilhermeImage} scale={1.75} />
          </div>

          {/* Origin Story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-left"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#003a89]/10 text-[#003a89] rounded-full text-xs font-bold tracking-widest mb-6 uppercase">
              How it started
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              SportMetr started in 2024 as a single sports business and analytics club at our school. Watching classmates spend class time on betting apps, we wanted to share our passion for the statistical side of sports by converting their energy into productive interests and market-demanded skills. Starting in 2026, we are expanding into a network so that more students are able to share these opportunities with their classmates and beyond.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
