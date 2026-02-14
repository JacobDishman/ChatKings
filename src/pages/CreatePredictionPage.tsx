import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown, Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import { getChatById } from '../data/mock';

export default function CreatePredictionPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const chat = getChatById(id ?? '');

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [minWager, setMinWager] = useState('10');
  const [kingPick, setKingPick] = useState<number | null>(null);
  const [kingWager, setKingWager] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  if (!chat) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Chat not found
      </div>
    );
  }

  const addOption = () => {
    if (options.length < 6) setOptions([...options, '']);
  };

  const removeOption = (idx: number) => {
    if (options.length <= 2) return;
    const next = options.filter((_, i) => i !== idx);
    setOptions(next);
    if (kingPick === idx) setKingPick(null);
    else if (kingPick !== null && kingPick > idx) setKingPick(kingPick - 1);
  };

  const updateOption = (idx: number, value: string) => {
    const next = [...options];
    next[idx] = value;
    setOptions(next);
  };

  const minWagerNum = parseInt(minWager) || 0;
  const kingWagerNum = parseInt(kingWager) || 0;
  const allOptionsFilled = options.every((o) => o.trim().length > 0);
  const isValid =
    question.trim().length > 0 &&
    allOptionsFilled &&
    minWagerNum >= 1 &&
    kingPick !== null &&
    kingWagerNum >= minWagerNum;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-surface border-b border-surface-lighter px-3 py-3 flex items-center gap-2 flex-shrink-0">
        <button onClick={() => navigate(`/chat/${id}`)} className="p-1 text-gray-400 hover:text-white">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="font-bold text-sm">Create Prediction</h1>
          <span className="text-[10px] text-gray-400">{chat.name}</span>
        </div>
        <span className="bg-gold/20 text-gold text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
          <Crown size={10} />
          King
        </span>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
        {/* Question */}
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">
            Question
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., Who wins Lakers vs Celtics?"
            className="w-full bg-surface border border-surface-lighter rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Options */}
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">
            Answer Options
          </label>
          <div className="space-y-2">
            {options.map((opt, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => updateOption(idx, e.target.value)}
                  placeholder={`Option ${idx + 1}`}
                  className="flex-1 bg-surface border border-surface-lighter rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                />
                {options.length > 2 && (
                  <button
                    onClick={() => removeOption(idx)}
                    className="p-2 text-gray-500 hover:text-danger transition-colors"
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
              className="mt-2 text-xs text-primary font-medium flex items-center gap-1 hover:text-primary-light transition-colors"
            >
              <Plus size={14} />
              Add Option
            </button>
          )}
        </div>

        {/* Min Wager */}
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">
            Minimum Wager
          </label>
          <input
            type="number"
            value={minWager}
            onChange={(e) => setMinWager(e.target.value)}
            className="w-full bg-surface border border-surface-lighter rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary"
          />
        </div>

        {/* King's Pick */}
        {allOptionsFilled && options.length >= 2 && (
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">
              Your Pick (Required)
            </label>
            <div className="space-y-2">
              {options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setKingPick(idx)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                    kingPick === idx
                      ? 'bg-gold/20 border-gold text-gold'
                      : 'bg-surface border-surface-lighter text-gray-300 hover:border-gray-500'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* King's Wager */}
        {kingPick !== null && (
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">
              Your Wager
            </label>
            <input
              type="number"
              value={kingWager}
              onChange={(e) => setKingWager(e.target.value)}
              placeholder={`Min ${minWagerNum}`}
              className="w-full bg-surface border border-surface-lighter rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary"
            />
          </div>
        )}

        {/* Preview Toggle */}
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="text-xs text-gray-400 flex items-center gap-1 hover:text-white transition-colors"
        >
          {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>

        {showPreview && (
          <div className="bg-surface rounded-xl border border-surface-lighter overflow-hidden">
            <div className="bg-primary/10 border-b border-primary/20 px-4 py-2">
              <span className="text-xs font-bold text-primary">PREVIEW</span>
            </div>
            <div className="p-4">
              <p className="font-semibold text-sm mb-3">{question || 'Your question here...'}</p>
              <div className="space-y-2">
                {options.map((opt, idx) => (
                  <div
                    key={idx}
                    className={`px-3 py-2 rounded-lg border text-sm ${
                      kingPick === idx
                        ? 'bg-gold/20 border-gold text-gold'
                        : 'bg-surface-light border-surface-lighter text-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{opt || `Option ${idx + 1}`}</span>
                      {kingPick === idx && (
                        <span className="text-[10px] text-gold">{kingWagerNum || 0} pts</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Post Button */}
      <div className="px-4 py-3 bg-surface border-t border-surface-lighter flex-shrink-0">
        <button
          disabled={!isValid}
          onClick={() => navigate(`/chat/${id}`)}
          className={`w-full py-3 rounded-xl font-bold text-sm transition-colors ${
            isValid
              ? 'bg-primary text-black hover:bg-primary-dark'
              : 'bg-surface-lighter text-gray-600 cursor-not-allowed'
          }`}
        >
          Post to Chat
        </button>
      </div>
    </div>
  );
}
