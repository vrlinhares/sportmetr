import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowUpRight, Compass, Network as NetworkIcon } from 'lucide-react';

const previews = [
  {
    icon: Compass,
    label: 'About SportMetr',
    title: 'The mission, the people, the why',
    description: 'How we make sports analytics education accessible — and the founders behind the movement.',
    href: '/about',
    accent: '#ff751f',
  },
  {
    icon: NetworkIcon,
    label: 'Our Network',
    title: '1 active chapter, 4 launching, 2 countries',
    description: 'A decentralised network of high school chapters, connected by a shared community and a single mission.',
    href: '/network',
    accent: '#3533cd',
  },
];

export function SectionPreviews() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#f6f5ef] overflow-hidden">
      <div className="absolute inset-0 sm-grid-bg opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          {previews.map((p, i) => {
            const Icon = p.icon;
            return (
              <Link key={p.title} to={p.href} className="block group">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="relative h-full p-8 md:p-10 rounded-3xl bg-white border-2 border-transparent hover:border-[#003a89] transition-all overflow-hidden"
                >
                  <div
                    className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-0 group-hover:opacity-25 blur-3xl transition-opacity duration-500"
                    style={{ backgroundColor: p.accent }}
                  />

                  <div className="relative flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-5">
                        <div
                          className="inline-flex p-3 rounded-2xl group-hover:rotate-6 transition-transform"
                          style={{ backgroundColor: `${p.accent}25` }}
                        >
                          <Icon size={24} style={{ color: p.accent }} strokeWidth={2.5} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{p.label}</span>
                      </div>

                      <h3
                        className="text-3xl md:text-4xl font-extrabold text-[#0a0a0a] mb-4 leading-[1.1]"
                        style={{ fontWeight: 800 }}
                      >
                        {p.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6 max-w-md">{p.description}</p>

                      <div
                        className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider"
                        style={{ color: p.accent, fontWeight: 800 }}
                      >
                        Explore
                        <ArrowUpRight
                          size={16}
                          className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
