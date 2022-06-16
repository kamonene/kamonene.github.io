import React, {FunctionComponent} from 'react';
import * as Tone from "tone";
import {pitchIncrease} from "../../utils/utils";

export const Produce: FunctionComponent = () => {
    const synth = new Tone.Synth().toDestination()
    const note = 'C4'
    const onClickBase = () => {
        synth.triggerAttackRelease(note, "8n");
    }
    const onClickBaseConfirm = () => {
        synth.triggerAttackRelease(pitchIncrease(note, 7), "8n");
    }
    return <div>
        <button onClick={onClickBase}>Play</button>
        <button onClick={onClickBaseConfirm}>Check</button>
    </div>
}