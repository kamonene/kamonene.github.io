import { Synth } from "tone";

export enum Note {
  "C" = "C",
  "C#" = "C#",
  "D" = "D",
  "D#" = "D#",
  "E" = "E",
  "F" = "F",

  "F#" = "F#",
  "G" = "G",
  "G#" = "G#",
  "A" = "A",
  "A#" = "A#",
  "B" = "B",
}

export const notes = [
  Note["C"],
  Note["C#"],
  Note["D"],
  Note["D#"],
  Note["E"],
  Note["F"],
  Note["F#"],
  Note["G"],
  Note["G#"],
  Note["A"],
  Note["A#"],
  Note["B"],
];

export enum Interval {
  "Perfect unison" = "Perfect unison",
  "Minor second" = "Minor second",
  "Major second" = "Major second",
  "Minor third" = "Minor third",
  "Major third" = "Major third",
  "Perfect fourth" = "Perfect fourth",
  "Tritone" = "Tritone",
  "Perfect fifth" = "Perfect fifth",
  "Minor sixth" = "Minor sixth",
  "Major sixth" = "Major sixth",
  "Minor seventh" = "Minor seventh",
  "Major seventh" = "Major seventh",
  "Perfect octave" = "Perfect octave",
}

export const intervals = [
  Interval["Perfect unison"],
  Interval["Minor second"],
  Interval["Major second"],
  Interval["Minor third"],
  Interval["Major third"],
  Interval["Perfect fourth"],
  Interval["Tritone"],
  Interval["Perfect fifth"],
  Interval["Minor sixth"],
  Interval["Major sixth"],
  Interval["Minor seventh"],
  Interval["Major seventh"],
  Interval["Perfect octave"],
];

export enum Mode {
  "RECOGNIZE" = "RECOGNIZE",
  "PRODUCE" = "PRODUCE",
}

export interface Ref {
  synth?: Synth;
}

export interface Options {
  activeIntervals: Array<Interval>;
  baseNoteLower: number;
  baseNoteUpper: number;
  allowAscending: boolean;
  allowDescending: boolean;
  mode: Mode;
}

export const defaultOptions: Options = {
  activeIntervals: [Interval["Perfect fifth"]],
  baseNoteLower: 35,
  baseNoteUpper: 50,
  allowAscending: true,
  allowDescending: false,
  mode: Mode.PRODUCE,
};
