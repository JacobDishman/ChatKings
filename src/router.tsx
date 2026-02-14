import { createBrowserRouter } from 'react-router-dom'
import AppShell from '@/components/layout/AppShell'
import HomePage from '@/pages/HomePage'
import ChatsPage from '@/pages/ChatsPage'
import ChatDetailPage from '@/pages/ChatDetailPage'
import CreatePredictionPage from '@/pages/CreatePredictionPage'
import LeaderboardPage from '@/pages/LeaderboardPage'
import ActivityPage from '@/pages/ActivityPage'
import FriendsPage from '@/pages/FriendsPage'
import MenuPage from '@/pages/MenuPage'
import RulesPage from '@/pages/RulesPage'
import NotFoundPage from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/chats', element: <ChatsPage /> },
      { path: '/chat/:id', element: <ChatDetailPage /> },
      { path: '/chat/:id/create-prediction', element: <CreatePredictionPage /> },
      { path: '/chat/:id/leaderboard', element: <LeaderboardPage /> },
      { path: '/activity', element: <ActivityPage /> },
      { path: '/friends', element: <FriendsPage /> },
      { path: '/menu', element: <MenuPage /> },
      { path: '/rules', element: <RulesPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
