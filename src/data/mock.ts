import type {
  User,
  Chat,
  Game,
  Message,
  ActivityItem,
  StrikeLogEntry,
  FriendRequest,
} from '../types';

export const currentUserId = 'user1';

export const users: User[] = [
  { id: 'user1', name: 'Alex', avatar: 'A', addCode: '48291035', strikes: 1, online: true },
  { id: 'user2', name: 'Jordan', avatar: 'J', addCode: '73019284', strikes: 0, online: true },
  { id: 'user3', name: 'Morgan', avatar: 'M', addCode: '59182736', strikes: 2, online: false },
  { id: 'user4', name: 'Riley', avatar: 'R', addCode: '84729103', strikes: 0, online: true },
  { id: 'user5', name: 'Casey', avatar: 'C', addCode: '61029384', strikes: 1, online: false },
  { id: 'user6', name: 'Taylor', avatar: 'T', addCode: '90381726', strikes: 0, online: true },
  { id: 'user7', name: 'Sam', avatar: 'S', addCode: '27491038', strikes: 3, online: false },
  { id: 'user8', name: 'Drew', avatar: 'D', addCode: '38201947', strikes: 0, online: true },
  { id: 'user9', name: 'Dakota', avatar: 'D', addCode: '55019283', strikes: 0, online: true },
  { id: 'user10', name: 'Jamie', avatar: 'J', addCode: '41928374', strikes: 1, online: false },
];

export const chats: Chat[] = [
  {
    id: 'chat1',
    name: 'NFL Sunday',
    members: [
      { userId: 'user1', points: 450, isKing: true, minorityWins: 3 },
      { userId: 'user2', points: 380, isKing: false, minorityWins: 1 },
      { userId: 'user3', points: 290, isKing: false, minorityWins: 0 },
      { userId: 'user4', points: 520, isKing: false, minorityWins: 2 },
      { userId: 'user5', points: 310, isKing: false, minorityWins: 1 },
    ],
    lastActivity: '2 min ago',
    activePrediction: {
      id: 'pred1',
      question: 'Who wins Bears vs Packers?',
      options: [
        { id: 'opt1', text: 'Bears', wagers: [{ userId: 'user2', amount: 40 }] },
        { id: 'opt2', text: 'Packers', wagers: [{ userId: 'user4', amount: 50 }, { userId: 'user5', amount: 30 }] },
      ],
      createdBy: 'user1',
      minWager: 20,
      resolvesAt: '2026-02-15T23:00:00Z',
      resolved: false,
    },
  },
  {
    id: 'chat2',
    name: 'College Ballers',
    members: [
      { userId: 'user1', points: 200, isKing: false, minorityWins: 1 },
      { userId: 'user3', points: 350, isKing: true, minorityWins: 2 },
      { userId: 'user6', points: 180, isKing: false, minorityWins: 0 },
      { userId: 'user8', points: 275, isKing: false, minorityWins: 1 },
    ],
    lastActivity: '15 min ago',
  },
  {
    id: 'chat3',
    name: 'Work League',
    members: [
      { userId: 'user1', points: 600, isKing: true, minorityWins: 4 },
      { userId: 'user2', points: 480, isKing: false, minorityWins: 2 },
      { userId: 'user4', points: 550, isKing: false, minorityWins: 3 },
      { userId: 'user6', points: 320, isKing: false, minorityWins: 0 },
      { userId: 'user7', points: 410, isKing: false, minorityWins: 1 },
    ],
    lastActivity: '1 hr ago',
    activePrediction: {
      id: 'pred2',
      question: 'Will Lakers beat Celtics by 10+?',
      options: [
        { id: 'opt3', text: 'Yes', wagers: [{ userId: 'user2', amount: 30 }] },
        { id: 'opt4', text: 'No', wagers: [{ userId: 'user4', amount: 60 }] },
      ],
      createdBy: 'user1',
      minWager: 15,
      resolvesAt: '2026-02-16T02:00:00Z',
      resolved: false,
    },
  },
  {
    id: 'chat4',
    name: 'Hoops Heads',
    members: [
      { userId: 'user1', points: 150, isKing: false, minorityWins: 0 },
      { userId: 'user5', points: 400, isKing: true, minorityWins: 3 },
      { userId: 'user7', points: 280, isKing: false, minorityWins: 1 },
      { userId: 'user8', points: 330, isKing: false, minorityWins: 2 },
    ],
    lastActivity: '3 hrs ago',
  },
];

