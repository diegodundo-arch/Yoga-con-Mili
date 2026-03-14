import { useState } from 'react'
import { Brain, Leaf, Sparkles, ChevronDown, ChevronUp } from 'lucide-react'

// ── Contenido placeholder ─────────────────────────────────────────────────────
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
        desc: 'Inhala 4 segundos, retén 7, exhala 8. Calma el sistema nervioso y prepara el cuerpo para el sueño profundo.',
        tag: 'Ansiedad · Sueño',
      },
      {
        title: 'Body scan matutino',
        duration: '10 min',
        desc: 'Recorre tu cuerpo de pies a cabeza, liberando tensiones acumuladas durante la noche.',
        tag: 'Mañana · Energía',
      },
      {
        title: 'Meditación del lago',
        duration: '15 min',
        desc: 'Visualiza tu mente como un lago sereno. Los pensamientos son olas que llegan y se van.',
        tag: 'Estrés · Mindfulness',
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
        desc: '"Om" (el sonido primordial del universo) + "Shanti" (paz). Repite en silencio o en voz alta durante tu práctica.',
        tag: 'Paz · Vibración',
      },
      {
        title: 'So Hum',
        duration: 'Con cada respiración',
        desc: '"So" al inhalar, "Hum" al exhalar. Significa "Yo soy eso" — reconociendo tu conexión con todo lo que existe.',
        tag: 'Presencia · Unión',
      },
      {
        title: 'Lokah Samastah',
        duration: 'Al inicio y cierre',
        desc: '"Que todos los seres en todos los mundos sean felices y libres." Mantra de apertura de corazón y compasión.',
        tag: 'Compasión · Apertura',
      },
    ],
  },
]

function TipCard({ title, duration, desc, tag }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="zen-card overflow-visible">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full p-4 text-left flex items-start justify-between gap-3"
      >
        <div className="flex-1">
          <p className="font-medium text-deep-green text-sm leading-snug">{title}</p>
          <p className="text-xs text-stone mt-0.5">{duration}</p>
        </div>
        {open
          ? <ChevronUp size={16} className="text-stone shrink-0 mt-0.5" />
          : <ChevronDown size={16} className="text-stone shrink-0 mt-0.5" />
        }
      </button>

      {open && (
        <div className="px-4 pb-4 animate-slide-up">
          <p className="text-sm text-deep-green/80 leading-relaxed mb-3">{desc}</p>
          <span className="text-[10px] bg-linen text-stone px-2 py-1 rounded-full">
            {tag}
          </span>
        </div>
      )}
    </div>
  )
}

export default function DailyTips() {
  const [activeTab, setActiveTab] = useState('meditaciones')

  const active = CATEGORIES.find(c => c.id === activeTab)

  return (
    <div className="animate-slide-up px-5 pt-8 pb-4">
      <p className="section-subtitle mb-1">para tu práctica diaria</p>
      <h2 className="section-title mb-5">Daily Tips</h2>

      {/* Tabs */}
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

      {/* Cards */}
      <div className="flex flex-col gap-3 animate-slide-up">
        {active?.items.map((item, i) => (
          <TipCard key={i} {...item} />
        ))}
      </div>

      {/* Frase motivacional al fondo */}
      <div className={`mt-6 p-4 rounded-3xl border ${active?.borderColor} ${active?.color}`}>
        <p className="font-serif italic text-sm text-deep-green leading-relaxed text-center">
          "La práctica diaria, por pequeña que sea, construye el camino."
        </p>
        <p className="text-center text-xs text-stone mt-1">— Mili</p>
      </div>
    </div>
  )
}
