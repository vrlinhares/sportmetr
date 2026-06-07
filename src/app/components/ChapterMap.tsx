import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { Plus, Minus, RotateCcw } from 'lucide-react';

type Chapter = {
  id: string;
  name: string;
  location: string;
  coords: [number, number];
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

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const DEFAULT_ZOOM = 1;
const DEFAULT_CENTER: [number, number] = [-60, -10];

function ChapterPin({
  chapter,
  selected,
  onSelect,
  inverseScale,
}: {
  chapter: Chapter;
  selected: string | null;
  onSelect: (id: string | null) => void;
  inverseScale: number;
}) {
  const color = STATUS_COLORS[chapter.status];
  const isSelected = selected === chapter.id;

  // counter-scale so pin and popup stay constant size regardless of zoom
  const s = inverseScale;

  return (
    <Marker coordinates={chapter.coords}>
      <g style={{ transform: `scale(${s})`, transformOrigin: '0 0' }}>
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
          r={isSelected ? 8 : 5}
          fill={color}
          stroke="#003a89"
          strokeWidth={1.8}
          style={{ cursor: 'pointer', transition: 'r 0.2s' }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(isSelected ? null : chapter.id);
          }}
        />
        {/* Hit area */}
        <circle
          r={20}
          fill="transparent"
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(isSelected ? null : chapter.id);
          }}
        />

        {/* Popup */}
        <AnimatePresence>
          {isSelected && (
            <motion.g
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.18 }}
            >
              {/* Connector line */}
              <line x1={0} y1={-6} x2={0} y2={-18} stroke="#003a89" strokeWidth={1.5} />
              <foreignObject x={-110} y={-100} width={220} height={80} style={{ overflow: 'visible' }}>
                <div
                  className="bg-white rounded-xl px-3 py-2.5 shadow-2xl border-2 border-[#003a89] inline-block"
                >
                  <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400 leading-none mb-1">
                    {chapter.location}
                  </div>
                  <div
                    className="text-xs font-extrabold text-[#0a0a0a] leading-tight whitespace-nowrap"
                    style={{ fontWeight: 800 }}
                  >
                    {chapter.name}
                  </div>
                </div>
              </foreignObject>
            </motion.g>
          )}
        </AnimatePresence>
      </g>
    </Marker>
  );
}

export function ChapterMap() {
  const [selected, setSelected] = useState<string | null>(null);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [center, setCenter] = useState<[number, number]>(DEFAULT_CENTER);

  const activeCount = chapters.filter((c) => c.status === 'active').length;
  const launchingCount = chapters.filter((c) => c.status === 'launching').length;

  const inverseScale = 1 / zoom;

  return (
    <div className="relative w-full">
      <div className="relative rounded-3xl bg-[#003a89] overflow-hidden">
        {/* Dot grid background */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotgrid-map" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.1" fill="#c1ff72" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotgrid-map)" />
        </svg>

        <div className="relative w-full" onClick={() => setSelected(null)} style={{ cursor: 'grab' }}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 240, center: DEFAULT_CENTER }}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          >
            <ZoomableGroup
              zoom={zoom}
              center={center}
              minZoom={0.6}
              maxZoom={8}
              onMoveEnd={({ coordinates, zoom: z }: { coordinates: [number, number]; zoom: number }) => {
                setCenter(coordinates);
                setZoom(z);
              }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }: { geographies: any[] }) =>
                  geographies.map((geo) => {
                    const isAmerica = [
                      'Brazil',
                      'United States of America',
                      'Mexico',
                      'Canada',
                      'Argentina',
                      'Colombia',
                      'Peru',
                      'Venezuela',
                      'Chile',
                      'Bolivia',
                      'Ecuador',
                      'Paraguay',
                      'Uruguay',
                      'Guyana',
                      'Suriname',
                      'French Guiana',
                      'Panama',
                      'Costa Rica',
                      'Nicaragua',
                      'Honduras',
                      'El Salvador',
                      'Guatemala',
                      'Belize',
                      'Cuba',
                      'Haiti',
                      'Dominican Republic',
                      'Jamaica',
                      'Bahamas',
                      'Puerto Rico',
                      'Trinidad and Tobago',
                      'Greenland',
                    ].includes(geo.properties.name);
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
                <ChapterPin
                  key={c.id}
                  chapter={c}
                  selected={selected}
                  onSelect={setSelected}
                  inverseScale={inverseScale}
                />
              ))}
            </ZoomableGroup>
          </ComposableMap>
        </div>

        {/* Legend overlay */}
        <div className="absolute top-4 left-4 bg-[#003a89]/85 backdrop-blur-sm border border-[#c1ff72]/20 rounded-2xl p-3 md:p-4 flex flex-col gap-2 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c1ff72]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">
              Active · {activeCount}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff751f]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">
              Launching · {launchingCount}
            </span>
          </div>
        </div>

        {/* Compass label */}
        <div className="absolute top-4 right-4 text-[10px] text-[#c1ff72]/60 font-bold tracking-widest uppercase z-10">
          The Americas
        </div>

        {/* Zoom controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setZoom((z) => Math.min(z * 1.5, 8));
            }}
            className="w-10 h-10 rounded-xl bg-[#c1ff72] hover:bg-white text-[#003a89] flex items-center justify-center font-bold shadow-lg transition-colors"
            aria-label="Zoom in"
          >
            <Plus size={18} strokeWidth={3} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setZoom((z) => Math.max(z / 1.5, 0.6));
            }}
            className="w-10 h-10 rounded-xl bg-[#c1ff72] hover:bg-white text-[#003a89] flex items-center justify-center font-bold shadow-lg transition-colors"
            aria-label="Zoom out"
          >
            <Minus size={18} strokeWidth={3} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setZoom(DEFAULT_ZOOM);
              setCenter(DEFAULT_CENTER);
              setSelected(null);
            }}
            className="w-10 h-10 rounded-xl bg-[#003a89] hover:bg-[#0a2553] text-[#c1ff72] border-2 border-[#c1ff72] flex items-center justify-center font-bold shadow-lg transition-colors"
            aria-label="Reset view"
          >
            <RotateCcw size={16} strokeWidth={3} />
          </button>
        </div>

        {/* Hint */}
        <div className="absolute bottom-4 left-4 text-[10px] text-[#c1ff72]/60 font-bold tracking-widest uppercase z-10 max-w-[160px] leading-relaxed">
          Click a pin · scroll or drag to explore
        </div>
      </div>
    </div>
  );
}
