import { games, chats } from '@/data/mock'
import LiveGames from '@/components/home/LiveGames'
import MyGroups from '@/components/home/MyGroups'
import UpcomingGames from '@/components/home/UpcomingGames'

export default function HomePage() {
  const liveGames = games.filter(g => g.live)
  const upcomingGames = games.filter(g => !g.live)

  return (
    <div className="p-4 space-y-6">
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Live & Upcoming</h2>
          <span className="text-xs font-medium text-red-500">{liveGames.length} Live</span>
        </div>
        <LiveGames games={[...liveGames, ...upcomingGames]} />
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">My Groups</h2>
        <MyGroups chats={chats} />
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Upcoming</h2>
        <UpcomingGames games={upcomingGames} />
      </section>
    </div>
  )
}
