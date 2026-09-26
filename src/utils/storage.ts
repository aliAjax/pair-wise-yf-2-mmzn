import type { Bench, TimePeriodType } from '@/types';

const STORAGE_KEY = 'bench-archive-data';
const SELECTED_PERIOD_KEY = 'bench-archive-selected-period';

export function loadBenches(): Bench[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load benches from localStorage:', error);
  }
  return [];
}

export function saveBenches(benches: Bench[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(benches));
  } catch (error) {
    console.error('Failed to save benches to localStorage:', error);
  }
}

export function clearBenches(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear benches from localStorage:', error);
  }
}

export function loadSelectedPeriod(): TimePeriodType | null {
  try {
    const data = localStorage.getItem(SELECTED_PERIOD_KEY);
    if (data) {
      return data as TimePeriodType;
    }
  } catch (error) {
    console.error('Failed to load selected period from localStorage:', error);
  }
  return null;
}

export function saveSelectedPeriod(period: TimePeriodType | null): void {
  try {
    if (period) {
      localStorage.setItem(SELECTED_PERIOD_KEY, period);
    } else {
      localStorage.removeItem(SELECTED_PERIOD_KEY);
    }
  } catch (error) {
    console.error('Failed to save selected period to localStorage:', error);
  }
}
