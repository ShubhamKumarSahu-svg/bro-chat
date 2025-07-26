import { Send } from 'lucide-react';
import { THEMES } from '../constants';
import { useThemeStore } from '../store/useThemeStore';

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen flex flex-col items-center bg-base-100 transition-colors">
      <div className="w-full max-w-3xl mt-24 mb-12 px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-base-content">
            Settings
          </h2>
          <p className="text-base text-base-content/60 mt-2">
            Personalize BroChat to your liking
          </p>
        </div>

        {/* Theme Selection */}
        <div>
          <h3 className="text-lg font-semibold text-base-content mb-2">
            Theme
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-10">
            {THEMES.map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`
                  group w-full py-2 rounded-lg transition border border-base-300
                  flex flex-col items-center gap-1.5
                  ${
                    theme === t
                      ? 'bg-base-200 ring-2 ring-primary'
                      : 'hover:bg-base-200'
                  }
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                `}
                aria-pressed={theme === t}
                type="button"
              >
                {/* Theme preview block */}
                <div
                  className="relative h-8 w-full rounded-md overflow-hidden"
                  data-theme={t}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary" />
                    <div className="rounded bg-secondary" />
                    <div className="rounded bg-accent" />
                    <div className="rounded bg-neutral" />
                  </div>
                </div>
                <span className="text-xs font-medium text-base-content/80 truncate w-full text-center">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Preview */}
        <div className="rounded-xl border border-base-300 bg-base-100 shadow-lg">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-base-300 select-none">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-semibold text-base">
              J
            </div>
            <div>
              <h4 className="font-medium text-sm text-base-content">
                John Doe
              </h4>
              <span className="text-xs text-base-content/60">Online</span>
            </div>
          </div>
          {/* Messages preview */}
          <div className="p-4 space-y-3 bg-base-100 min-h-[120px] max-h-[180px] overflow-y-auto">
            {PREVIEW_MESSAGES.map(({ id, content, isSent }) => (
              <div
                key={id}
                className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    max-w-[80%] px-3 py-2 rounded-xl shadow-sm text-sm
                    ${
                      isSent
                        ? 'bg-primary text-primary-content'
                        : 'bg-base-200 text-base-content'
                    }
                  `}
                >
                  {content}
                  <div
                    className={`text-[10px] mt-1.5 ${
                      isSent
                        ? 'text-primary-content/70'
                        : 'text-base-content/70'
                    }`}
                  >
                    12:00 PM
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Input preview */}
          <div className="flex items-center gap-3 p-3 border-t border-base-300 bg-base-100">
            <input
              type="text"
              value="This is a preview"
              readOnly
              className="input input-bordered flex-1 text-sm h-10 focus:ring-2 focus:ring-primary"
              aria-label="Sample input"
            />
            <button
              className="btn btn-primary h-10 min-h-0 px-2"
              aria-label="Send (preview)"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
