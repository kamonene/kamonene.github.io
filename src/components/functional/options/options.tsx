import React, {useContext} from 'react'
import {ctx} from "../../../App";
import {numberToNote} from "../../../utils/utils";
import * as Tone from "tone";
import style from './options.module.less'
import {defaultOptions} from "../../../utils/constants";

const synth = new Tone.Synth().toDestination()
export const Options = () => {
    const {options, setOptions} = useContext(ctx)
    const playUpper = () => {
        synth.triggerAttackRelease(numberToNote(options.baseNoteUpper), "8n");
    }
    const playLower = () => {
        synth.triggerAttackRelease(numberToNote(options.baseNoteLower), "8n");
    }
    return <div className={style.optionsContainer}>
        <div className={style.pitchControlContainer}>
            <button onClick={playUpper}>Max: {numberToNote(options.baseNoteUpper)}</button>
            <div className={style.arrows}>
                <button onClick={() => {

                    const newPitch = options.baseNoteUpper + 1
                    setOptions({...options, baseNoteUpper: newPitch})
                    synth.triggerAttackRelease(numberToNote(newPitch), "8n");
                }}>
                    ↑
                </button>
                <button
                    onClick={() => {
                        if (options.baseNoteUpper - options.baseNoteLower < 13) {
                            return
                        }
                        const newPitch = options.baseNoteUpper - 1
                        setOptions({...options, baseNoteUpper: newPitch})
                        synth.triggerAttackRelease(numberToNote(newPitch), "8n");
                    }}
                >
                    ↓
                </button>
            </div>

        </div>
        <div className={style.pitchControlContainer}>

            <button onClick={playLower}>Min: {numberToNote(options.baseNoteLower)}</button>
            <div className={style.arrows}>
                <button onClick={() => {
                    if (options.baseNoteUpper - options.baseNoteLower < 13) {
                        return
                    }
                    const newPitch = options.baseNoteLower + 1
                    setOptions({...options, baseNoteLower: newPitch})
                    synth.triggerAttackRelease(numberToNote(newPitch), "8n");
                }}>
                    ↑
                </button>

                <button
                    onClick={() => {
                        const newPitch = options.baseNoteLower - 1
                        setOptions({...options, baseNoteLower: newPitch})
                        synth.triggerAttackRelease(numberToNote(newPitch), "8n");
                    }}
                >
                    ↓
                </button>
            </div>
        </div>
        <div className={style.reset}>
            <button onClick={() => {
                setOptions(defaultOptions)
            }
            }>Reset
            </button>
        </div>
    </div>
}