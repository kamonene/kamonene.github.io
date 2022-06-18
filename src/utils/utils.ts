import {Options} from "../App";
import {Interval, intervals, notes} from "./constants";

export const noteToNumber = (note: string): number => {
    const octave: number = Number.parseInt(note[note.length - 1])
    const offset: number = notes.findIndex(item =>
        item.toLowerCase().includes(note.toLowerCase().slice(0, note.length - 1))
    )
    return (octave * 12) + offset
}

export const numberToNote = (number: number): string => {
    const offset = number % 12
    const octave = Math.floor(number / 12)
    return `${notes[offset]}${octave}`
}
export const pitchIncrease = (note: string, steps: number) =>
    numberToNote(noteToNumber(note) + steps)

interface CurrentIntervalMetadata {
    currentIntervalName: Interval,
    currentInterval: number,
    currentBaseNote: string
}

const randomInRange = (lower: number, upper: number): number => {
    const random = Math.floor(Math.random() * (upper - lower))
    return random + lower
}
export const findNextInterval = (options: Options): CurrentIntervalMetadata => {
    const activeIntervals = options.activeIntervals
    const current = activeIntervals[Math.floor(Math.random() * activeIntervals.length)]
    const baseNote = numberToNote(randomInRange(options.baseNoteLower, options.baseNoteUpper))
    return {
        currentIntervalName: current,
        currentInterval: intervals.findIndex(item => current === item),
        currentBaseNote: baseNote
    }
}
