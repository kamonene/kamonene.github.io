import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import * as Tone from "tone";
import {intervals, Interval, pitchIncrease, Note, noteToNumber, numberToNote} from "../../utils/utils";
import {IntervalSelector} from "../functional/pitch-selector/interval-selector";
import {ctx, Options} from "../../App";


interface CurrentThing {
    currentIntervalName: Interval,
    currentInterval: number,
    currentBaseNote: string
}

const randomInRange = (lower: number, upper: number): number => {
    const random = Math.floor(Math.random() * (upper - lower))
    return random + lower
}

export const Produce: FunctionComponent = () => {
    const {options} = useContext(ctx)

    const findCurrentThing = (options: Options): CurrentThing => {
        const activeIntervals = options.activeIntervals
        const current = activeIntervals[Math.floor(Math.random() * activeIntervals.length)]

        return {
            currentIntervalName: current,
            currentInterval: intervals.findIndex(item => current === item),
            currentBaseNote: numberToNote(randomInRange(options.baseNoteLower, options.baseNoteUpper))
        }
    }

    const [currentThing, setCurrentThing] = useState(findCurrentThing(options))

    useEffect(() => {
        setCurrentThing(findCurrentThing(options))
    }, [options, options.activeIntervals.length])

    const synth = new Tone.Synth().toDestination()
    const note = currentThing.currentBaseNote

    const onClickBase = () => {
        synth.triggerAttackRelease(note, "8n");
    }
    const onClickBaseConfirm = () => {
        synth.triggerAttackRelease(pitchIncrease(note, currentThing.currentInterval), "8n");
    }
    const onClickNext = () => {
        setCurrentThing(findCurrentThing(options))
    }


    return <div>
        <div>
            <button onClick={onClickBase}>Play</button>
            <button onClick={onClickBaseConfirm}>Check</button>
            <button onClick={onClickNext}>next</button>
            <button onClick={() => {
                console.log(randomInRange(21, 23))
            }
            }>random
            </button>
        </div>
        <IntervalSelector/>
        {numberToNote(40)}
        {JSON.stringify(currentThing)}
    </div>
}