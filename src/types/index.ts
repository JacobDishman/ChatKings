export interface User {
  id: string
  name: string
  avatar: string
  addCode: string
  strikes: number
  online?: boolean
}

export interface ChatMember {
  userId: string
  points: number
  isKing: boolean
  minorityWins: number
}

export interface PredictionOption {
  id: string
  text: string
  wagers: Array<{
    userId: string
    amount: number
  }>
}

export interface Prediction {
  id: string
  question: string
  options: PredictionOption[]
  createdBy: string
  minWager: number
  resolvesAt: string
  resolved: boolean
  correctOptionId?: string
}

export interface Chat {
  id: string
  name: string
  members: ChatMember[]
  lastActivity: string
  activePrediction?: Prediction
}

export interface Message {
  id: string
  chatId: string
  userId: string
  text: string
  timestamp: string
  type: 'user' | 'system' | 'prediction'
}

export interface Game {
  id: string
  teamA: {
    name: string
    abbr: string
    color: string
  }
  teamB: {
    name: string
    abbr: string
    color: string
  }
  time: string
  live: boolean
  scores?: {
    teamA: number
    teamB: number
    quarter?: string
  }
  sport: 'NFL' | 'NBA' | 'NCAAF' | 'MLB' | 'NHL'
}

export interface ActivityItem {
  id: string
  chatName: string
  question: string
  yourPick: string
  result: 'win' | 'loss' | 'pending'
  pointsChange: number
  date: string
}

export interface StrikeLogEntry {
  id: string
  reason: string
  date: string
  strikeCount: number
}

export interface FriendRequest {
  id: string
  userId: string
  date: string
}
