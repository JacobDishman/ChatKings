import type { User, Chat, Game, Message, ActivityItem, StrikeLogEntry, FriendRequest } from '@/types'

export const currentUser: User = {
  id: 'user-1',
  name: 'You',
  avatar: 'Y',
  addCode: '48291035',
  strikes: 1,
  online: true,
}

export const users: User[] = [
  currentUser,
  { id: 'user-2', name: 'Marcus', avatar: 'M', addCode: '73615284', strikes: 0, online: true },
  { id: 'user-3', name: 'Jenna', avatar: 'J', addCode: '92047361', strikes: 0, online: true },
  { id: 'user-4', name: 'David', avatar: 'D', addCode: '15839274', strikes: 2, online: false },
  { id: 'user-5', name: 'Sofia', avatar: 'S', addCode: '46720183', strikes: 0, online: true },
  { id: 'user-6', name: 'Tyler', avatar: 'T', addCode: '83051947', strikes: 1, online: false },
  { id: 'user-7', name: 'Ava', avatar: 'A', addCode: '60493812', strikes: 0, online: true },
  { id: 'user-8', name: 'Liam', avatar: 'L', addCode: '27184063', strikes: 0, online: false },
]

export const games: Game[] = [
  {
    id: 'game-1',
    teamA: { name: 'Bears', abbr: 'CHI', color: '#0B162A' },
    teamB: { name: 'Packers', abbr: 'GB', color: '#203731' },
    time: 'LIVE',
    live: true,
    scores: { teamA: 17, teamB: 21, quarter: 'Q3 4:21' },
    sport: 'NFL',
  },
  {
    id: 'game-2',
    teamA: { name: 'Utah', abbr: 'UTAH', color: '#CC0000' },
    teamB: { name: 'BYU', abbr: 'BYU', color: '#002E5D' },
    time: 'LIVE',
    live: true,
    scores: { teamA: 14, teamB: 28, quarter: '3rd Qtr' },
    sport: 'NCAAF',
  },
  {
    id: 'game-3',
    teamA: { name: 'Lakers', abbr: 'LAL', color: '#552583' },
    teamB: { name: 'Celtics', abbr: 'BOS', color: '#007A33' },
    time: '7:30 PM',
    live: false,
    sport: 'NBA',
  },
  {
    id: 'game-4',
    teamA: { name: 'Chiefs', abbr: 'KC', color: '#E31837' },
    teamB: { name: 'Bills', abbr: 'BUF', color: '#00338D' },
    time: 'Tomorrow',
    live: false,
    sport: 'NFL',
  },
  {
    id: 'game-5',
    teamA: { name: 'Yankees', abbr: 'NYY', color: '#003087' },
    teamB: { name: 'Dodgers', abbr: 'LAD', color: '#005A9C' },
    time: 'Fri 7PM',
    live: false,
    sport: 'MLB',
  },
  {
    id: 'game-6',
    teamA: { name: 'Bruins', abbr: 'BOS', color: '#FFB81C' },
    teamB: { name: 'Rangers', abbr: 'NYR', color: '#0038A8' },
    time: 'Sat 8PM',
    live: false,
    sport: 'NHL',
  },
  {
    id: 'game-7',
    teamA: { name: 'Alabama', abbr: 'BAMA', color: '#9E1B32' },
    teamB: { name: 'Georgia', abbr: 'UGA', color: '#BA0C2F' },
    time: 'Sat 3:30 PM',
    live: false,
    sport: 'NCAAF',
  },
  {
    id: 'game-8',
    teamA: { name: 'Suns', abbr: 'PHX', color: '#1D1160' },
    teamB: { name: 'Nuggets', abbr: 'DEN', color: '#0E2240' },
    time: 'Sun 6PM',
    live: false,
    sport: 'NBA',
  },
]

