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

export const enum Note {
    'C' = 'C',
    'C#' = 'C#',
    'D' = 'D',
    'D#' = 'D#',
    'E' = 'E',
    'F' = 'F',
    'F#' = 'F#',
    'G' = 'G',
    'G#' = 'G#',
    'A' = 'A',
    'A#' = 'A#',
    'B' = 'B'
}

export const notes = [
    Note['C'],
    Note['C#'],
    Note['D'],
    Note['D#'],
    Note['E'],
    Note['F'],
    Note['F#'],
    Note['G'],
    Note['G#'],
    Note['A'],
    Note['A#'],
    Note['B'],
]

export const enum Interval {
    'Perfect unison' = 'Perfect unison',
    'Minor second' = 'Minor second',
    'Major second' = 'Major second',
    'Minor third' = 'Minor third',
    'Major third' = 'Major third',
    'Perfect fourth' = 'Perfect fourth',
    'Tritone' = 'Tritone',
    'Perfect fifth' = 'Perfect fifth',
    'Minor sixth' = 'Minor sixth',
    'Major sixth' = 'Major sixth',
    'Minor seventh' = 'Minor seventh',
    'Major seventh' = 'Major seventh',
    'Perfect octave' = 'Perfect octave',
}

export const intervals = [
    Interval['Perfect unison'],
    Interval['Minor second'],
    Interval['Major second'],
    Interval['Minor third'],
    Interval['Major third'],
    Interval['Perfect fourth'],
    Interval['Tritone'],
    Interval['Perfect fifth'],
    Interval['Minor sixth'],
    Interval['Major sixth'],
    Interval['Minor seventh'],
    Interval['Major seventh'],
    Interval['Perfect octave'],
]

