import { Outlet } from 'react-router-dom'
import Header from './Header'
import BottomNav from './BottomNav'

export default function AppShell() {
  return (
    <div className="bg-gray-900 min-h-screen flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-gray-50 flex flex-col relative shadow-2xl">
        <Header />
        <main className="flex-1 overflow-y-auto pb-20">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
