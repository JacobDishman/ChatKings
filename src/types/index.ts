export interface User {
  id: string;
  name: string;
  avatar: string;
  addCode: string;
  strikes: number;
  online?: boolean;
}

export interface PredictionWager {
  userId: string;
  amount: number;
}

export interface PredictionOption {
  id: string;
  text: string;
  wagers: PredictionWager[];
}

export interface Prediction {
  id: string;
  question: string;
  options: PredictionOption[];
  createdBy: string;
  minWager: number;
  resolvesAt: string;
  resolved: boolean;
  correctOptionId?: string;
}

export interface ChatMember {
  userId: string;
  points: number;
  isKing: boolean;
  minorityWins: number;
}

export interface Chat {
  id: string;
  name: string;
  members: ChatMember[];
  lastActivity: string;
  activePrediction?: Prediction;
}

export interface GameTeam {
  name: string;
  abbreviation: string;
  color: string;
}

export interface Game {
  id: string;
  teamA: GameTeam;
  teamB: GameTeam;
  time: string;
  live: boolean;
  scores?: { teamA: number; teamB: number };
  sport: string;
}

export interface Message {
  id: string;
  userId: string;
  text: string;
  timestamp: string;
  type: 'user' | 'system' | 'prediction';
}

export interface ActivityItem {
  id: string;
  chatName: string;
  question: string;
  yourPick: string;
  result: 'won' | 'lost' | 'pending';
  pointsChange: number;
  date: string;
}

export interface StrikeLogEntry {
  id: string;
  reason: string;
  date: string;
  strikes: number;
}

export interface FriendRequest {
  userId: string;
  name: string;
  avatar: string;
}
