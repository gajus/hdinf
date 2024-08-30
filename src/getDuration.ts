export type TimePeriod =
  | 'day'
  | 'days'
  | 'hour'
  | 'hours'
  | 'millisecond'
  | 'milliseconds'
  | 'minute'
  | 'minutes'
  | 'second'
  | 'seconds';

export type HumanDuration =
  | `${number} day${'' | 's'} ${number} hour${'' | 's'} ${number} minute${
      | ''
      | 's'} ${number} second${'' | 's'} ${number} millisecond${'' | 's'}`
  | `${number} day${'' | 's'} ${number} hour${'' | 's'} ${number} minute${
      | ''
      | 's'} ${number} second${'' | 's'}`
  | `${number} day${'' | 's'} ${number} hour${'' | 's'} ${number} minute${
      | ''
      | 's'}`
  | `${number} day${'' | 's'} ${number} hour${'' | 's'}`
  | `${number} day${'' | 's'}`
  | `${number} hour${'' | 's'} ${number} minute${'' | 's'} ${number} second${
      | ''
      | 's'} ${number} millisecond${'' | 's'}`
  | `${number} hour${'' | 's'} ${number} minute${'' | 's'} ${number} second${
      | ''
      | 's'}`
  | `${number} hour${'' | 's'} ${number} minute${'' | 's'}`
  | `${number} hour${'' | 's'}`
  | `${number} millisecond${'' | 's'}`
  | `${number} minute${'' | 's'} ${number} second${
      | ''
      | 's'} ${number} millisecond${'' | 's'}`
  | `${number} minute${'' | 's'} ${number} second${'' | 's'}`
  | `${number} minute${'' | 's'}`
  | `${number} second${'' | 's'} ${number} millisecond${'' | 's'}`
  | `${number} second${'' | 's'}`;

const timeMultipliers: { [key in TimePeriod]: number } = {
  day: 24 * 60 * 60 * 1_000,
  days: 24 * 60 * 60 * 1_000,
  hour: 60 * 60 * 1_000,
  hours: 60 * 60 * 1_000,
  millisecond: 1,
  milliseconds: 1,
  minute: 60 * 1_000,
  minutes: 60 * 1_000,
  second: 1_000,
  seconds: 1_000,
};

export const getDuration = (ttl: HumanDuration, format: TimePeriod): number => {
  const regex =
    // eslint-disable-next-line unicorn/no-unsafe-regex
    /(\d+(?:\.\d+)?) (milliseconds?|seconds?|minutes?|hours?|days?)/gu;

  let totalMilliseconds = 0;

  let match;

  while ((match = regex.exec(ttl)) !== null) {
    const value = Number.parseFloat(match[1]);
    const period = match[2] as TimePeriod;

    totalMilliseconds += value * timeMultipliers[period];
  }

  const result = totalMilliseconds / timeMultipliers[format];

  return result;
};
