import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import * as Tone from "tone";
import {findNextInterval, noteToNumber, pitchIncrease} from "../../utils/utils";
import {IntervalSelector} from "../functional/pitch-selector/interval-selector";
import {ctx} from "../../App";
import style from './practice-container.module.less'
import {Mode} from "../../utils/constants";


interface Props {
    mode: Mode
}

export const PracticeContainer: FunctionComponent<Props> = ({mode}: Props) => {
    const {options} = useContext(ctx)
    const [currentIntervalMetaData, setCurrentIntervalMetaData] = useState(findNextInterval(options))
    const [reveal, setReveal] = useState(false)

    useEffect(() => {
            const baseNoteSynth = new Tone.Synth().toDestination()
            const augmentedSynth = new Tone.Synth().toDestination()
            const keydown = (event: KeyboardEvent) => {
                if (event.key === '1' && !event.repeat) {
                    baseNoteSynth.triggerAttack(currentIntervalMetaData.baseNote)
                }
                if (event.key === '2' && !event.repeat) {
                    augmentedSynth.triggerAttack(pitchIncrease(note, currentIntervalMetaData.interval));
                }
            }

            const keyup = (event: KeyboardEvent) => {
                if (event.key === '1' && !event.repeat) {
                    baseNoteSynth.triggerRelease()
                }
                if (event.key === '2' && !event.repeat) {
                    augmentedSynth.triggerRelease()
                }
            }

            document.addEventListener('keydown', keydown)
            document.addEventListener('keyup', keyup)
            return () => {
                document.removeEventListener('keyup', keyup)
                document.removeEventListener('keydown', keydown)

                augmentedSynth.triggerRelease()
                baseNoteSynth.triggerRelease()
            }
        }, [currentIntervalMetaData]
    )

    useEffect(() => {
        if (!reveal) {
            setCurrentIntervalMetaData(findNextInterval(options))
        }
        const keyup = (event: KeyboardEvent) => {
            if (event.key === '3' && !event.repeat) {
                if (mode === Mode.RECOGNIZE && !reveal) {
                    setReveal(true)
                    return
                }
                setCurrentIntervalMetaData(findNextInterval(options))
                setReveal(false)
            }
        }
        document.addEventListener('keyup', keyup)

        return () => {
            document.removeEventListener('keyup', keyup)
        }
    }, [options, options.activeIntervals.length, reveal])

    useEffect(() => {
        const keyup = (event: KeyboardEvent) => {
            if (event.key === ' ' && !event.repeat) {
                setReveal(true)
            }
        }
        document.addEventListener('keyup', keyup)
        return () => {
            document.removeEventListener('keyup', keyup)
        }
    }, [])

    const note = currentIntervalMetaData.baseNote

    const onClickBase = () => {
        const synth = new Tone.Synth().toDestination()
        synth.triggerAttackRelease(note, "3n");

    }
    const onClickBaseConfirm = () => {
        const synth = new Tone.Synth().toDestination()
        const pitchAsString = pitchIncrease(note, currentIntervalMetaData.interval)
        synth.triggerAttackRelease(pitchAsString, "3n");
    }
    const onClickNext = () => {
        if (mode === Mode.RECOGNIZE && !reveal) {
            setReveal(true)
            return
        }
        setCurrentIntervalMetaData(findNextInterval(options))
        setReveal(false)
    }

    return <div className={style.container}>
        <div className={style.leftArea}>
            {mode === Mode.PRODUCE &&
                <p>
                    {currentIntervalMetaData.multiplier === 1 ? 'Ascending' : 'Descending'} {currentIntervalMetaData.intervalName.toLowerCase()}
                </p>
            }
            {mode === Mode.RECOGNIZE &&
                <p className={reveal ? '' : style.hide}>
                    {currentIntervalMetaData.intervalName}
                </p>
            }
            <button
                onClick={onClickBase}>Play first (1)
            </button>
            <button onClick={onClickBaseConfirm}>Play second (2)</button>
            <button onClick={onClickNext}>{mode === Mode.RECOGNIZE && !reveal ? 'Reveal' : 'Next'} (3)</button>
            {mode === Mode.RECOGNIZE && <>
                <button onClick={() => {
                    setReveal(!reveal)
                }}>Reveal (space)
                </button>

            </>}
        </div>
        <IntervalSelector/>
    </div>
}