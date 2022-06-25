import { Interval, intervals, notes, Options } from "./constants";

export const noteToNumber = (note: string): number => {
  const octave: number = Number.parseInt(note[note.length - 1]);
  const offset: number = notes.findIndex((item) =>
    item.toLowerCase().includes(note.toLowerCase().slice(0, note.length - 1))
  );
  return octave * 12 + offset;
};

export const numberToNote = (number: number): string => {
  const offset = number % 12;
  const octave = Math.floor(number / 12);
  return `${notes[offset]}${octave}`;
};
export const pitchIncrease = (note: string, steps: number) =>
  numberToNote(noteToNumber(note) + steps);

interface IntervalMetaData {
  intervalName: Interval;
  interval: number;
  baseNote: string;
  multiplier: number;
}

const randomInRange = (lower: number, upper: number): number => {
  const random = Math.floor(Math.random() * (upper - lower));
  return random + lower;
};
export const findNextInterval = (options: Options): IntervalMetaData => {
  const multipliers = [];
  if (options.allowAscending) {
    multipliers.push(1);
  }
  if (options.allowDescending) {
    multipliers.push(-1);
  }
  const multiplier =
    multipliers[Math.floor(Math.random() * multipliers.length)];

  const activeIntervals = options.activeIntervals;
  const intervalName =
    activeIntervals[Math.floor(Math.random() * activeIntervals.length)];
  const currentInterval = intervals.findIndex(
    (item) => intervalName.toString() === item.toString()
  );

  const baseNote = numberToNote(
    randomInRange(
      multiplier === -1
        ? options.baseNoteLower + currentInterval
        : options.baseNoteLower,
      multiplier === 1
        ? options.baseNoteUpper - currentInterval
        : options.baseNoteUpper
    )
  );
  return {
    intervalName,
    interval: currentInterval * multiplier,
    baseNote,
    multiplier,
  };
};