export const games: Game[] = [
  {
    id: 'game1',
    teamA: { name: 'Bears', abbreviation: 'CHI', color: '#0B162A' },
    teamB: { name: 'Packers', abbreviation: 'GB', color: '#203731' },
    time: 'LIVE',
    live: true,
    scores: { teamA: 17, teamB: 21 },
    sport: 'NFL',
  },
  {
    id: 'game2',
    teamA: { name: 'Utah Utes', abbreviation: 'UTAH', color: '#CC0000' },
    teamB: { name: 'BYU Cougars', abbreviation: 'BYU', color: '#002E5D' },
    time: 'LIVE',
    live: true,
    scores: { teamA: 28, teamB: 24 },
    sport: 'NCAAF',
  },
  {
    id: 'game3',
    teamA: { name: 'Lakers', abbreviation: 'LAL', color: '#552583' },
    teamB: { name: 'Celtics', abbreviation: 'BOS', color: '#007A33' },
    time: '7:30 PM',
    live: false,
    sport: 'NBA',
  },
  {
    id: 'game4',
    teamA: { name: 'Yankees', abbreviation: 'NYY', color: '#003087' },
    teamB: { name: 'Red Sox', abbreviation: 'BOS', color: '#BD3039' },
    time: 'Tomorrow',
    live: false,
    sport: 'MLB',
  },
  {
    id: 'game5',
    teamA: { name: 'Bruins', abbreviation: 'BOS', color: '#FFB81C' },
    teamB: { name: 'Rangers', abbreviation: 'NYR', color: '#0038A8' },
    time: 'Fri 7PM',
    live: false,
    sport: 'NHL',
  },
  {
    id: 'game6',
    teamA: { name: 'Chiefs', abbreviation: 'KC', color: '#E31837' },
    teamB: { name: 'Bills', abbreviation: 'BUF', color: '#00338D' },
    time: '4:25 PM',
    live: false,
    sport: 'NFL',
  },
  {
    id: 'game7',
    teamA: { name: 'Warriors', abbreviation: 'GSW', color: '#1D428A' },
    teamB: { name: 'Suns', abbreviation: 'PHX', color: '#E56020' },
    time: '9:00 PM',
    live: false,
    sport: 'NBA',
  },
  {
    id: 'game8',
    teamA: { name: 'Alabama', abbreviation: 'BAMA', color: '#9E1B32' },
    teamB: { name: 'Georgia', abbreviation: 'UGA', color: '#BA0C2F' },
    time: 'Sat 3:30PM',
    live: false,
    sport: 'NCAAF',
  },
];

export const chatMessages: Record<string, Message[]> = {
  chat1: [
    { id: 'msg1', userId: 'system', text: 'New prediction is up! Who wins tonight?', timestamp: '6:45 PM', type: 'system' },
    { id: 'msg2', userId: 'user2', text: 'Bears are looking strong this season', timestamp: '6:47 PM', type: 'user' },
    { id: 'msg3', userId: 'user1', text: 'Packers always show up for divisional games', timestamp: '6:48 PM', type: 'user' },
    { id: 'msg4', userId: 'user4', text: 'Put my money on Packers, let\'s go!', timestamp: '6:50 PM', type: 'user' },
    { id: 'msg5', userId: 'user5', text: 'I\'m going with the underdog here', timestamp: '6:52 PM', type: 'user' },
    { id: 'msg6', userId: 'user1', text: 'This is gonna be close, great matchup', timestamp: '6:55 PM', type: 'user' },
    { id: 'msg7', userId: 'user3', text: 'Just watching for now, not sure who to pick', timestamp: '7:00 PM', type: 'user' },
  ],
  chat2: [
    { id: 'msg8', userId: 'system', text: 'Welcome to College Ballers!', timestamp: '2:00 PM', type: 'system' },
    { id: 'msg9', userId: 'user3', text: 'Big rivalry game coming up!', timestamp: '2:15 PM', type: 'user' },
    { id: 'msg10', userId: 'user1', text: 'Can\'t wait for the Utah BYU game', timestamp: '2:20 PM', type: 'user' },
    { id: 'msg11', userId: 'user6', text: 'BYU has been on a roll', timestamp: '2:30 PM', type: 'user' },
  ],
  chat3: [
    { id: 'msg12', userId: 'system', text: 'New prediction is up! Will Lakers win by 10+?', timestamp: '11:00 AM', type: 'system' },
    { id: 'msg13', userId: 'user2', text: 'No way Lakers cover that spread', timestamp: '11:05 AM', type: 'user' },
    { id: 'msg14', userId: 'user4', text: 'Agreed, Celtics are too good', timestamp: '11:10 AM', type: 'user' },
    { id: 'msg15', userId: 'user1', text: 'I think it\'ll be close but Lakers pull it off', timestamp: '11:15 AM', type: 'user' },
  ],
  chat4: [
    { id: 'msg16', userId: 'system', text: 'Welcome to Hoops Heads!', timestamp: '9:00 AM', type: 'system' },
    { id: 'msg17', userId: 'user5', text: 'Great games on the schedule this week', timestamp: '9:15 AM', type: 'user' },
    { id: 'msg18', userId: 'user8', text: 'Warriors Suns is gonna be a great one', timestamp: '9:30 AM', type: 'user' },
  ],
};

