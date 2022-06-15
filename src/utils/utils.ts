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
