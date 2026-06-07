import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export function JoinCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const fireConfetti = () => {
    const colors = ['#ff751f', '#c1ff72', '#003a89', '#3533cd'];
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
      colors,
    });
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
    });
  };

  const handleJoinClick = () => {
    fireConfetti();
    setTimeout(() => {
      window.open('https://chat.whatsapp.com/YOUR_COMMUNITY_LINK', '_blank');
    }, 400);
  };

  return (
    <section id="join" className="relative py-20 lg:py-32 bg-[#f6f5ef] overflow-hidden">
      <div className="absolute inset-0 sm-grid-bg opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative rounded-[40px] p-8 md:p-16 overflow-hidden bg-[#003a89] text-white"
          >
            <div className="absolute inset-0 sm-noise" />
            {/* Floating shapes — hidden on mobile to avoid text overlap */}
            <div className="hidden md:block absolute -top-12 -right-12 w-48 h-48 bg-[#c1ff72]/20 rounded-full blur-3xl sm-float-slow pointer-events-none" />
            <div className="hidden md:block absolute -bottom-12 -left-12 w-56 h-56 bg-[#ff751f]/20 rounded-full blur-3xl sm-float pointer-events-none" />
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="hidden md:block absolute top-12 right-12 w-20 h-20 border-2 border-[#c1ff72]/40 pointer-events-none"
              style={{ borderRadius: '30%' }}
            />

            <div className="relative text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={inView ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
                className="inline-flex p-5 bg-[#c1ff72] rounded-3xl mb-8 shadow-2xl"
              >
                <MessageCircle className="text-[#003a89]" size={48} strokeWidth={2.5} />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl md:text-6xl font-extrabold mb-4 leading-[1.05]"
                style={{ fontWeight: 800 }}
              >
                Join the
                <br />
                <span className="text-[#c1ff72]">WhatsApp Community</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed"
              >
                Already active in SportMetr? Connect with members from all chapters, stay updated on network-wide events, and collaborate on projects.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleJoinClick}
                className="group relative px-10 py-5 bg-[#c1ff72] text-[#003a89] rounded-full text-lg font-extrabold uppercase tracking-wider inline-flex items-center gap-3 shadow-2xl overflow-hidden"
                style={{ fontWeight: 800 }}
              >
                <span className="absolute inset-0 sm-shimmer" />
                <Sparkles size={22} className="relative" />
                <span className="relative">Join Community</span>
                <ArrowRight size={22} className="relative group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 }}
                className="text-sm text-white/60 mt-6 uppercase tracking-widest"
              >
                For active SportMetr members only
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
