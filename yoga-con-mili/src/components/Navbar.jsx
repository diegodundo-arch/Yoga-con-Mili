import { Home, CalendarDays, BookOpen, Play, ShoppingBag, Music2 } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'home',    label: 'Inicio',   Icon: Home        },
  { id: 'booking', label: 'Clases',   Icon: CalendarDays },
  { id: 'tips',    label: 'Tips',     Icon: BookOpen     },
  { id: 'videos',  label: 'Videos',   Icon: Play         },
  { id: 'shop',    label: 'Tienda',   Icon: ShoppingBag  },
  { id: 'spotify', label: 'Música',   Icon: Music2       },
]

export default function Navbar({ active, onNavigate }) {
  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md
                 bg-white/90 backdrop-blur-md border-t border-beige/70
                 flex items-center justify-around
                 px-1 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]
                 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
      role="navigation"
      aria-label="Navegación principal"
    >
      {NAV_ITEMS.map(({ id, label, Icon }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            aria-current={isActive ? 'page' : undefined}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-2xl
                        transition-all duration-200 min-w-[48px]
                        ${isActive
                          ? 'text-deep-green'
                          : 'text-stone hover:text-driftwood'
                        }`}
          >
            <span className={`p-1.5 rounded-xl transition-all duration-200
                              ${isActive ? 'bg-linen' : ''}`}>
              <Icon
                size={20}
                strokeWidth={isActive ? 2 : 1.5}
              />
            </span>
            <span className={`text-[9px] font-medium tracking-wide transition-all
                              ${isActive ? 'text-deep-green' : 'text-stone'}`}>
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
