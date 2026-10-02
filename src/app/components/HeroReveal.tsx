import { useEffect, useRef } from 'react';

/**
 * Dark scroll-reveal intro that sits above the main hero. As the viewer scrolls,
 * the match surface (player, ball, shot) is pulled back to expose the data layer
 * underneath it, while the headline completes to "Learn the game behind the game".
 * It then dissolves to the cream background so the normal site resumes below.
 *
 * Pure SVG, no 3D library. Falls back to a static composed frame for reduced
 * motion. The only words are the existing hero headline; everything else is
 * data-visualisation (placeholder figures).
 */
export function HeroReveal() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const scrolly = scrollyRef.current;
    if (!root || !scrolly) return;

    const q = (s: string) => root.querySelector(s) as any;
    const traj = q('.hr-traj') as SVGPathElement;
    const ball = q('.hr-ball') as SVGGElement;
    const mom = q('#hr-mom') as SVGPathElement;
    const el = {
      deep: q('.hr-deep'), dots: q('.hr-dots'), net: q('.hr-net'), heat: q('.hr-heat'),
      pitch: q('.hr-pitch'), hud: q('.hr-hud'), l2: q('.hr-l2'), hint: q('.hr-hint'),
      exit: q('.hr-exit'), xg: q('#hr-xg'), winfill: q('#hr-winfill'), winpct: q('#hr-winpct'),
    };
    if (!traj || !ball || !mom) return;

    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a), 0, 1);
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    const L = traj.getTotalLength();
    traj.style.strokeDasharray = String(L);
    traj.style.strokeDashoffset = String(L);
    const ML = mom.getTotalLength();
    mom.style.strokeDasharray = String(ML);
    mom.style.strokeDashoffset = String(ML);

    const render = (p: number) => {
      const bt = ease(seg(p, 0.1, 0.62));
      const pt = traj.getPointAtLength(bt * L);
      ball.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
      traj.style.strokeDashoffset = String(L * (1 - bt));

      const d = ease(seg(p, 0.3, 0.6));
      el.dots.style.opacity = String(d);
      el.net.style.opacity = String(d);
      el.heat.style.opacity = String(d * 0.9);
      el.pitch.style.opacity = String(0.5 - 0.38 * d);
      el.deep.style.opacity = String(0.85 * ease(seg(p, 0.2, 0.8)));

      const d3 = ease(seg(p, 0.55, 0.85));
      el.hud.style.opacity = String(d3);
      el.hud.style.transform = `translateY(${(1 - d3) * 14}px)`;
      el.xg.textContent = (0.37 * ease(seg(p, 0.6, 0.96))).toFixed(2);
      const w = 73 * ease(seg(p, 0.62, 0.98));
      el.winfill.style.width = w + '%';
      el.winpct.textContent = String(Math.round(w));
      mom.style.strokeDashoffset = String(ML * (1 - ease(seg(p, 0.66, 1))));

      const rev = ease(seg(p, 0.08, 0.4));
      el.l2.style.opacity = String(rev);
      el.l2.style.transform = `translateY(${(1 - rev) * 0.35}em)`;
      el.hint.style.opacity = String(1 - ease(seg(p, 0.02, 0.12)));
      el.exit.style.opacity = String(ease(seg(p, 0.93, 1)));
    };

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('hr-reduced');
      render(0.85);
      return;
    }

    const sticky = root.querySelector('.hr-sticky') as HTMLElement;
    const navH = 112; // fixed nav height (h-28); the reveal pins just below it
    let ticking = false;
    const update = () => {
      const stickyH = sticky ? sticky.clientHeight : window.innerHeight;
      const total = scrolly.offsetHeight - stickyH;
      const rectTop = scrolly.getBoundingClientRect().top;
      const p = total > 0 ? clamp((navH - rectTop) / total, 0, 1) : 0;
      render(p);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div ref={rootRef} className="hr-root">
      <style>{`
        .hr-root{--field:#06398a;--deep:#041f4a;--ink:#f6f5ef;--muted:rgba(246,245,239,.62);--lime:#c1ff72;--orange:#ff751f;--violet:#8f8dff;--cream:#f6f5ef}
        .hr-scrolly{position:relative;height:240vh}
        .hr-sticky{position:sticky;top:7rem;height:calc(100svh - 7rem);overflow:hidden;background:var(--field)}
        .hr-deep{position:absolute;inset:0;background:var(--deep);opacity:0}
        .hr-scene{position:absolute;inset:0;width:100%;height:100%}
        .hr-pitch{opacity:.5}
        .hr-pitch line,.hr-pitch circle,.hr-pitch rect{stroke:var(--lime);fill:none;stroke-width:2;opacity:.9}
        .hr-goal path{stroke:var(--ink);fill:none;stroke-width:3;opacity:.7}
        .hr-goal .hr-goalnet{stroke:var(--ink);opacity:.22;stroke-width:1}
        .hr-heat{opacity:0;filter:blur(2px)}
        .hr-net{opacity:0}
        .hr-net polyline{fill:none;stroke:var(--violet);stroke-width:2.5;stroke-dasharray:3 9;stroke-linecap:round;opacity:.9}
        .hr-dots{opacity:0}
        .hr-dots circle{fill:var(--lime);opacity:.9}
        .hr-traj{stroke:var(--orange);fill:none;stroke-width:5;stroke-linecap:round;filter:drop-shadow(0 0 10px rgba(255,117,31,.6))}
        .hr-ball circle{fill:var(--ink)}
        .hr-ball .hr-seam{fill:var(--deep)}
        .hr-player .hr-num{fill:var(--ink);font-weight:800;font-size:20px;text-anchor:middle}
        .hr-hud{position:absolute;inset:0;opacity:0;pointer-events:none}
        .hr-panel{position:absolute;background:rgba(4,22,54,.62);backdrop-filter:blur(6px);border:1px solid rgba(193,255,114,.28);border-radius:14px;padding:12px 15px}
        .hr-panel .hr-k{font-size:10.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-bottom:6px;white-space:nowrap}
        .hr-panel .hr-v{font-weight:800;font-size:clamp(28px,6vw,44px);line-height:1;color:var(--lime);font-variant-numeric:tabular-nums}
        .hr-xg{top:9%;right:5%}
        .hr-win{left:5%;bottom:12%}
        .hr-mom{right:5%;bottom:12%}
        .hr-bar{width:clamp(120px,22vw,180px);height:10px;border-radius:999px;background:rgba(246,245,239,.16);overflow:hidden}
        .hr-bar span{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--orange),var(--lime))}
        .hr-win .hr-pct{font-weight:800;font-size:22px;color:var(--ink);margin-top:7px;font-variant-numeric:tabular-nums}
        .hr-mom svg{display:block;width:clamp(120px,22vw,170px);height:46px}
        .hr-mom path{fill:none;stroke:var(--orange);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
        .hr-copy{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 20px;pointer-events:none}
        .hr-copy::before{content:"";position:absolute;inset:0;z-index:0;pointer-events:none;background:radial-gradient(64% 48% at 50% 50%,rgba(4,20,52,.84),rgba(4,20,52,.52) 46%,transparent 74%)}
        .hr-head{position:relative;z-index:1}
        .hr-head h1{margin:0;font-weight:800;letter-spacing:-.02em;line-height:.98;color:var(--ink);font-size:clamp(2.4rem,9vw,6rem);text-wrap:balance;text-shadow:0 4px 40px rgba(4,22,54,.5)}
        .hr-head h1 .hr-l2{color:var(--lime);opacity:0;display:inline-block}
        .hr-hint{margin:1.2em 0 0;font-size:1.5rem;line-height:1;color:var(--muted)}
        .hr-exit{position:absolute;inset:0;background:var(--cream);opacity:0;pointer-events:none;z-index:2}
        .hr-reduced .hr-scrolly{height:auto}
        .hr-reduced .hr-sticky{position:static}
        @media (prefers-reduced-motion:reduce){.hr-hint{display:none}}
      `}</style>

      <section ref={scrollyRef} className="hr-scrolly" aria-label="Scroll to look behind the game">
        <div className="hr-sticky">
          <div className="hr-deep" />

          <svg className="hr-scene" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <radialGradient id="hr-heatgrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff751f" stopOpacity="0.6" />
                <stop offset="55%" stopColor="#ff751f" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#ff751f" stopOpacity="0" />
              </radialGradient>
            </defs>

            <g className="hr-pitch">
              <rect x="40" y="40" width="920" height="520" rx="4" />
              <line x1="500" y1="40" x2="500" y2="560" />
              <circle cx="500" cy="300" r="78" />
              <rect x="760" y="170" width="200" height="260" />
              <rect x="860" y="240" width="100" height="120" />
            </g>

            <g className="hr-heat">
              <circle cx="440" cy="330" r="120" fill="url(#hr-heatgrad)" />
              <circle cx="660" cy="270" r="150" fill="url(#hr-heatgrad)" />
              <circle cx="300" cy="440" r="95" fill="url(#hr-heatgrad)" />
            </g>

            <g className="hr-net">
              <polyline points="160,470 300,380 430,300 620,260 840,250" />
            </g>

            <g className="hr-dots">
              <circle cx="300" cy="380" r="9" />
              <circle cx="430" cy="300" r="9" />
              <circle cx="520" cy="430" r="9" />
              <circle cx="620" cy="260" r="9" />
              <circle cx="700" cy="360" r="9" />
              <circle cx="560" cy="180" r="9" />
              <circle cx="380" cy="480" r="9" />
              <circle cx="760" cy="210" r="9" />
            </g>

            <path className="hr-traj" d="M160,470 C 380,150 640,150 840,250" />

            <g className="hr-goal">
              <path d="M912,200 L912,360 M912,200 L970,214 M912,360 L970,360 M970,214 L970,360" />
              <line className="hr-goalnet" x1="926" y1="214" x2="926" y2="356" />
              <line className="hr-goalnet" x1="944" y1="212" x2="944" y2="357" />
              <line className="hr-goalnet" x1="958" y1="213" x2="958" y2="358" />
              <line className="hr-goalnet" x1="912" y1="252" x2="970" y2="258" />
              <line className="hr-goalnet" x1="912" y1="300" x2="970" y2="302" />
              <line className="hr-goalnet" x1="912" y1="340" x2="970" y2="340" />
            </g>

            <g className="hr-player">
              <circle cx="160" cy="470" r="20" fill="#ff751f" />
              <text className="hr-num" x="160" y="477">10</text>
            </g>

            <g className="hr-ball" transform="translate(160 470)">
              <circle r="13" />
              <path className="hr-seam" d="M0,-6 L5,-2 L3,5 L-3,5 L-5,-2 Z" />
            </g>
          </svg>

          <div className="hr-hud">
            <div className="hr-panel hr-xg"><div className="hr-k">Expected goals · xG</div><div className="hr-v"><span id="hr-xg">0.00</span></div></div>
            <div className="hr-panel hr-win">
              <div className="hr-k">Win probability</div>
              <div className="hr-bar"><span id="hr-winfill" /></div>
              <div className="hr-pct"><span id="hr-winpct">0</span>%</div>
            </div>
            <div className="hr-panel hr-mom">
              <div className="hr-k">Momentum</div>
              <svg viewBox="0 0 170 46"><path id="hr-mom" d="M4,38 L34,30 L62,33 L92,18 L120,22 L148,6" /></svg>
            </div>
          </div>

          <div className="hr-copy">
            <div className="hr-head">
              <h1><span>Learn the game</span> <span className="hr-l2">behind the game</span></h1>
              <p className="hr-hint" aria-hidden="true">&darr;</p>
            </div>
          </div>

          <div className="hr-exit" />
        </div>
      </section>
    </div>
  );
}