export const chats: Chat[] = [
  {
    id: 'chat-1',
    name: 'NFL Sunday',
    members: [
      { userId: 'user-1', points: 450, isKing: false, minorityWins: 2 },
      { userId: 'user-2', points: 680, isKing: true, minorityWins: 3 },
      { userId: 'user-3', points: 320, isKing: false, minorityWins: 1 },
      { userId: 'user-4', points: 290, isKing: false, minorityWins: 0 },
      { userId: 'user-5', points: 510, isKing: false, minorityWins: 2 },
    ],
    lastActivity: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    activePrediction: {
      id: 'pred-1',
      question: 'Who wins Bears vs Packers?',
      options: [
        {
          id: 'opt-1',
          text: 'Bears',
          wagers: [
            { userId: 'user-3', amount: 50 },
            { userId: 'user-5', amount: 30 },
          ],
        },
        {
          id: 'opt-2',
          text: 'Packers',
          wagers: [
            { userId: 'user-2', amount: 40 },
          ],
        },
      ],
      createdBy: 'user-2',
      minWager: 20,
      resolvesAt: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
      resolved: false,
    },
  },
  {
    id: 'chat-2',
    name: 'College Ballers',
    members: [
      { userId: 'user-1', points: 380, isKing: true, minorityWins: 1 },
      { userId: 'user-6', points: 250, isKing: false, minorityWins: 0 },
      { userId: 'user-7', points: 340, isKing: false, minorityWins: 2 },
      { userId: 'user-8', points: 190, isKing: false, minorityWins: 0 },
    ],
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'chat-3',
    name: 'Work League',
    members: [
      { userId: 'user-1', points: 520, isKing: false, minorityWins: 1 },
      { userId: 'user-2', points: 610, isKing: false, minorityWins: 2 },
      { userId: 'user-4', points: 780, isKing: true, minorityWins: 4 },
      { userId: 'user-6', points: 430, isKing: false, minorityWins: 1 },
      { userId: 'user-8', points: 350, isKing: false, minorityWins: 0 },
    ],
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 'chat-4',
    name: 'Hoops Heads',
    members: [
      { userId: 'user-1', points: 290, isKing: false, minorityWins: 0 },
      { userId: 'user-3', points: 410, isKing: true, minorityWins: 3 },
      { userId: 'user-5', points: 360, isKing: false, minorityWins: 1 },
      { userId: 'user-7', points: 280, isKing: false, minorityWins: 1 },
    ],
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
]

export const messages: Record<string, Message[]> = {
  'chat-1': [
    { id: 'msg-1', chatId: 'chat-1', userId: 'system', text: 'Marcus became the King!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), type: 'system' },
    { id: 'msg-2', chatId: 'chat-1', userId: 'user-2', text: 'Ready for game day! Bears vs Packers is gonna be lit', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), type: 'user' },
    { id: 'msg-3', chatId: 'chat-1', userId: 'user-1', text: 'Bears are due for a win honestly', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5).toISOString(), type: 'user' },
    { id: 'msg-4', chatId: 'chat-1', userId: 'system', text: 'New prediction is up! Who wins Bears vs Packers?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), type: 'prediction' },
    { id: 'msg-5', chatId: 'chat-1', userId: 'user-3', text: 'Going with the Bears on this one 🐻', timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(), type: 'user' },
    { id: 'msg-6', chatId: 'chat-1', userId: 'user-5', text: 'Same, Bears look strong this week', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), type: 'user' },
    { id: 'msg-7', chatId: 'chat-1', userId: 'user-2', text: 'You guys are sleeping on Rodgers', timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), type: 'user' },
    { id: 'msg-8', chatId: 'chat-1', userId: 'user-1', text: 'We\'ll see about that!', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), type: 'user' },
  ],
  'chat-2': [
    { id: 'msg-20', chatId: 'chat-2', userId: 'system', text: 'You became the King!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), type: 'system' },
    { id: 'msg-21', chatId: 'chat-2', userId: 'user-7', text: 'College ball hits different on Saturdays', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), type: 'user' },
    { id: 'msg-22', chatId: 'chat-2', userId: 'user-1', text: 'BYU is gonna crush it this weekend', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), type: 'user' },
    { id: 'msg-23', chatId: 'chat-2', userId: 'user-6', text: 'Utah is looking rough this season ngl', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), type: 'user' },
    { id: 'msg-24', chatId: 'chat-2', userId: 'user-8', text: 'Someone post a prediction!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), type: 'user' },
  ],
  'chat-3': [
    { id: 'msg-30', chatId: 'chat-3', userId: 'system', text: 'David became the King!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), type: 'system' },
    { id: 'msg-31', chatId: 'chat-3', userId: 'user-4', text: 'Alright team, who we got for the NFL slate?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), type: 'user' },
    { id: 'msg-32', chatId: 'chat-3', userId: 'user-2', text: 'Chiefs all day every day', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(), type: 'user' },
    { id: 'msg-33', chatId: 'chat-3', userId: 'user-1', text: 'Bills are looking scary good lately', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), type: 'user' },
  ],
  'chat-4': [
    { id: 'msg-40', chatId: 'chat-4', userId: 'system', text: 'Jenna became the King!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), type: 'system' },
    { id: 'msg-41', chatId: 'chat-4', userId: 'user-3', text: 'Lakers vs Celtics tonight! Classic matchup', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(), type: 'user' },
    { id: 'msg-42', chatId: 'chat-4', userId: 'user-5', text: 'LeBron is going to go off', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), type: 'user' },
    { id: 'msg-43', chatId: 'chat-4', userId: 'user-7', text: 'Celtics defense is no joke tho', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), type: 'user' },
    { id: 'msg-44', chatId: 'chat-4', userId: 'user-1', text: 'This should be a great game either way', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), type: 'user' },
  ],
}

