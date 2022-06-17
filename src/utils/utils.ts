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


export const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export const pitches: any = {
    PERFECT_FIFTH: 7
}

export const enum Intervals {
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

export const intervalList = [
    Intervals['Perfect unison'],
    Intervals['Minor second'],
    Intervals['Major second'],
    Intervals['Minor third'],
    Intervals['Major third'],
    Intervals['Perfect fourth'],
    Intervals['Tritone'],
    Intervals['Perfect fifth'],
    Intervals['Minor sixth'],
    Intervals['Major sixth'],
    Intervals['Minor seventh'],
    Intervals['Major seventh'],
    Intervals['Perfect octave'],
]

