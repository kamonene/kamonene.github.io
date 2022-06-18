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
const findNextInterval = (options: Options): CurrentIntervalMetadata => {
    const activeIntervals = options.activeIntervals
    const current = activeIntervals[Math.floor(Math.random() * activeIntervals.length)]
    const baseNote = numberToNote(randomInRange(options.baseNoteLower, options.baseNoteUpper))
    console.log(baseNote)
    return {
        currentIntervalName: current,
        currentInterval: intervals.findIndex(item => current === item),
        currentBaseNote: baseNote
    }
}

const synth = new Tone.Synth().toDestination()
export const Produce: FunctionComponent = () => {
    const {options} = useContext(ctx)
    const [currentIntervalMetaData, setCurrentIntervalMetaData] = useState(findNextInterval(options))
    const [started, setStarted] = useState(false)
    useEffect(() => {
            if (started) {
                synth.triggerAttackRelease(currentIntervalMetaData.currentBaseNote, '8n')
            }
            const synth1 = new Tone.Synth().toDestination()
            const synth2 = new Tone.Synth().toDestination()
            const keydown = (event: KeyboardEvent) => {
                if (event.key === '1' && !event.repeat) {
                    synth1.triggerAttack(currentIntervalMetaData.currentBaseNote)
                }
                if (event.key === '2' && !event.repeat) {
                    synth2.triggerAttack(pitchIncrease(note, currentIntervalMetaData.currentInterval));
                }
            }

            const keyup = (event: KeyboardEvent) => {
                if (event.key === '1' && !event.repeat) {
                    synth1.triggerRelease()
                }
                if (event.key === '2' && !event.repeat) {
                    synth2.triggerRelease()

                }
            }
            document.addEventListener('keydown', keydown)
            document.addEventListener('keyup', keyup)
            return () => {
                document.removeEventListener('keyup', keyup)
                document.removeEventListener('keydown', keydown)

            }
        }, [currentIntervalMetaData, started]
    )

    useEffect(() => {
        setCurrentIntervalMetaData(findNextInterval(options))
        const keyup = (event: KeyboardEvent) => {
            if (event.key === '3' && !event.repeat) {
                setCurrentIntervalMetaData(findNextInterval(options))
            }
        }
        document.addEventListener('keyup', keyup)
        return () => {
            document.removeEventListener('keyup', keyup)

        }
    }, [options, options.activeIntervals.length])


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

            {!started && <button onClick={() => {
                setStarted(true)
            }
            }>Get started </button>}
            <p>
                Produce a {currentIntervalMetaData.currentIntervalName.toLowerCase()} from the base note
            </p>
            <button onClick={onClickBase}>Play again (1)</button>
            <button onClick={onClickBaseConfirm}>Check (2)</button>
            <button onClick={onClickNext}>next (3)</button>
        </div>
        <IntervalSelector/>
    </div>
}