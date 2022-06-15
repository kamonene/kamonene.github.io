import React, {FunctionComponent} from 'react'
import {pitches, pitchIncrease} from "../../utils/utils";
import * as Tone from "tone";

export const Recognize: FunctionComponent = () => {

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
    return <div></div>
}