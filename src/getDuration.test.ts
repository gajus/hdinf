import { getDuration } from './getDuration';
import { expect, test } from 'vitest';

test('single duration', () => {
  expect(getDuration('1 day', 'seconds')).toBe(86_400);
  expect(getDuration('1 day', 'milliseconds')).toBe(86_400_000);
  expect(getDuration('1 day', 'minutes')).toBe(1_440);
  expect(getDuration('1 day', 'hours')).toBe(24);

  // @ts-expect-error - expect TS to complain about invalid duration
  getDuration('1 foo', 'seconds');
});

test('multiple durations', () => {
  expect(getDuration('1 day 2 hours', 'seconds')).toBe(86_400 + 2 * 60 * 60);
  expect(getDuration('1 day 2 hours', 'milliseconds')).toBe(
    86_400_000 + 2 * 60 * 60 * 1_000,
  );
  expect(getDuration('1 day 2 hours', 'minutes')).toBe(1_440 + 2 * 60);
  expect(getDuration('1 day 2 hours', 'hours')).toBe(24 + 2);

  // @ts-expect-error - expect TS to complain about invalid duration
  getDuration('1 day 2 foos', 'seconds');
});
