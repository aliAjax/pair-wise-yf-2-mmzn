import { Sigma, Sunrise, Sun, CloudSun, Sunset, Moon } from 'lucide-react';
import { useBenchStore } from '@/store/useBenchStore';
import { TIME_PERIOD_LABELS } from '@/types';
import type { TimePeriodType } from '@/types';

const TIME_PERIODS: TimePeriodType[] = ['morning', 'noon', 'afternoon', 'evening', 'night'];

const TIME_PERIOD_ICONS: Record<TimePeriodType, typeof Sunrise> = {
  morning: Sunrise,
  noon: Sun,
  afternoon: CloudSun,
  evening: Sunset,
  night: Moon,
};

export default function TimePeriodSelector() {
  const { timePeriodFilter, setTimePeriodFilter } = useBenchStore();

  const buttonClass = (active: boolean) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
      active
        ? 'bg-moss-green text-white shadow-md'
        : 'text-ink-light hover:bg-deep-brown/5 hover:text-deep-brown'
    }`;

  return (
    <div className="paper-texture rounded-xl shadow-paper p-3 mb-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-ink-light mr-1">按时段查看</span>
        <button
          type="button"
          onClick={() => setTimePeriodFilter(null)}
          className={buttonClass(timePeriodFilter === null)}
        >
          <Sigma className="w-4 h-4" />
          综合
        </button>
        {TIME_PERIODS.map((period) => {
          const TimeIcon = TIME_PERIOD_ICONS[period];
          return (
            <button
              key={period}
              type="button"
              onClick={() => setTimePeriodFilter(period)}
              className={buttonClass(timePeriodFilter === period)}
            >
              <TimeIcon className="w-4 h-4" />
              {TIME_PERIOD_LABELS[period]}
            </button>
          );
        })}
        {timePeriodFilter !== null && (
          <span className="text-xs text-ink-light/70 ml-auto">
            无该时段体验的长椅沿用综合分，标记为「估算」
          </span>
        )}
      </div>
    </div>
  );
}
