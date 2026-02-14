import { useState } from 'react'
import { Send } from 'lucide-react'

interface ChatInputProps {
  onSend: (text: string) => void
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState('')

  const handleSend = () => {
    const trimmed = text.trim()
    if (trimmed) {
      onSend(trimmed)
      setText('')
    }
  }

  return (
    <div className="sticky bottom-16 bg-white border-t border-gray-100 px-4 py-3 flex gap-2">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSend()}
        placeholder="Message..."
        className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand/20"
      />
      <button
        onClick={handleSend}
        disabled={!text.trim()}
        className="w-9 h-9 bg-brand rounded-full flex items-center justify-center text-white hover:bg-brand-dark transition-colors disabled:opacity-50 shrink-0"
      >
        <Send size={16} />
      </button>
    </div>
  )
}
