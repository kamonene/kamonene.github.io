import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import * as Tone from "tone";
import {Interval, intervals, numberToNote, pitchIncrease} from "../../utils/utils";
import {IntervalSelector} from "../functional/pitch-selector/interval-selector";
import {ctx, Options} from "../../App";
import style from './produce.module.less'

interface CurrentIntervalMetadata {
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

    const findNextInterval = (options: Options): CurrentIntervalMetadata => {
        const activeIntervals = options.activeIntervals
        const current = activeIntervals[Math.floor(Math.random() * activeIntervals.length)]

        return {
            currentIntervalName: current,
            currentInterval: intervals.findIndex(item => current === item),
            currentBaseNote: numberToNote(randomInRange(options.baseNoteLower, options.baseNoteUpper))
        }
    }

    const [currentIntervalMetaData, setCurrentIntervalMetaData] = useState(findNextInterval(options))

    useEffect(() => {
        const nextInterval = findNextInterval(options)
        setCurrentIntervalMetaData(nextInterval)
    }, [options, options.activeIntervals.length])

    const synth = new Tone.Synth().toDestination()
    const note = currentIntervalMetaData.currentBaseNote

    const onClickBase = () => {
        synth.triggerAttackRelease(note, "8n");
    }
    const onClickBaseConfirm = () => {
        synth.triggerAttackRelease(pitchIncrease(note, currentIntervalMetaData.currentInterval), "8n");
    }
    const onClickNext = () => {
        setCurrentIntervalMetaData(findNextInterval(options))
    }

    return <div className={style.container}>
        <div className={style.thing}>
            <p>
                Produce a {currentIntervalMetaData.currentIntervalName.toLowerCase()} from the base note
            </p>
            <button onClick={onClickBase}>Play again</button>
            <button onClick={onClickBaseConfirm}>Check</button>
            <button onClick={onClickNext}>next</button>
        </div>
        <IntervalSelector/>
    </div>
}