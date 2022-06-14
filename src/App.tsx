import React from 'react';
import * as Tone from 'tone';
import './App.css'

const noteToNumber = (note: string): number => {
    const octave: number = Number.parseInt(note[note.length - 1])
    const offset: number = notes.findIndex(item =>
        item.toLowerCase().includes(note.toLowerCase().slice(0, note.length - 1))
    )
    return (octave * 12) + offset
}

const numberToNote = (number: number): string => {
    const offset = number % 12
    const octave = Math.floor(number / 12)
    return `${notes[offset]}${octave}`
}
const pitchIncrease = (note: string, steps: number) =>
    numberToNote(noteToNumber(note) + steps)


const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

const pitches: any = {
    PERFECT_FIFTH: 7
}

function App() {

    const onClick = () => {
        playSequence('C4', pitches.PERFECT_FIFTH)
    }

    const playSequence = (note: string, pitch: string) => {
        const synth = new Tone.Synth().toDestination()
        synth.triggerAttackRelease(note, "8n");
        setTimeout(() => {
            synth.triggerAttackRelease(pitchIncrease(note, 7), "8n");
        }, 500)


    }
    return (
        <div className="App">
            <button onClick={onClick}>noise!</button>

        </div>
    );
}

export default App;
