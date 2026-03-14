import { useState, useEffect, useRef, useCallback } from 'react'
import { Brain, Leaf, Sparkles, ChevronDown, ChevronUp, Play, Pause, RotateCcw, Timer } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════════
// AUDIO UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════

function createAudioCtx() {
  return new (window.AudioContext || window.webkitAudioContext)()
}

/** Cuenco tibetano — dos osciladores ligeramente desafinados */
function playBowl(ctx, freq = 396, dur = 4.5, vol = 0.28) {
  if (!ctx) return
  const now = ctx.currentTime
  ;[freq, freq * 1.0022].forEach((f, i) => {
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = f
    osc.connect(gain)
    gain.connect(ctx.destination)
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(i === 0 ? vol : vol * 0.4, now + 0.09)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur)
    osc.start(now)
    osc.stop(now + dur)
  })
}

/** Ruido marrón filtrado → sonido de agua/lluvia */
function createWaterSource(ctx) {
  if (!ctx) return null
  const rate = ctx.sampleRate
  const buf  = ctx.createBuffer(2, rate * 10, rate)
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch)
    let last = 0
    for (let i = 0; i < d.length; i++) {
      last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02
      d[i]  = last * 3.8
    }
  }
  const src    = ctx.createBufferSource()
  src.buffer   = buf
  src.loop     = true
  const lpf    = ctx.createBiquadFilter()
  lpf.type     = 'lowpass'
  lpf.frequency.value = 750
  const gain   = ctx.createGain()
  gain.gain.value = 0.48
  src.connect(lpf)
  lpf.connect(gain)
  gain.connect(ctx.destination)
  return { src, gain }
}

// Ritmo continuo de cuencos — uno cada 20 s durante los 8 min
// Alterna dos frecuencias (396 Hz / 432 Hz) para mayor riqueza armónica
const BOWL_INTERVAL = 20

// ═══════════════════════════════════════════════════════════════════════════════
// HELPER: Anillo de progreso SVG
// ═══════════════════════════════════════════════════════════════════════════════
function Ring({ progress, stroke = '#C0653B', size = 120, children }) {
  const r    = 42
  const circ = 2 * Math.PI * r
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="50" cy="50" r={r} fill="none" stroke="#EDE4D8" strokeWidth="6" />
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke={stroke} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - Math.min(progress, 1))}
          style={{ transition: 'stroke-dashoffset 0.9s linear' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center gap-0.5">
        {children}
      </div>
    </div>
  )
}

function fmt(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, '0')
  const s = String(secs % 60).padStart(2, '0')
  return `${m}:${s}`
}

// ═══════════════════════════════════════════════════════════════════════════════
// TIMER 1 — Respiración 4-7-8
// ═══════════════════════════════════════════════════════════════════════════════
const PHASES = [
  { name: 'Inhala',  secs: 4, color: '#8DA290', hint: 'lentamente…' },
  { name: 'Retén',   secs: 7, color: '#C0653B', hint: 'sostené…'    },
  { name: 'Exhala',  secs: 8, color: '#3C2E1D', hint: 'soltá todo…' },
]
const B_TOTAL = 5 * 60

