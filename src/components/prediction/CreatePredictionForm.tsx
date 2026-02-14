import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react'

interface CreatePredictionFormProps {
  chatId: string
}

export default function CreatePredictionForm({ chatId }: CreatePredictionFormProps) {
  const navigate = useNavigate()
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', ''])
  const [minWager, setMinWager] = useState(10)
  const [kingsPick, setKingsPick] = useState<number | null>(null)
  const [kingsWager, setKingsWager] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const addOption = () => {
    if (options.length < 6) setOptions([...options, ''])
  }

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const next = options.filter((_, i) => i !== index)
      setOptions(next)
      if (kingsPick === index) setKingsPick(null)
      else if (kingsPick !== null && kingsPick > index) setKingsPick(kingsPick - 1)
    }
  }

  const updateOption = (index: number, value: string) => {
    const next = [...options]
    next[index] = value
    setOptions(next)
  }

  const allOptionsFilled = options.every(o => o.trim() !== '')
  const isValid =
    question.trim() !== '' &&
    allOptionsFilled &&
    minWager >= 1 &&
    kingsPick !== null &&
    Number(kingsWager) >= minWager

  const handlePost = () => {
    if (isValid) {
      navigate(`/chat/${chatId}`)
    }
  }

  return (
    <div className="p-4 space-y-5">
      {/* Question */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="e.g., Who wins Lakers vs Celtics?"
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20"
        />
      </div>

      {/* Options */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Answer Options</label>
        <div className="space-y-2">
          {options.map((opt, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={opt}
                onChange={e => updateOption(i, e.target.value)}
                placeholder={`Option ${i + 1}`}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand"
              />
              {options.length > 2 && (
                <button
                  onClick={() => removeOption(i)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
        {options.length < 6 && (
          <button
            onClick={addOption}
            className="mt-2 flex items-center gap-1 text-sm text-brand font-medium hover:text-brand-dark transition-colors"
          >
            <Plus size={16} />
            Add Option
          </button>
        )}
      </div>

      {/* Min Wager */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Wager</label>
        <input
          type="number"
          value={minWager}
          onChange={e => setMinWager(Math.max(1, Number(e.target.value)))}
          min={1}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand"
        />
      </div>

      {/* King's Pick */}
      {allOptionsFilled && options.some(o => o.trim()) && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Pick (Required)</label>
          <div className="grid grid-cols-2 gap-2">
            {options.map((opt, i) => (
              opt.trim() && (
                <button
                  key={i}
                  onClick={() => setKingsPick(i)}
                  className={`p-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                    kingsPick === i
                      ? 'border-brand bg-brand/5 text-brand'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {opt}
                </button>
              )
            ))}
          </div>
        </div>
      )}

      {/* King's Wager */}
      {kingsPick !== null && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Wager</label>
          <input
            type="number"
            value={kingsWager}
            onChange={e => setKingsWager(e.target.value)}
            placeholder={`Min ${minWager}`}
            min={minWager}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand"
          />
        </div>
      )}

      {/* Preview Toggle */}
      <button
        onClick={() => setShowPreview(!showPreview)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
        {showPreview ? 'Hide Preview' : 'Show Preview'}
      </button>

      {/* Preview */}
      {showPreview && question.trim() && (
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <p className="text-xs font-bold text-brand uppercase mb-2">Preview</p>
          <h4 className="font-semibold text-gray-900 text-sm mb-2">{question}</h4>
          <div className="space-y-1.5">
            {options.map((opt, i) => (
              opt.trim() && (
                <div
                  key={i}
                  className={`px-3 py-2 rounded-lg text-sm ${
                    kingsPick === i ? 'bg-brand/10 text-brand font-medium' : 'bg-white text-gray-700'
                  }`}
                >
                  {opt} {kingsPick === i && `(${kingsWager || 0} pts)`}
                </div>
              )
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-2">Min wager: {minWager} pts</p>
        </div>
      )}

      {/* Post Button */}
      <button
        onClick={handlePost}
        disabled={!isValid}
        className="w-full py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Post to Chat
      </button>
    </div>
  )
}
