import { useState } from 'react'
import type { Message } from '@/types'
import { messages as mockMessages, currentUser } from '@/data/mock'

export function useLocalMessages(chatId: string) {
  const [messages, setMessages] = useState<Message[]>(
    () => mockMessages[chatId] ?? []
  )

  const addMessage = (text: string) => {
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      chatId,
      userId: currentUser.id,
      text,
      timestamp: new Date().toISOString(),
      type: 'user',
    }
    setMessages(prev => [...prev, newMsg])
  }

  return { messages, addMessage }
}
