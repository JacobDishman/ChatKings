import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, MessageCircle, Users, Menu } from 'lucide-react';
import StrikeBadge from './StrikeBadge';
import { getCurrentUser } from '../data/mock';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/chats', icon: MessageCircle, label: 'Chats' },
  { to: '/friends', icon: Users, label: 'Friends' },
  { to: '/menu', icon: Menu, label: 'Menu' },
];

export default function AppShell() {
  const user = getCurrentUser();
  const location = useLocation();

  const hideShell =
    location.pathname.startsWith('/chat/') ||
    location.pathname === '/rules';

  if (hideShell) {
    return (
      <div className="mx-auto max-w-md min-h-screen bg-bg">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md min-h-screen bg-bg flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-surface border-b border-surface-lighter px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold text-xl tracking-tight">ChatKings</span>
        </div>
        <StrikeBadge strikes={user.strikes} />
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-surface border-t border-surface-lighter z-40">
        <div className="flex items-center justify-around py-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-1 relative ${
                  isActive ? 'text-primary' : 'text-gray-500'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                  )}
                  <Icon size={20} />
                  <span className="text-[10px] font-medium">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
