import { useState } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, Clock, Users } from 'lucide-react'

// ── Datos placeholder de clases ──────────────────────────────────────────────
// Reemplazar con fetch a tu backend / Notion / Google Calendar
const CLASSES = [
  { id: 1, name: 'Flow matutino',     time: '08:00',  duration: '60 min', spots: 4, type: 'Hatha'      },
  { id: 2, name: 'Restaurativa',      time: '10:30',  duration: '75 min', spots: 6, type: 'Restaurativa'},
  { id: 3, name: 'Vinyasa express',   time: '18:00',  duration: '45 min', spots: 2, type: 'Vinyasa'     },
  { id: 4, name: 'Yin & meditación',  time: '20:00',  duration: '90 min', spots: 5, type: 'Yin'         },
]

// URL de Mercado Pago — reemplazar con tu link real
const MERCADOPAGO_URL = 'http://link.mercadopago.com.ar/yogaconmili'

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const MONTHS = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre',
]

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

const TYPE_COLORS = {
  Hatha:       'bg-sage/20 text-deep-green',
  Restaurativa:'bg-linen text-driftwood',
  Vinyasa:     'bg-clay/10 text-clay',
  Yin:         'bg-beige text-driftwood',
}

export default function BookingCalendar() {
  const today = new Date()
  const [currentYear, setCurrentYear]   = useState(today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [selectedDay, setSelectedDay]   = useState(today.getDate())
  const [selectedClass, setSelectedClass] = useState(null)

  const daysInMonth  = getDaysInMonth(currentYear, currentMonth)
  const firstWeekDay = getFirstDayOfMonth(currentYear, currentMonth)

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentYear(y => y - 1); setCurrentMonth(11) }
    else setCurrentMonth(m => m - 1)
    setSelectedDay(null)
  }
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentYear(y => y + 1); setCurrentMonth(0) }
    else setCurrentMonth(m => m + 1)
    setSelectedDay(null)
  }

  const handleBook = () => {
    if (!selectedClass) return
    window.open(MERCADOPAGO_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="animate-slide-up px-5 pt-8 pb-4">
      {/* Header */}
      <p className="section-subtitle mb-1">reserva tu lugar</p>
      <h2 className="section-title mb-6">Clases presenciales</h2>

      {/* ── Calendario ── */}
      <div className="zen-card p-4 mb-5">
        {/* Navegación mes */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="p-2 rounded-xl hover:bg-linen transition-colors"
            aria-label="Mes anterior"
          >
            <ChevronLeft size={18} className="text-stone" />
          </button>
          <span className="font-medium text-deep-green text-sm">
            {MONTHS[currentMonth]} {currentYear}
          </span>
          <button
            onClick={nextMonth}
            className="p-2 rounded-xl hover:bg-linen transition-colors"
            aria-label="Mes siguiente"
          >
            <ChevronRight size={18} className="text-stone" />
          </button>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map(d => (
            <div key={d} className="text-center text-[10px] text-stone font-medium py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Grid de días */}
        <div className="grid grid-cols-7 gap-0.5">
          {Array.from({ length: firstWeekDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
            const isToday =
              day === today.getDate() &&
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear()
            const isSelected = day === selectedDay

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`aspect-square flex items-center justify-center text-sm rounded-xl
                            transition-all duration-150 font-medium
                            ${isSelected
                              ? 'bg-deep-green text-white'
                              : isToday
                              ? 'bg-linen text-deep-green ring-1 ring-tan'
                              : 'hover:bg-linen text-deep-green'
                            }`}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Clases disponibles ── */}
      {selectedDay && (
        <div className="animate-slide-up">
          <p className="section-subtitle mb-3">
            {selectedDay} de {MONTHS[currentMonth]}
          </p>
          <div className="flex flex-col gap-3">
            {CLASSES.map(cls => {
              const isSelected = selectedClass?.id === cls.id
              return (
                <button
                  key={cls.id}
                  onClick={() => setSelectedClass(isSelected ? null : cls)}
                  className={`zen-card p-4 text-left transition-all duration-200
                              ${isSelected
                                ? 'ring-2 ring-deep-green shadow-md'
                                : 'hover:shadow-md'
                              }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full
                                         ${TYPE_COLORS[cls.type] || 'bg-linen text-stone'}`}>
                          {cls.type}
                        </span>
                      </div>
                      <p className="font-medium text-deep-green">{cls.name}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="flex items-center gap-1 text-xs text-stone">
                          <Clock size={12} /> {cls.time}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-stone">
                          {cls.duration}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-sage">
                          <Users size={12} /> {cls.spots} lugares
                        </span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 mt-1 shrink-0 transition-all
                                    ${isSelected
                                      ? 'bg-deep-green border-deep-green'
                                      : 'border-stone'
                                    }`} />
                  </div>
                </button>
              )
            })}
          </div>

          {/* CTA pago */}
          {selectedClass && (
            <div className="mt-5 animate-slide-up">
              <div className="bg-linen rounded-2xl p-4 mb-3 text-sm text-stone">
                <span className="font-medium text-deep-green">{selectedClass.name}</span>
                {' · '}{selectedDay} {MONTHS[currentMonth]} · {selectedClass.time}
              </div>
              <button onClick={handleBook} className="btn-primary w-full">
                Reservar con Mercado Pago
                <ExternalLink size={16} />
              </button>
              <p className="text-center text-xs text-stone mt-2">
                Serás redirigido a Mercado Pago para completar el pago
              </p>
            </div>
          )}
        </div>
      )}

      {!selectedDay && (
        <p className="text-center text-stone text-sm py-6">
          Seleccioná un día para ver las clases disponibles ✨
        </p>
      )}
    </div>
  )
}
