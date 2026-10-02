import { motion } from 'motion/react';
import bannerImage from '../../imports/IMG_7056.JPG';

const tickerWords = ['ANALYTICS', '×', 'STRATEGY', '×', 'BUSINESS', '×', 'TECHNOLOGY', '×', 'DATA', '×', 'PERFORMANCE', '×'];

export function ImageBanner() {
  const items = [...tickerWords, ...tickerWords, ...tickerWords];
  return (
    <section className="relative bg-[#f6f5ef]">
      {/* Top ticker */}
      <div className="bg-[#003a89] text-[#c1ff72] py-4 overflow-hidden border-y-2 border-[#003a89]">
        <div className="flex sm-marquee-track whitespace-nowrap will-change-transform">
          {items.map((w, i) => (
            <span
              key={i}
              className={`px-6 text-2xl md:text-3xl font-extrabold tracking-tight shrink-0 ${w === '×' ? 'text-[#ff751f]' : ''}`}
              style={{ fontWeight: 800 }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      <div className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-[#ff751f] to-[#3533cd] rounded-[36px] blur-2xl opacity-30" />
            <div className="relative overflow-hidden rounded-[36px] shadow-2xl group">
              <motion.img
                src={bannerImage}
                alt="SportMetr Banner"
                className="w-full h-auto"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003a89]/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