export const activityItems: ActivityItem[] = [
  { id: 'act1', chatName: 'NFL Sunday', question: 'Who wins Bears vs Packers?', yourPick: 'Packers', result: 'pending', pointsChange: 0, date: 'Today' },
  { id: 'act2', chatName: 'Work League', question: 'Will Lakers beat Celtics by 10+?', yourPick: 'Yes', result: 'pending', pointsChange: 0, date: 'Today' },
  { id: 'act3', chatName: 'NFL Sunday', question: 'Over/Under 45.5 total points Chiefs vs Bills?', yourPick: 'Over', result: 'won', pointsChange: 80, date: 'Yesterday' },
  { id: 'act4', chatName: 'College Ballers', question: 'Who covers the spread: Alabama vs Georgia?', yourPick: 'Alabama', result: 'lost', pointsChange: -30, date: 'Yesterday' },
  { id: 'act5', chatName: 'Hoops Heads', question: 'Warriors or Suns tonight?', yourPick: 'Warriors', result: 'won', pointsChange: 60, date: '2 days ago' },
  { id: 'act6', chatName: 'Work League', question: 'Will there be overtime in Bruins vs Rangers?', yourPick: 'No', result: 'won', pointsChange: 45, date: '3 days ago' },
  { id: 'act7', chatName: 'NFL Sunday', question: 'First TD scorer: Bears vs Packers?', yourPick: 'D. Adams', result: 'lost', pointsChange: -25, date: '4 days ago' },
  { id: 'act8', chatName: 'College Ballers', question: 'Utah or BYU straight up?', yourPick: 'Utah', result: 'won', pointsChange: 55, date: '5 days ago' },
];

export const strikeLog: StrikeLogEntry[] = [
  { id: 'sl1', reason: 'Changed prediction after lock', date: 'Today', strikes: 1 },
  { id: 'sl2', reason: 'Clean day', date: 'Yesterday', strikes: 0 },
  { id: 'sl3', reason: 'Late submission x2', date: '2 days ago', strikes: 2 },
  { id: 'sl4', reason: 'Clean day', date: '3 days ago', strikes: 0 },
  { id: 'sl5', reason: 'Disputed resolution', date: '4 days ago', strikes: 1 },
  { id: 'sl6', reason: 'Clean day', date: '5 days ago', strikes: 0 },
];

export const friendRequests: FriendRequest[] = [
  { userId: 'user9', name: 'Dakota', avatar: 'D' },
  { userId: 'user10', name: 'Jamie', avatar: 'J' },
];

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function getCurrentUser(): User {
  return users.find((u) => u.id === currentUserId)!;
}

export function getChatById(id: string): Chat | undefined {
  return chats.find((c) => c.id === id);
}

export function getKingOfChat(chat: Chat): User | undefined {
  const kingMember = chat.members.find((m) => m.isKing);
  if (!kingMember) return undefined;
  return getUserById(kingMember.userId);
}

export function getUserMembership(chat: Chat, userId: string) {
  return chat.members.find((m) => m.userId === userId);
}

export function isUserKing(chat: Chat, userId: string): boolean {
  const member = getUserMembership(chat, userId);
  return member?.isKing ?? false;
}

export function getPotTotal(prediction: { options: { wagers: { amount: number }[] }[] }): number {
  return prediction.options.reduce(
    (total, opt) => total + opt.wagers.reduce((sum, w) => sum + w.amount, 0),
    0
  );
}

export function getFriends(): User[] {
  return users.filter((u) => u.id !== currentUserId && !friendRequests.some((fr) => fr.userId === u.id));
}
