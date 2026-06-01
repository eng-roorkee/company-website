import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppFloatingButton from './WhatsAppFloatingButton'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-meat-cream text-meat-dark">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  )
}
