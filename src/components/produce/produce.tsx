import React, {FunctionComponent, useContext} from 'react';
import * as Tone from "tone";
import {intervalList, Intervals, pitchIncrease} from "../../utils/utils";
import {IntervalSelector} from "../functional/pitch-selector/interval-selector";
import {ctx} from "../../App";

export const Produce: FunctionComponent = () => {

    const {options} = useContext(ctx)
    const activeIntervals = options.activeIntervals
    const synth = new Tone.Synth().toDestination()
    const note = 'C4'
    const current = activeIntervals[Math.floor(Math.random() * activeIntervals.length)]
    const difference = intervalList.findIndex(item => current === item)
    const onClickBase = () => {
        synth.triggerAttackRelease(note, "8n");
    }
    const onClickBaseConfirm = () => {
        synth.triggerAttackRelease(pitchIncrease(note, 7), "8n");
    }
    return <div>
        <div>
            <button onClick={onClickBase}>Play</button>
            <button onClick={onClickBaseConfirm}>Check</button>
        </div>
        <IntervalSelector/>
        current:{current}
        <br/>
        current interval: {difference}


    </div>
}