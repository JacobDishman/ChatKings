import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppShell from './components/AppShell';
import HomePage from './pages/HomePage';
import ChatsPage from './pages/ChatsPage';
import ChatDetailPage from './pages/ChatDetailPage';
import CreatePredictionPage from './pages/CreatePredictionPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ActivityPage from './pages/ActivityPage';
import FriendsPage from './pages/FriendsPage';
import MenuPage from './pages/MenuPage';
import RulesPage from './pages/RulesPage';
import NotFoundPage from './pages/NotFoundPage';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/chats" element={<ChatsPage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/menu" element={<MenuPage />} />
          </Route>
          <Route
            path="/chat/:id"
            element={
              <div className="mx-auto max-w-md min-h-screen bg-bg">
                <ChatDetailPage />
              </div>
            }
          />
          <Route
            path="/chat/:id/create-prediction"
            element={
              <div className="mx-auto max-w-md min-h-screen bg-bg">
                <CreatePredictionPage />
              </div>
            }
          />
          <Route
            path="/chat/:id/leaderboard"
            element={
              <div className="mx-auto max-w-md min-h-screen bg-bg">
                <LeaderboardPage />
              </div>
            }
          />
          <Route
            path="/rules"
            element={
              <div className="mx-auto max-w-md min-h-screen bg-bg">
                <RulesPage />
              </div>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
