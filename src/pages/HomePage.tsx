import LiveGames from '../components/LiveGames';
import GroupChats from '../components/GroupChats';
import UpcomingGames from '../components/UpcomingGames';

export default function HomePage() {
  return (
    <div>
      <LiveGames />
      <GroupChats />
      <UpcomingGames />
    </div>
  );
}
