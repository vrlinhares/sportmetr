import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowLeft, MessageCircle, Mail, Users, ArrowRight } from 'lucide-react';

const paths = [
  {
    icon: Users,
    title: 'Open a Chapter',
    description: 'Lead SportMetr at your high school. Build a team, run sessions, grow the network.',
    cta: 'Apply',
    href: '/apply',
    accent: '#ff751f',
    internal: true,
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Community',
    description: 'Already an active member? Join the cross-chapter community to collaborate and share opportunities.',
    cta: 'Join',
    href: 'https://chat.whatsapp.com/YOUR_COMMUNITY_LINK',
    accent: '#c1ff72',
    internal: false,
  },
  {
    icon: Mail,
    title: 'Talk to the team',
    description: 'Want to partner, sponsor, or contribute? Send us a note and we will get back to you.',
    cta: 'Email',
    href: 'mailto:sportmetr.team@gmail.com',
    accent: '#3533cd',
    internal: false,
  },
];

export function JoinUs() {
  return (
    <main className="pt-28 min-h-screen bg-[#f6f5ef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#003a89] hover:text-[#002a69] transition-colors font-bold uppercase tracking-wider text-sm"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>

      <section className="relative py-12 lg:py-20 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#c1ff72]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#ff751f]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-[#003a89] text-[#c1ff72] rounded-full text-xs font-bold tracking-widest mb-6 uppercase">
              Get involved
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#0a0a0a] mb-6 leading-[1.05]" style={{ fontWeight: 800 }}>
              Three ways to{' '}
              <span className="bg-gradient-to-r from-[#ff751f] to-[#3533cd] bg-clip-text text-transparent">join us</span>
            </h1>
            <p className="text-lg text-gray-600">
              Whichever you pick, you become part of a movement of students building the future of sports.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {paths.map((p, i) => {
              const Icon = p.icon;
              const content = (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative h-full p-8 rounded-3xl bg-white border-2 border-transparent hover:border-[#003a89] transition-all overflow-hidden"
                >
                  <div
                    className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-500"
                    style={{ backgroundColor: p.accent }}
                  />
                  <div className="relative">
                    <div
                      className="inline-flex p-4 rounded-2xl mb-6 group-hover:rotate-6 transition-transform"
                      style={{ backgroundColor: `${p.accent}25` }}
                    >
                      <Icon size={32} style={{ color: p.accent }} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-2xl font-extrabold text-[#0a0a0a] mb-3" style={{ fontWeight: 800 }}>
                      {p.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{p.description}</p>
                    <div
                      className="inline-flex items-center gap-2 font-extrabold uppercase tracking-wider text-sm"
                      style={{ color: p.accent, fontWeight: 800 }}
                    >
                      {p.cta}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              );
              return p.internal ? (
                <Link key={p.title} to={p.href}>{content}</Link>
              ) : (
                <a key={p.title} href={p.href} target={p.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  {content}
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
