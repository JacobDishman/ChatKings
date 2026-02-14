import { useState } from 'react'
import { Zap, Crown } from 'lucide-react'
import type { Prediction } from '@/types'
import { currentUser } from '@/data/mock'
import { getTotalPot } from '@/lib/utils'

interface ActivePredictionCardProps {
  prediction: Prediction
  isLockedOut?: boolean
}

export default function ActivePredictionCard({ prediction, isLockedOut = false }: ActivePredictionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [wagerAmount, setWagerAmount] = useState<string>('')
  const [hasPlaced, setHasPlaced] = useState(false)

  const totalPot = getTotalPot(prediction.options)
  const userAlreadyWagered = prediction.options.some(opt =>
    opt.wagers.some(w => w.userId === currentUser.id)
  )

  const handlePlace = () => {
    if (selectedOption && Number(wagerAmount) >= prediction.minWager) {
      setHasPlaced(true)
    }
  }

  return (
    <div className="mx-4 mt-3 bg-white rounded-xl shadow-sm border border-brand/20 overflow-hidden">
      <div className="bg-brand/5 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-brand" />
          <span className="text-xs font-bold text-brand uppercase">Active Prediction</span>
        </div>
        <span className="text-xs font-medium text-gray-500">{totalPot} pts in pot</span>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-3">{prediction.question}</h3>

        <div className="space-y-2">
          {prediction.options.map(option => {
            const optionTotal = option.wagers.reduce((s, w) => s + w.amount, 0)
            const isKingsPick = option.id === prediction.options.find(
              o => o.wagers.some(w => w.userId === prediction.createdBy)
            )?.id
            const isSelected = selectedOption === option.id
            const isDisabled = isLockedOut || userAlreadyWagered || hasPlaced

            return (
              <button
                key={option.id}
                onClick={() => !isDisabled && setSelectedOption(option.id)}
                disabled={isDisabled}
                className={`w-full p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-brand bg-brand/5'
                    : 'border-gray-100 hover:border-gray-200'
                } ${isDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-gray-900">{option.text}</span>
                    {isKingsPick && <Crown size={12} className="text-king-gold" />}
                  </div>
                  <span className="text-xs text-gray-500">{optionTotal} pts</span>
                </div>
              </button>
            )
          })}
        </div>

        {!userAlreadyWagered && !hasPlaced && selectedOption && !isLockedOut && (
          <div className="mt-3 flex gap-2">
            <input
              type="number"
              value={wagerAmount}
              onChange={e => setWagerAmount(e.target.value)}
              placeholder={`Min ${prediction.minWager}`}
              min={prediction.minWager}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand"
            />
            <button
              onClick={handlePlace}
              disabled={!wagerAmount || Number(wagerAmount) < prediction.minWager}
              className="px-4 py-2 bg-brand text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Place
            </button>
          </div>
        )}

        {(userAlreadyWagered || hasPlaced) && (
          <p className="mt-3 text-xs text-brand font-medium text-center">Wager placed!</p>
        )}

        {isLockedOut && (
          <p className="mt-3 text-xs text-red-500 font-medium text-center">
            Locked out — predictions disabled until midnight reset
          </p>
        )}
      </div>
    </div>
  )
}