export const activityItems: ActivityItem[] = [
  { id: 'act-1', chatName: 'NFL Sunday', question: 'Who wins Chiefs vs Bills?', yourPick: 'Chiefs', result: 'win', pointsChange: 80, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() },
  { id: 'act-2', chatName: 'Hoops Heads', question: 'Lakers vs Celtics total over 210?', yourPick: 'Over', result: 'loss', pointsChange: -30, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString() },
  { id: 'act-3', chatName: 'Work League', question: 'Who wins Packers vs 49ers?', yourPick: '49ers', result: 'win', pointsChange: 65, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString() },
  { id: 'act-4', chatName: 'College Ballers', question: 'BYU vs Utah - who covers the spread?', yourPick: 'BYU', result: 'win', pointsChange: 120, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString() },
  { id: 'act-5', chatName: 'NFL Sunday', question: 'Bears vs Lions - total TDs over 5.5?', yourPick: 'Under', result: 'loss', pointsChange: -50, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString() },
  { id: 'act-6', chatName: 'Hoops Heads', question: 'Suns vs Nuggets winner?', yourPick: 'Nuggets', result: 'win', pointsChange: 45, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString() },
  { id: 'act-7', chatName: 'Work League', question: 'Yankees vs Dodgers - who hits first HR?', yourPick: 'Yankees', result: 'loss', pointsChange: -40, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString() },
  { id: 'act-8', chatName: 'NFL Sunday', question: 'Who wins Bears vs Packers?', yourPick: 'Bears', result: 'pending', pointsChange: 0, date: new Date().toISOString() },
]

export const strikeLog: StrikeLogEntry[] = [
  { id: 'strike-1', reason: 'Changed prediction after lock', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), strikeCount: 1 },
  { id: 'strike-2', reason: 'Clean day', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), strikeCount: 0 },
  { id: 'strike-3', reason: 'Late submission x2', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), strikeCount: 2 },
  { id: 'strike-4', reason: 'Disputed resolution', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(), strikeCount: 1 },
  { id: 'strike-5', reason: 'Clean day', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(), strikeCount: 0 },
]

export const friendRequests: FriendRequest[] = [
  { id: 'req-1', userId: 'user-6', date: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString() },
  { id: 'req-2', userId: 'user-8', date: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString() },
]

export function getUserById(id: string): User | undefined {
  return users.find(u => u.id === id)
}

export function getChatById(id: string): Chat | undefined {
  return chats.find(c => c.id === id)
}
