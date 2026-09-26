import { Layers, Sunrise, Sun, CloudSun, Sunset, Moon } from 'lucide-react';
import { useBenchStore } from '@/store/useBenchStore';
import { TIME_PERIODS, TIME_PERIOD_LABELS } from '@/types';
import type { TimePeriodType } from '@/types';

const timePeriodIcons: Record<TimePeriodType, typeof Sunrise> = {
  morning: Sunrise,
  noon: Sun,
  afternoon: CloudSun,
  evening: Sunset,
  night: Moon,
};

export default function TimePeriodSelector() {
  const selectedPeriod = useBenchStore((state) => state.selectedPeriod);
  const setSelectedPeriod = useBenchStore((state) => state.setSelectedPeriod);

  const options: { value: TimePeriodType | null; label: string; icon: typeof Sunrise }[] = [
    { value: null, label: '综合', icon: Layers },
    ...TIME_PERIODS.map((period) => ({
      value: period,
      label: TIME_PERIOD_LABELS[period],
      icon: timePeriodIcons[period],
    })),
  ];

  return (
    <div className="paper-texture rounded-xl shadow-paper p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <span className="text-sm font-medium text-deep-brown flex-shrink-0">查看时段</span>
        <div className="flex flex-wrap gap-2">
          {options.map(({ value, label, icon: Icon }) => {
            const isActive = selectedPeriod === value;
            return (
              <button
                key={value ?? 'overall'}
                type="button"
                onClick={() => setSelectedPeriod(value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                  isActive
                    ? 'bg-moss-green text-white border-moss-green shadow-sm'
                    : 'bg-white/50 text-ink-light border-deep-brown/10 hover:bg-white hover:text-deep-brown'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {selectedPeriod && (
        <p className="mt-3 text-xs text-ink-light/80">
          按{TIME_PERIOD_LABELS[selectedPeriod]}时段重排：有该时段体验记录的长椅使用体验评分计算，
          其余沿用综合分并以
          <span className="inline-flex items-center align-middle mx-1 px-1.5 py-0.5 rounded bg-ochre/10 text-ochre font-medium">
            估算
          </span>
          标记。
        </p>
      )}
    </div>
  );
}
