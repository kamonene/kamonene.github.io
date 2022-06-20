import React, {FunctionComponent, useEffect, useState} from 'react'
import style from './home.module.less';

import {PracticeContainer} from "../practice-container/practice-container";

export enum Mode {
    'RECOGNIZE' = 'RECOGNIZE',
    'PRODUCE' = 'PRODUCE',
}

export const Home: FunctionComponent = () => {
    const [toggle, setToggle] = useState(true)
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
            <h3>Relative pitch</h3>
            <p>{toggle ? 'Practice producing the interval' : 'Practice recognizing the interval'}</p>

            <button onClick={() => {
                setToggle(!toggle)
            }}>
                {toggle ? 'Switch to recognizing (4)' : 'Switch to producing (4)'}
            </button>
            <div className={style.divider}/>
            {toggle && <PracticeContainer mode={Mode.RECOGNIZE}/>}
            {!toggle && <PracticeContainer mode={Mode.PRODUCE}/>}
        </div>
    </div>
}