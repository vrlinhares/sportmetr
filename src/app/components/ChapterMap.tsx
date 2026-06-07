import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';

type Chapter = {
  id: string;
  name: string;
  location: string;
  coords: [number, number]; // [lng, lat]
  status: 'active' | 'launching';
};

const chapters: Chapter[] = [
  {
    id: 'tbsrj',
    name: 'The British School Rio de Janeiro (Barra)',
    location: 'Rio de Janeiro, BRA',
    coords: [-43.3645, -22.9988],
    status: 'active',
  },
  {
    id: 'rio-2',
    name: 'Opening Soon',
    location: 'Rio de Janeiro, BRA',
    coords: [-43.18, -22.90],
    status: 'launching',
  },
  {
    id: 'sao-paulo',
    name: 'Opening Soon',
    location: 'São Paulo, BRA',
    coords: [-46.6333, -23.5505],
    status: 'launching',
  },
  {
    id: 'campinas',
    name: 'Opening Soon',
    location: 'Campinas, BRA',
    coords: [-47.0608, -22.9056],
    status: 'launching',
  },
  {
    id: 'rockville',
    name: 'Opening Soon',
    location: 'Rockville, USA',
    coords: [-77.1528, 39.084],
    status: 'launching',
  },
];

const STATUS_COLORS = {
  active: '#c1ff72',
  launching: '#ff751f',
};

// World topojson hosted on jsdelivr — public, cached
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

function ChapterPin({ chapter, hovered, onHover }: { chapter: Chapter; hovered: string | null; onHover: (id: string | null) => void }) {
  const color = STATUS_COLORS[chapter.status];
  const isHover = hovered === chapter.id;
  return (
    <Marker
      coordinates={chapter.coords}
      onMouseEnter={() => onHover(chapter.id)}
      onMouseLeave={() => onHover(null)}
      style={{ default: { cursor: 'pointer' }, hover: { cursor: 'pointer' }, pressed: { cursor: 'pointer' } }}
    >
      {/* Pulse rings */}
      <motion.circle
        r={4}
        fill={color}
        fillOpacity={0.4}
        animate={{ r: [4, 16], opacity: [0.6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
      />
      <motion.circle
        r={4}
        fill={color}
        fillOpacity={0.4}
        animate={{ r: [4, 16], opacity: [0.6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 1.1 }}
      />
      {/* Dot */}
      <circle
        r={isHover ? 7 : 5}
        fill={color}
        stroke="#003a89"
        strokeWidth={1.8}
        style={{ transition: 'r 0.2s' }}
      />
      {/* Hit area */}
      <circle r={18} fill="transparent" />
    </Marker>
  );
}

export function ChapterMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  const activeCount = chapters.filter((c) => c.status === 'active').length;
  const launchingCount = chapters.filter((c) => c.status === 'launching').length;

  return (
    <div className="relative">
      <div className="grid lg:grid-cols-5 gap-8 items-center">
        {/* Map */}
        <div className="lg:col-span-3 relative">
          <div className="relative rounded-3xl bg-[#003a89] p-4 md:p-6 overflow-hidden">
            {/* Dot grid background */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="dotgrid-map" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.1" fill="#c1ff72" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dotgrid-map)" />
            </svg>

            <div className="relative">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 240,
                  center: [-60, -10],
                }}
                style={{ width: '100%', height: 'auto' }}
              >
                <ZoomableGroup zoom={1} minZoom={1} maxZoom={1}>
                  <Geographies geography={GEO_URL}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const isAmerica = ['Brazil', 'United States of America', 'Mexico', 'Canada', 'Argentina', 'Colombia', 'Peru', 'Venezuela', 'Chile', 'Bolivia', 'Ecuador', 'Paraguay', 'Uruguay', 'Guyana', 'Suriname', 'French Guiana', 'Panama', 'Costa Rica', 'Nicaragua', 'Honduras', 'El Salvador', 'Guatemala', 'Belize', 'Cuba', 'Haiti', 'Dominican Republic', 'Jamaica', 'Bahamas', 'Puerto Rico', 'Trinidad and Tobago', 'Greenland'].includes(geo.properties.name);
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={isAmerica ? '#0a2553' : '#082043'}
                            stroke="#c1ff72"
                            strokeWidth={0.4}
                            strokeOpacity={isAmerica ? 0.7 : 0.25}
                            style={{
                              default: { outline: 'none' },
                              hover: { outline: 'none', fill: isAmerica ? '#0d2d63' : '#082043' },
                              pressed: { outline: 'none' },
                            }}
                          />
                        );
                      })
                    }
                  </Geographies>

                  {chapters.map((c) => (
                    <ChapterPin key={c.id} chapter={c} hovered={hovered} onHover={setHovered} />
                  ))}
                </ZoomableGroup>
              </ComposableMap>
            </div>

            <div className="absolute top-4 right-4 text-[10px] text-[#c1ff72]/60 font-bold tracking-widest uppercase">
              The Americas
            </div>
          </div>
        </div>

        {/* Legend / chapter list */}
        <div className="lg:col-span-2">
          <div className="mb-6 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#c1ff72] border-2 border-[#003a89]" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-600">
                Active ({activeCount})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff751f] border-2 border-[#003a89]" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-600">
                Launching ({launchingCount})
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {chapters.map((c) => {
              const color = STATUS_COLORS[c.status];
              const isHover = hovered === c.id;
              return (
                <motion.button
                  key={c.id}
                  onMouseEnter={() => setHovered(c.id)}
                  onMouseLeave={() => setHovered(null)}
                  whileHover={{ x: 6 }}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                    isHover ? 'bg-white border-[#003a89] shadow-lg' : 'bg-white/70 border-transparent'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: color, boxShadow: isHover ? `0 0 12px ${color}` : 'none' }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      {c.location}
                    </div>
                    <div className="text-sm font-extrabold text-[#0a0a0a] truncate" style={{ fontWeight: 800 }}>
                      {c.name}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hover detail popup */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-6 inline-flex items-center gap-3 px-5 py-3 bg-[#003a89] text-white rounded-full text-sm font-bold"
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: STATUS_COLORS[chapters.find((c) => c.id === hovered)!.status] }}
            />
            {chapters.find((c) => c.id === hovered)?.name}
            <span className="text-white/60 font-normal">·</span>
            <span className="text-[#c1ff72]">{chapters.find((c) => c.id === hovered)?.location}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
