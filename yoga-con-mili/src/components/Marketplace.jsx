import { MessageCircle, ShoppingBag, Sparkles, Tag } from 'lucide-react'

const WHATSAPP_NUMBER = '5491159633151'

const COMING_SOON_ITEMS = [
  { emoji: '🧘', label: 'Mats premium' },
  { emoji: '🪨', label: 'Bloques de cork' },
  { emoji: '🌿', label: 'Accesorios eco' },
  { emoji: '🛍️', label: 'Bolsas de lino' },
]

export default function Marketplace() {
  const handleNotify = () => {
    const msg = encodeURIComponent(
      '¡Hola Mili! 🙏 Me interesa la tienda cuando esté disponible. ¿Podés avisarme cuando abra?'
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="animate-slide-up px-5 pt-8 pb-4">
      {/* Header */}
      <p className="section-subtitle mb-1">productos seleccionados</p>
      <h2 className="section-title mb-1">Tienda</h2>
      <p className="text-stone text-sm mb-6">Materiales para profundizar tu práctica 🌿</p>

      {/* Hero visual — evoca el estilo del IG de Mili: naturaleza, calma, yoga */}
      <div className="zen-card overflow-hidden mb-5">
        <div className="relative h-52 bg-gradient-to-br from-linen via-beige to-tan/40 flex flex-col items-center justify-center gap-2">
          {/* Decoración de fondo */}
          <div className="absolute inset-0 opacity-10 flex items-center justify-center">
            <span className="text-[120px]">🧘</span>
          </div>

          {/* Contenido principal */}
          <div className="relative z-10 text-center px-6">
            <div className="w-14 h-14 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center mx-auto mb-3 shadow-sm">
              <ShoppingBag size={24} className="text-driftwood" />
            </div>
            <p className="font-serif text-2xl text-deep-green italic leading-tight">
              Próximamente
            </p>
            <p className="text-stone text-xs mt-1.5 leading-relaxed max-w-[200px] mx-auto">
              La tienda está en camino. Pronto vas a poder elegir tus materiales favoritos.
            </p>
          </div>
        </div>

        {/* Grid de items que vienen */}
        <div className="grid grid-cols-4 divide-x divide-beige/60 border-t border-beige/60">
          {COMING_SOON_ITEMS.map(({ emoji, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 py-3 px-1">
              <span className="text-xl">{emoji}</span>
              <span className="text-[9px] text-stone text-center leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Descuento para alumnos */}
      <div className="zen-card p-4 mb-5 bg-gradient-to-r from-sage/10 to-linen border-sage/30">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-sage/20 flex items-center justify-center shrink-0">
            <Tag size={16} className="text-deep-green" />
          </div>
          <div>
            <p className="font-medium text-deep-green text-sm leading-snug">
              Descuento exclusivo para alumnos
            </p>
            <p className="text-stone text-xs mt-0.5 leading-relaxed">
              Todos los alumnos de Yoga con Mili tendrán un descuento especial en cada producto de la tienda. ✨
            </p>
          </div>
        </div>
      </div>

      {/* Frase inspiracional — estilo del IG */}
      <div className="mx-0 mb-5 p-4 rounded-3xl bg-gradient-to-br from-beige/60 to-linen border border-tan/20 text-center">
        <Sparkles size={14} className="text-clay mx-auto mb-2" />
        <p className="font-serif italic text-sm text-deep-green leading-relaxed">
          "El equipamiento correcto acompaña tu práctica, pero la intención la transforma."
        </p>
        <p className="text-stone text-xs mt-1.5">— Mili</p>
      </div>

      {/* CTA WhatsApp */}
      <button
        onClick={handleNotify}
        className="btn-primary w-full"
      >
        <MessageCircle size={16} />
        Avisame cuando abra la tienda
      </button>
      <p className="text-center text-xs text-stone mt-2">
        Te escribimos por WhatsApp en cuanto esté disponible 🙏
      </p>
    </div>
  )
}
