import React, {FunctionComponent, useEffect, useState} from 'react'
import style from './home.module.less';

import {PracticeContainer} from "../practice-container/practice-container";
import {Options} from "../functional/options/options";

export enum Mode {
    'RECOGNIZE' = 'RECOGNIZE',
    'PRODUCE' = 'PRODUCE',
}

export const Home: FunctionComponent = () => {
    const [toggle, setToggle] = useState(true)
    const [showOptions, setShowOptions] = useState(false)
    useEffect(() => {
        const keyup = (event: KeyboardEvent) => {
            if (event.key === '4' && !event.repeat) {
                setToggle(!toggle)
            }
        }
        document.addEventListener("keyup", keyup)
        return () => {
            document.removeEventListener("keyup", keyup)
        }
    }, [toggle])

    return <div className={style.home}>
        <div className={style.container}>
            <button className={style.button} onClick={() => {
                setShowOptions(!showOptions)
            }}>
                ≡
            </button>
            <h3 className={style.title}>Relative pitch</h3>
            <p className={style.infoText}>{toggle ? 'Identify the interval' : 'Produce the given interval from the base note'}</p>

            <button onClick={() => {
                setToggle(!toggle)
            }}>
                Change practice mode (4)
            </button>
            <div className={style.divider}/>

            {showOptions && <Options/>}
            {toggle && <PracticeContainer mode={Mode.RECOGNIZE}/>}
            {!toggle && <PracticeContainer mode={Mode.PRODUCE}/>}
        </div>
    </div>
}