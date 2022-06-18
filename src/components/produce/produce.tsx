import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import * as Tone from "tone";
import {findNextInterval, pitchIncrease} from "../../utils/utils";
import {IntervalSelector} from "../functional/pitch-selector/interval-selector";
import {ctx} from "../../App";
import style from './produce.module.less'


const synth = new Tone.Synth().toDestination()

export const Produce: FunctionComponent = () => {
    const {options} = useContext(ctx)
    const [currentIntervalMetaData, setCurrentIntervalMetaData] = useState(findNextInterval(options))
    const [started, setStarted] = useState(false)
    useEffect(() => {
            if (started) {
                synth.triggerAttackRelease(currentIntervalMetaData.currentBaseNote, '8n')
            }
            const baseNoteSynth = new Tone.Synth().toDestination()
            const augmentedSynth = new Tone.Synth().toDestination()
            const keydown = (event: KeyboardEvent) => {
                if (event.key === '1' && !event.repeat) {
                    baseNoteSynth.triggerAttack(currentIntervalMetaData.currentBaseNote)
                }
                if (event.key === '2' && !event.repeat) {
                    augmentedSynth.triggerAttack(pitchIncrease(note, currentIntervalMetaData.currentInterval));
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
            <div>
                <label htmlFor={'autoplay'}>Autoplay</label>
                <input id={'autoplay'} type={'checkbox'} onClick={() => {
                    setStarted(!started)
                }}/>
            </div>
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