function BreathingTimer() {
  const st     = useRef({ ph: 0, phT: 0, total: 0 })
  const [d, setD] = useState({ ph: 0, phT: 0, total: 0, done: false })
  const [run, setRun] = useState(false)
  const ctx    = useRef(null)
  const intv   = useRef(null)

  const tick = useCallback(() => {
    const s = st.current
    s.total++; s.phT++
    if (s.phT >= PHASES[s.ph].secs) {
      s.ph = (s.ph + 1) % 3; s.phT = 0
      if (ctx.current) playBowl(ctx.current, 528, 1.4, 0.18)
    }
    if (s.total >= B_TOTAL) {
      clearInterval(intv.current); setRun(false)
      if (ctx.current) playBowl(ctx.current, 396, 4.5, 0.3)
      setD({ ...s, done: true }); return
    }
    setD({ ...s, done: false })
  }, [])

  const onStart = () => {
    if (!ctx.current) ctx.current = createAudioCtx()
    playBowl(ctx.current, 396, 3, 0.28)
    setRun(true); intv.current = setInterval(tick, 1000)
  }
  const onPause = () => { clearInterval(intv.current); setRun(false) }
  const onReset = () => {
    clearInterval(intv.current); setRun(false)
    st.current = { ph: 0, phT: 0, total: 0 }
    setD({ ph: 0, phT: 0, total: 0, done: false })
  }

  const ph = PHASES[d.ph]
  return (
    <div className="flex flex-col items-center gap-4 py-3">
      <Ring progress={d.phT / ph.secs} stroke={ph.color}>
        <span className="text-base font-semibold font-quicksand text-deep-green">{ph.name}</span>
        <span className="text-[10px] text-stone">{ph.hint}</span>
        <span className="text-[11px] text-stone mt-0.5">{d.phT}/{ph.secs}s</span>
      </Ring>
      <div className="text-center">
        <p className="text-2xl font-light font-quicksand text-deep-green">{fmt(B_TOTAL - d.total)}</p>
        <p className="text-[10px] text-stone tracking-wide">restantes · 4 — 7 — 8</p>
      </div>
      {d.done && <p className="text-sm text-sage font-medium animate-fade-in">✨ ¡Sesión completada!</p>}
      <div className="flex gap-2">
        {!run && !d.done && <button onClick={onStart} className="btn-primary py-2 px-4 text-sm"><Play size={13} />{d.total > 0 ? 'Continuar' : 'Comenzar'}</button>}
        {run         && <button onClick={onPause} className="btn-secondary py-2 px-4 text-sm"><Pause size={13} />Pausar</button>}
        {d.total > 0 && <button onClick={onReset} className="btn-secondary py-2 px-3"><RotateCcw size={13} /></button>}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// TIMER 2 — Cuencos tibetanos · 8 min (sin voz)
// ═══════════════════════════════════════════════════════════════════════════════
const BS_TOTAL = 8 * 60

function BodyScanTimer() {
  const st    = useRef({ total: 0 })
  const [d, setD] = useState({ total: 0, done: false })
  const [run, setRun] = useState(false)
  const ctx   = useRef(null)
  const intv  = useRef(null)

  const tick = useCallback(() => {
    const s = st.current; s.total++
    if (s.total >= BS_TOTAL) {
      clearInterval(intv.current); setRun(false)
      // Cuenco de cierre más largo y resonante
      if (ctx.current) playBowl(ctx.current, 396, 8, 0.30)
      setD({ total: BS_TOTAL, done: true }); return
    }
    // Ritmo continuo: cuenco cada BOWL_INTERVAL segundos
    // Alterna 396 Hz y 432 Hz para que no suene monótono
    if (s.total % BOWL_INTERVAL === 0 && ctx.current) {
      const freq = Math.floor(s.total / BOWL_INTERVAL) % 2 === 0 ? 396 : 432
      playBowl(ctx.current, freq, 6, 0.22)
    }
    setD({ total: s.total, done: false })
  }, [])

  const onStart = () => {
    if (!ctx.current) ctx.current = createAudioCtx()
    playBowl(ctx.current, 396, 7, 0.28)   // cuenco de apertura
    setRun(true); intv.current = setInterval(tick, 1000)
  }
  const onPause = () => { clearInterval(intv.current); setRun(false) }
  const onReset = () => {
    clearInterval(intv.current); setRun(false)
    st.current = { total: 0 }
    setD({ total: 0, done: false })
  }
  useEffect(() => () => clearInterval(intv.current), [])

  return (
    <div className="flex flex-col items-center gap-3 py-3">
      <Ring progress={d.total / BS_TOTAL} stroke="#8DA290" size={110}>
        <span className="text-xl font-light font-quicksand text-deep-green">{fmt(BS_TOTAL - d.total)}</span>
        <span className="text-[10px] text-stone">cuencos</span>
      </Ring>
      {!d.done && (
        <p className="text-[11px] text-stone text-center max-w-[240px]">
          🎵 Los cuencos tibetanos marcan el ritmo de tu práctica
        </p>
      )}
      {d.done && <p className="text-sm text-sage font-medium animate-fade-in">🌿 ¡Hermoso trabajo! En paz.</p>}
      <div className="flex gap-2">
        {!run && !d.done && <button onClick={onStart} className="btn-primary py-2 px-4 text-sm"><Play size={13} />{d.total > 0 ? 'Continuar' : 'Comenzar'}</button>}
        {run          && <button onClick={onPause} className="btn-secondary py-2 px-4 text-sm"><Pause size={13} />Pausar</button>}
        {d.total > 0  && <button onClick={onReset} className="btn-secondary py-2 px-3"><RotateCcw size={13} /></button>}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// TIMER 3 — Meditación del lago (agua 15 min)
// ═══════════════════════════════════════════════════════════════════════════════
const LAKE_TOTAL = 15 * 60

function LakeTimer() {
  const st     = useRef({ total: 0 })
  const [d, setD] = useState({ total: 0, done: false })
  const [run, setRun] = useState(false)
  const ctx    = useRef(null)
  const water  = useRef(null)
  const intv   = useRef(null)

  const startInterval = useCallback(() => {
    intv.current = setInterval(() => {
      const s = st.current; s.total++
      if (s.total >= LAKE_TOTAL) {
        clearInterval(intv.current)
        try { water.current?.src.stop() } catch {}
        water.current = null
        if (ctx.current) playBowl(ctx.current, 396, 5.5, 0.3)
        setRun(false); setD({ total: LAKE_TOTAL, done: true }); return
      }
      setD({ total: s.total, done: false })
    }, 1000)
  }, [])

  const onStart = () => {
    if (!ctx.current) ctx.current = createAudioCtx()
    playBowl(ctx.current, 174, 6, 0.22)
    if (!water.current) {
      const w = createWaterSource(ctx.current)
      water.current = w
      setTimeout(() => w.src.start(), 1800)
    }
    setRun(true); startInterval()
  }

  const onPause = () => {
    clearInterval(intv.current)
    if (water.current && ctx.current)
      water.current.gain.gain.setTargetAtTime(0, ctx.current.currentTime, 0.6)
    setRun(false)
  }

  const onResume = () => {
    if (water.current && ctx.current)
      water.current.gain.gain.setTargetAtTime(0.48, ctx.current.currentTime, 0.6)
    setRun(true); startInterval()
  }

  const onReset = () => {
    clearInterval(intv.current)
    try { water.current?.src.stop() } catch {}
    water.current = null
    setRun(false); st.current = { total: 0 }
    setD({ total: 0, done: false })
  }

  useEffect(() => () => {
    clearInterval(intv.current)
    try { water.current?.src.stop() } catch {}
  }, [])

  return (
    <div className="flex flex-col items-center gap-3 py-3">
      <Ring progress={d.total / LAKE_TOTAL} stroke="#A0785A" size={110}>
        <span className="text-xl font-light font-quicksand text-deep-green">{fmt(LAKE_TOTAL - d.total)}</span>
        <span className="text-[10px] text-stone">del lago</span>
      </Ring>
      <p className="text-[11px] text-stone text-center max-w-[260px]">
        🌊 Sonido de agua relajante · Visualizá tu mente como un lago sereno
      </p>
      {d.done && <p className="text-sm text-sage font-medium animate-fade-in">🌿 Meditación completada.</p>}
      <div className="flex gap-2">
        {!run && !d.done && d.total === 0 && <button onClick={onStart}  className="btn-primary py-2 px-4 text-sm"><Play size={13} />Comenzar</button>}
        {!run && !d.done && d.total > 0  && <button onClick={onResume} className="btn-primary py-2 px-4 text-sm"><Play size={13} />Continuar</button>}
        {run && <button onClick={onPause} className="btn-secondary py-2 px-4 text-sm"><Pause size={13} />Pausar</button>}
        {d.total > 0 && <button onClick={onReset} className="btn-secondary py-2 px-3"><RotateCcw size={13} /></button>}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTENIDO
// ═══════════════════════════════════════════════════════════════════════════════
const CATEGORIES = [
  {
    id: 'meditaciones',
    label: 'Meditaciones',
    Icon: Brain,
    color: 'bg-sage/20',
    accent: 'text-deep-green',
    borderColor: 'border-sage/40',
    items: [
      {
        title: 'Respiración 4-7-8',
        duration: '5 min',
        desc: 'Inhala 4 segundos, retén 7, exhala 8. Calma el sistema nervioso y prepara el cuerpo para el descanso profundo.',
        tag: 'Ansiedad · Sueño',
        timer: 'breathing',
      },
      {
        title: 'Body scan matutino',
        duration: '8 min',
        desc: 'Recorre mentalmente tu cuerpo de cabeza a pies al ritmo de cuencos tibetanos. Cada toque marca un nuevo punto de atención y soltura.',
        tag: 'Mañana · Energía',
        timer: 'bodyscan',
      },
      {
        title: 'Meditación del lago',
        duration: '15 min',
        desc: 'Visualiza tu mente como un lago sereno. Los pensamientos son olas que llegan y se van.',
        tag: 'Estrés · Mindfulness',
        timer: 'lake',
      },
    ],
  },
  {
    id: 'infusiones',
    label: 'Infusiones Detox',
    Icon: Leaf,
    color: 'bg-linen',
    accent: 'text-driftwood',
    borderColor: 'border-tan/40',
    items: [
      {
        title: 'Agua dorada',
        duration: 'Mañana en ayunas',
        desc: 'Cúrcuma + jengibre + pimienta negra + leche vegetal. Antiinflamatoria y digestiva.',
        tag: 'Detox · Digestión',
      },
      {
        title: 'Té de moon milk',
        duration: 'Antes de dormir',
        desc: 'Ashwagandha + canela + cardamomo + leche de almendras. Baja el cortisol y prepara para el descanso.',
        tag: 'Sueño · Relajación',
      },
      {
        title: 'Shot verde',
        duration: 'Pre-práctica',
        desc: 'Spirulina + limón + jengibre + agua de coco. Alcaliniza el cuerpo y da energía limpia.',
        tag: 'Energía · Alcalino',
      },
    ],
  },
  {
    id: 'mantras',
    label: 'Mantras',
    Icon: Sparkles,
    color: 'bg-clay/10',
    accent: 'text-clay',
    borderColor: 'border-clay/20',
    items: [
      {
        title: 'Om Shanti',
        duration: '108 repeticiones',
        desc: '"Om" (sonido primordial) + "Shanti" (paz). Repite en silencio o en voz alta durante tu práctica.',
        tag: 'Paz · Vibración',
      },
      {
        title: 'So Hum',
        duration: 'Con cada respiración',
        desc: '"So" al inhalar, "Hum" al exhalar. Significa "Yo soy eso" — tu conexión con todo lo que existe.',
        tag: 'Presencia · Unión',
      },
      {
        title: 'Lokah Samastah',
        duration: 'Al inicio y cierre',
        desc: '"Que todos los seres en todos los mundos sean felices y libres." Mantra de apertura y compasión.',
        tag: 'Compasión · Apertura',
      },
    ],
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// TipCard
// ═══════════════════════════════════════════════════════════════════════════════
function TipCard({ title, duration, desc, tag, timer }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="zen-card overflow-visible">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full p-4 text-left flex items-start justify-between gap-3"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-medium text-deep-green text-sm leading-snug">{title}</p>
            {timer && <Timer size={12} className="text-clay shrink-0" />}
          </div>
          <p className="text-xs text-stone mt-0.5">{duration}</p>
        </div>
        {open
          ? <ChevronUp   size={16} className="text-stone shrink-0 mt-0.5" />
          : <ChevronDown size={16} className="text-stone shrink-0 mt-0.5" />
        }
      </button>

      {open && (
        <div className="px-4 pb-4 animate-slide-up">
          <p className="text-sm text-deep-green/80 leading-relaxed mb-3">{desc}</p>
          <span className="text-[10px] bg-linen text-stone px-2 py-1 rounded-full">{tag}</span>

          {timer && (
            <div className="mt-4 pt-4 border-t border-beige/50">
              {timer === 'breathing' && <BreathingTimer />}
              {timer === 'bodyscan'  && <BodyScanTimer  />}
              {timer === 'lake'      && <LakeTimer      />}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════
export default function DailyTips() {
  const [activeTab, setActiveTab] = useState('meditaciones')
  const active = CATEGORIES.find(c => c.id === activeTab)

  return (
    <div className="animate-slide-up px-5 pt-8 pb-4">
      <p className="section-subtitle mb-1">para tu práctica diaria</p>
      <h2 className="section-title mb-5">Daily Tips</h2>

      <div className="flex gap-2 mb-5 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map(({ id, label, Icon, color, accent }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-sm font-medium
                        whitespace-nowrap shrink-0 transition-all duration-200
                        ${activeTab === id
                          ? `${color} ${accent} shadow-sm`
                          : 'bg-white text-stone border border-beige/70 hover:bg-linen'
                        }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 animate-slide-up">
        {active?.items.map((item, i) => <TipCard key={i} {...item} />)}
      </div>

      <div className={`mt-6 p-4 rounded-3xl border ${active?.borderColor} ${active?.color}`}>
        <p className="font-sans italic text-sm text-deep-green leading-relaxed text-center">
          "La práctica diaria, por pequeña que sea, construye el camino."
        </p>
        <p className="text-center text-xs text-stone mt-1">— Mili</p>
      </div>
    </div>
  )
}
