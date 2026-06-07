import { Mail, UserPlus, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import logo from '../../imports/GC_Banner_(3).png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#003a89] text-white overflow-hidden">
      <div className="absolute inset-0 sm-noise" />

      {/* Decorative floating shapes */}
      <div className="absolute top-12 right-12 w-32 h-32 border-2 border-[#c1ff72]/30 rounded-full sm-float-slow pointer-events-none" />
      <div className="absolute bottom-12 left-12 w-24 h-24 border-2 border-[#ff751f]/40 rotate-45 sm-float pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src={logo} alt="SportMetr" className="h-28 w-auto mb-6 mx-auto" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/70 leading-relaxed mb-10 max-w-2xl mx-auto text-lg"
          >
            A student-led network bridging sports business, analytics, and technology.
            Building the future of sports through collaborative learning.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="mailto:sportmetr.team@gmail.com"
              className="group px-8 py-4 bg-[#c1ff72] hover:bg-white text-[#003a89] rounded-full font-extrabold uppercase tracking-wider transition-all hover:scale-105 inline-flex items-center gap-3"
              style={{ fontWeight: 800 }}
            >
              <Mail size={20} />
              Email Us
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <Link
              to="/join"
              className="group px-8 py-4 bg-[#ff751f] hover:bg-white hover:text-[#003a89] text-white rounded-full font-extrabold uppercase tracking-wider transition-all hover:scale-105 inline-flex items-center gap-3"
              style={{ fontWeight: 800 }}
            >
              <UserPlus size={20} />
              Join Us
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Big brand wordmark */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.08 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-center py-8 select-none"
        >
          <div className="text-[3rem] sm:text-[5rem] md:text-[8rem] lg:text-[12rem] font-extrabold leading-none tracking-tighter text-[#c1ff72] break-all" style={{ fontWeight: 800 }}>
            SPORTMETR
          </div>
        </motion.div>

        {/* Bottom row */}
        <div className="border-t border-white/15 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {currentYear} SportMetr. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm uppercase tracking-wider">
              <a href="#" className="text-white/60 hover:text-[#c1ff72] transition-colors font-bold">
                Privacy
              </a>
              <a href="#" className="text-white/60 hover:text-[#c1ff72] transition-colors font-bold">
                Terms
              </a>
              <a href="#" className="text-white/60 hover:text-[#c1ff72] transition-colors font-bold">
                Code of Conduct
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
