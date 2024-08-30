# hdinf

hdinf (human-duration in format) parses duration information from human-readable format into an arbitrary format.

## Motivation

The frustration of seeing code littered with `86_400` and `60 * 60 * 24` and similar expressions.

## Usage

```ts
import {
  getDuration,
  type HumanDuration,
  type IntervalName,
} from 'hdinf';

// parseDuration(duration: HumanDuration, interval: IntervalName): number
getDuration('1 day', 'seconds');
getDuration('1 day 2 hours 3 seconds', 'milliseconds');
```

In the wild, you should use this library remove any hard-coded durations from your codebase, e.g.,

```diff
- setTimeout(() => {}, 86_400);
+ setTimeout(() => {}, getDuration('1 day', 'seconds'));
```

Similarly, anywhere where you define inputs for a function, you should consider using `HumanDuration` instead of a raw number in an arbitrary format, e.g.,

```diff
- const foo = (durationInSeconds: number) => {}
+ const foo = (duration: HumanDuration) => {}
```

This will reduce the number of bugs that are introduced by passing in a duration in the wrong format.

## TypeScript

One of the benefits of this library is that the input format is enforced using TypeScript template literal types, i.e. the compiler will complain if you pass in an invalid duration.

```ts
import { getDuration } from 'hdinf';

getDuration('1 day', 'seconds'); // OK
getDuration('1 day', 'milliseconds'); // OK
getDuration('1 day', 'minutes'); // OK
getDuration('1 day', 'hours'); // OK

getDuration('1 foo', 'seconds'); // TS error because foo is not a valid time period
getDuration('1 hour 1 day', 'seconds'); // TS error because lesser units cannot precede greater units (hour < day)
```

## Abbreviations

Abbreviations are intentionally not supported. The goal of this library is to reduce the variations in how durations are expressed.

## Alternatives

`hdinf` was primarily designed with the intent of replacing the use of constants rather than allowing dynamic expressions.

If you are already using a library like [dayjs](https://day.js.org/), you can probably find a [native solution](https://day.js.org/docs/en/plugin/duration) for this problem, e.g.,

```ts
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);
dayjs.duration(100, 'days');
```