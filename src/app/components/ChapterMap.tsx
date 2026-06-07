import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { Plus, Minus } from 'lucide-react';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

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
    // Rua Mário Autuori 100, Barra da Tijuca/Recreio extension, Rio
    name: 'The British School Rio de Janeiro (Barra)',
    location: 'Rio de Janeiro, BRA',
    coords: [-43.4756, -23.0247],
    status: 'active',
  },
  {
    id: 'rio-2',
    // Av. José Silva de Azevedo Neto 309, Península, Barra da Tijuca, Rio (Escola Eleva)
    name: 'Opening Soon',
    location: 'Rio de Janeiro, BRA',
    coords: [-43.3585, -22.9968],
    status: 'launching',
  },
  {
    id: 'sao-paulo',
    // Rua Juquiá 166, Jardim Paulistano, São Paulo (St. Paul's)
    name: 'Opening Soon',
    location: 'São Paulo, BRA',
    coords: [-46.6357, -23.5852],
    status: 'launching',
  },
  {
    id: 'campinas',
    // Rua Cajamar 35, Jardim Alto da Barra, Campinas (EAC)
    name: 'Opening Soon',
    location: 'Campinas, BRA',
    coords: [-47.0366, -22.8833],
    status: 'launching',
  },
  {
    id: 'rockville',
    // 250 Richard Montgomery Dr, Rockville, MD (RMHS)
    name: 'Opening Soon',
    location: 'Rockville, USA',
    coords: [-77.1456, 39.0773],
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
  isMobile,
}: {
  chapter: Chapter;
  selected: string | null;
  onSelect: (id: string | null) => void;
  inverseScale: number;
  isMobile: boolean;
}) {
  const color = STATUS_COLORS[chapter.status];
  const isSelected = selected === chapter.id;

  const s = inverseScale;
  const baseR = isMobile ? 11 : 8;
  const selR = isMobile ? 15 : 11;
  const pulseMax = isMobile ? 30 : 22;
  const hitR = isMobile ? 15 : 11;

  // Popup sizes (in SVG units). Mobile needs bigger units to compensate for
  // the smaller container width that the SVG scales down to.
  const popupW = isMobile ? 360 : 220;
  const popupH = isMobile ? 80 : 46;
  const popupYOffset = isMobile ? 92 : 56;

  return (
    <Marker coordinates={chapter.coords}>
      <g style={{ transform: `scale(${s})`, transformOrigin: '0 0' }}>
        <motion.circle
          r={baseR - 1}
          fill={color}
          fillOpacity={0.4}
          animate={{ r: [baseR - 1, pulseMax], opacity: [0.6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.circle
          r={baseR - 1}
          fill={color}
          fillOpacity={0.4}
          animate={{ r: [baseR - 1, pulseMax], opacity: [0.6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 1.1 }}
        />
        <circle
          r={isSelected ? selR : baseR}
          fill={color}
          stroke="#003a89"
          strokeWidth={isMobile ? 2.5 : 1.8}
          style={{ cursor: 'pointer', transition: 'r 0.2s' }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(isSelected ? null : chapter.id);
          }}
        />
        <circle
          r={hitR}
          fill="transparent"
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(isSelected ? null : chapter.id);
          }}
        />

        <AnimatePresence>
          {isSelected && (
            <motion.g
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.18 }}
              style={{ pointerEvents: 'none' }}
            >
              <line x1={0} y1={-(baseR + 2)} x2={0} y2={-(baseR + 10)} stroke="#003a89" strokeWidth={isMobile ? 2.5 : 1.5} />
              <foreignObject
                x={-popupW / 2}
                y={-(baseR + popupYOffset)}
                width={popupW}
                height={popupH}
                style={{ overflow: 'visible' }}
              >
                <div
                  className="bg-white rounded-xl shadow-2xl border-2 border-[#003a89] inline-block"
                  style={{
                    padding: isMobile ? '10px 16px' : '8px 12px',
                    borderWidth: isMobile ? '3px' : '2px',
                  }}
                >
                  <div
                    className="font-bold uppercase tracking-widest text-gray-400 leading-none"
                    style={{ fontSize: isMobile ? '15px' : '9px', marginBottom: isMobile ? '6px' : '4px' }}
                  >
                    {chapter.location}
                  </div>
                  <div
                    className="font-extrabold text-[#0a0a0a] leading-tight whitespace-nowrap"
                    style={{ fontWeight: 800, fontSize: isMobile ? '20px' : '12px' }}
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
  const isMobile = useIsMobile();

  const activeCount = chapters.filter((c) => c.status === 'active').length;
  const launchingCount = chapters.filter((c) => c.status === 'launching').length;

  const inverseScale = 1 / zoom;

  return (
    <div className="relative w-full">
      <div
        className="relative rounded-3xl bg-[#003a89] overflow-hidden"
        style={{ height: 'min(65vh, 640px)' }}
      >
        {/* Dot grid background */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotgrid-map" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.1" fill="#c1ff72" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotgrid-map)" />
        </svg>

        <div
          className="relative w-full h-full"
          onClick={() => setSelected(null)}
          style={{ cursor: 'grab' }}
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 240, center: DEFAULT_CENTER }}
            style={{ width: '100%', height: '100%', display: 'block' }}
          >
            <ZoomableGroup
              zoom={zoom}
              center={center}
              minZoom={0.6}
              maxZoom={64}
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

              {[...chapters]
                .sort((a, b) => (a.status === 'active' ? 1 : 0) - (b.status === 'active' ? 1 : 0))
                .map((c) => (
                  <ChapterPin
                    key={c.id}
                    chapter={c}
                    selected={selected}
                    onSelect={setSelected}
                    inverseScale={inverseScale}
                    isMobile={isMobile}
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
        </div>
      </div>
    </div>
  );
}
