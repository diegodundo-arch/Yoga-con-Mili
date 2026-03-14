import { ArrowRight, Sparkles, Calendar, Play } from 'lucide-react'

const QUICK_LINKS = [
  {
    id: 'booking',
    emoji: '🧘',
    title: 'Reservar clase',
    desc: 'Elige tu horario',
    color: 'bg-linen',
  },
  {
    id: 'videos',
    emoji: '▶️',
    title: 'Ver clases',
    desc: 'Elongación & estiramiento',
    color: 'bg-beige/60',
  },
  {
    id: 'tips',
    emoji: '🌿',
    title: 'Daily tips',
    desc: 'Meditación & mantras',
    color: 'bg-sage/20',
  },
  {
    id: 'shop',
    emoji: '🛍️',
    title: 'Tienda',
    desc: 'Mats & accesorios',
    color: 'bg-clay/10',
  },
]

export default function Home({ navigate }) {
  return (
    <div className="animate-slide-up">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-linen">
        {/* Hero con logo de marca */}
        <div className="h-80 bg-linen flex items-center justify-center relative">
          <div className="relative z-10 text-center px-6 flex flex-col items-center">
            <img
              src="/assets/logo.jpg"
              alt="Logo Yoga con Mili"
              className="w-44 h-44 object-contain mix-blend-multiply"
            />
            <p className="section-subtitle mb-3 tracking-[0.3em]">bienvenida a tu espacio</p>
            <h1 className="font-quicksand text-deep-green">
              <span className="block text-4xl font-medium tracking-[0.18em]">yoga</span>
              <em className="block text-xl font-medium not-italic text-clay tracking-[0.35em] mt-1">con mili</em>
            </h1>
          </div>
        </div>

        {/* CTA rápido */}
        <div className="px-5 py-6 flex flex-col gap-3">
          <p className="text-stone text-sm leading-relaxed">
            Un espacio para volver a vos. Clases de yoga, meditaciones guiadas
            y rituales de bienestar para tu vida cotidiana.
          </p>
          <button
            onClick={() => navigate('booking')}
            className="btn-primary w-full"
          >
            <Calendar size={18} />
            Reservar mi clase
            <ArrowRight size={16} className="ml-auto" />
          </button>
        </div>
      </section>

      {/* ── Quick access grid ── */}
      <section className="px-5 pt-6 pb-2">
        <h2 className="section-title mb-1">¿Qué querés hacer hoy?</h2>
        <p className="section-subtitle mb-4">tu práctica, tu ritmo</p>

        <div className="grid grid-cols-2 gap-3">
          {QUICK_LINKS.map(({ id, emoji, title, desc, color }) => (
            <button
              key={id}
              onClick={() => navigate(id)}
              className={`zen-card ${color} p-4 text-left active:scale-95 transition-transform`}
            >
              <span className="text-2xl mb-2 block">{emoji}</span>
              <p className="font-medium text-deep-green text-sm leading-tight">{title}</p>
              <p className="text-stone text-xs mt-0.5">{desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* ── Frase del día ── */}
      <section className="mx-5 mt-5 p-5 rounded-3xl bg-gradient-to-br from-beige to-linen border border-tan/30">
        <div className="flex items-start gap-3">
          <Sparkles size={18} className="text-clay mt-0.5 shrink-0" />
          <div>
            <p className="section-subtitle mb-1">mantra del día</p>
            <blockquote className="font-serif text-lg text-deep-green italic leading-snug">
              "La quietud es donde la creatividad y las soluciones a los problemas se encuentran."
            </blockquote>
            <p className="text-stone text-xs mt-2">— Eckhart Tolle</p>
          </div>
        </div>
      </section>

      {/* ── Promo spotify ── */}
      <section className="mx-5 mt-4 mb-2">
        <button
          onClick={() => navigate('spotify')}
          className="w-full zen-card bg-[#1DB954]/5 border-[#1DB954]/20 p-4 flex items-center gap-3 active:scale-95"
        >
          <div className="w-10 h-10 rounded-xl bg-[#1DB954]/15 flex items-center justify-center shrink-0">
            <Play size={18} className="text-[#1DB954] fill-[#1DB954]" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-deep-green">Música para tu práctica</p>
            <p className="text-xs text-stone">Playlists de Mili en Spotify →</p>
          </div>
        </button>
      </section>
    </div>
  )
}
