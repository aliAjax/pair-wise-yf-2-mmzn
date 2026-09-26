import type { Bench, MaterialType, ShadeLevelType, NoiseLevelType, TimePeriodType } from '@/types';

const materialScores: Record<MaterialType, number> = {
  wood: 5,
  mixed: 4,
  stone: 3,
  metal: 2,
  plastic: 2,
};

const shadeScores: Record<ShadeLevelType, number> = {
  full: 5,
  partial: 3,
  none: 1,
};

const noiseScores: Record<NoiseLevelType, number> = {
  quiet: 5,
  moderate: 3,
  noisy: 1,
};

export function calculateComfortScore(bench: Bench): number {
  return Math.round(calculateComfort(bench, bench.rating) * 10) / 10;
}

function calculateComfort(bench: Bench, userRating: number): number {
  const backrestScore = bench.hasBackrest ? 5 : 2;
  const shadeScore = shadeScores[bench.shadeLevel];
  const noiseScore = noiseScores[bench.noiseLevel];
  const materialScore = materialScores[bench.material];

  return backrestScore * 0.2 + shadeScore * 0.2 + noiseScore * 0.2 + materialScore * 0.15 + userRating * 0.25;
}

/**
 * 取长椅在某时段的体验评分。
 * 同一时段存在多条记录时，以最后添加的一条为准。
 */
export function getPeriodExperienceRating(bench: Bench, timePeriod: TimePeriodType): number | null {
  const matched = bench.experiences.filter((exp) => exp.timePeriod === timePeriod);
  return matched.length > 0 ? matched[matched.length - 1].rating : null;
}

export interface PeriodComfort {
  /** 该时段参与计算后的舒适度评分（保留一位小数） */
  score: number;
  /** true 表示该时段没有体验记录，沿用综合分估算 */
  estimated: boolean;
}

/**
 * 按时段计算舒适度：
 * - 该时段有体验记录时，用体验评分替换档案总评参与加权计算；
 * - 没有记录时沿用综合舒适度，并标记为估算。
 */
export function calculatePeriodComfort(bench: Bench, timePeriod: TimePeriodType | null): PeriodComfort {
  if (!timePeriod) {
    return { score: calculateComfortScore(bench), estimated: false };
  }

  const periodRating = getPeriodExperienceRating(bench, timePeriod);
  if (periodRating === null) {
    return { score: calculateComfortScore(bench), estimated: true };
  }

  return {
    score: Math.round(calculateComfort(bench, periodRating) * 10) / 10,
    estimated: false,
  };
}

export function getComfortLevel(score: number): string {
  if (score >= 4.5) return '极佳';
  if (score >= 3.8) return '优秀';
  if (score >= 3.0) return '良好';
  if (score >= 2.0) return '一般';
  return '较差';
}

export function getComfortColor(score: number): string {
  if (score >= 4.5) return 'text-moss-green';
  if (score >= 3.8) return 'text-moss-light';
  if (score >= 3.0) return 'text-ochre';
  if (score >= 2.0) return 'text-ink-light';
  return 'text-red-500';
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
