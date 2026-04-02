import { ExternalLink, Music2 } from 'lucide-react'
import { SPOTIFY_PLAYLIST_ID, SPOTIFY_PLAYLIST_URL } from '../constants/config'

const PLAYLIST_ID  = SPOTIFY_PLAYLIST_ID
const PLAYLIST_URL = SPOTIFY_PLAYLIST_URL

export default function SpotifySection() {
  return (
    <div className="animate-slide-up px-5 pt-8 pb-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-1">
        <p className="section-subtitle">música para tu práctica</p>
        <div className="w-8 h-8 rounded-xl bg-[#1DB954]/10 flex items-center justify-center">
          <Music2 size={16} className="text-[#1DB954]" />
        </div>
      </div>
      <h2 className="section-title mb-1">Playlist de Mili</h2>
      <p className="text-stone text-sm mb-5">
        Música seleccionada para acompañar cada momento de tu práctica 🎵
      </p>

      {/* Embed de Spotify */}
      <div className="zen-card overflow-hidden mb-4">
        <iframe
          title="Playlist Yoga con Mili"
          src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`}
          width="100%"
          height="380"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="block"
        />
      </div>

      {/* Botón abrir en app */}
      <button
        onClick={() => window.open(PLAYLIST_URL, '_blank', 'noopener,noreferrer')}
        className="w-full inline-flex items-center justify-center gap-2
                   bg-[#1DB954] text-white py-3.5 px-6 rounded-2xl
                   text-sm font-medium hover:bg-[#1ed760]
                   active:scale-95 transition-all duration-200"
      >
        Abrir en Spotify
        <ExternalLink size={15} />
      </button>

      <p className="text-center text-[11px] text-stone/60 mt-3">
        El embed funciona en el navegador · Para mejor experiencia usá la app de Spotify
      </p>
    </div>
  )
}
