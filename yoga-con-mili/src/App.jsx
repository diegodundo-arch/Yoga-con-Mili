import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import BookingCalendar from './components/BookingCalendar'
import DailyTips from './components/DailyTips'
import VideoGallery from './components/VideoGallery'
import Marketplace from './components/Marketplace'
import SpotifySection from './components/SpotifySection'

const VIEWS = {
  home:    Home,
  booking: BookingCalendar,
  tips:    DailyTips,
  videos:  VideoGallery,
  shop:    Marketplace,
  spotify: SpotifySection,
}

export default function App() {
  const [activeView, setActiveView] = useState('home')

  const View = VIEWS[activeView] ?? Home

  return (
    <div className="min-h-dvh bg-off-white flex flex-col max-w-md mx-auto relative">
      <main className="flex-1 overflow-y-auto pb-24 animate-fade-in">
        <View navigate={setActiveView} />
      </main>
      <Navbar active={activeView} onNavigate={setActiveView} />
    </div>
  )
}
