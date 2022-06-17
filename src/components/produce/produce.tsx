import React, {FunctionComponent, useContext} from 'react';
import * as Tone from "tone";
import {intervalList, Intervals, pitchIncrease} from "../../utils/utils";
import {IntervalSelector} from "../functional/pitch-selector/interval-selector";
import {ctx} from "../../App";

export const Produce: FunctionComponent = () => {

    const {options} = useContext(ctx)
    const difference = intervalList.findIndex(item => options.currentInterval === item)
    const synth = new Tone.Synth().toDestination()
    const note = 'C4'

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

        {options.currentInterval}
        <br/>
        {difference}
    </div>
}