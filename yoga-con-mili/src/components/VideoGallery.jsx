import { Play } from 'lucide-react'

export default function VideoGallery() {
  return (
    <div className="animate-slide-up px-5 pt-8 pb-4">
      <p className="section-subtitle mb-1">clases pre-grabadas</p>
      <h2 className="section-title mb-6">Biblioteca de Videos</h2>

      {/* Estado vacío — próximamente */}
      <div className="flex flex-col items-center justify-center py-16 gap-5">
        <div className="w-20 h-20 rounded-full bg-linen flex items-center justify-center">
          <Play size={32} className="text-tan ml-1" />
        </div>
        <div className="text-center">
          <p className="font-serif text-xl text-deep-green mb-1">
            Próximamente
          </p>
          <p className="text-stone text-sm max-w-[220px] leading-relaxed">
            Las clases grabadas estarán disponibles muy pronto. ¡Seguí las novedades!
          </p>
        </div>
        <div className="w-16 h-px bg-tan/40" />
        <p className="text-stone/60 text-xs">✨ Stay tuned</p>
      </div>
    </div>
  )
}
