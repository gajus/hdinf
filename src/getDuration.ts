export type IntervalName =
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

const timeMultipliers: { [key in IntervalName]: number } = {
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

export const getDuration = (
  ttl: HumanDuration,
  format: IntervalName,
): number => {
  if (!ttl || typeof ttl !== 'string') {
    throw new Error('Invalid duration format');
  }

  let totalMilliseconds = 0;
  const parts = ttl.split(' ');

  for (let index = 0; index < parts.length; index += 2) {
    const value = Number.parseFloat(parts[index]);
    const interval = parts[index + 1] as IntervalName;

    if (Number.isNaN(value) || !timeMultipliers[interval]) {
      throw new Error(`Invalid duration part: ${parts[index]} ${interval}`);
    }

    totalMilliseconds += value * timeMultipliers[interval];
  }

  return totalMilliseconds / timeMultipliers[format];
};
