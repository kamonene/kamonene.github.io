import React, {FunctionComponent, useState} from 'react'
import {Produce} from "../produce/produce";
import style from './home.module.less';

export const Home: FunctionComponent = () => {
    const [start, setStart] = useState(false)
    return <div className={style.home}>
        <div>
            {!start && <>
                <h3>Relative pitch</h3>
                <p>ducks ducks ducks</p>
                <button onClick={() => {
                    setStart(true)
                }}>
                    Get started
                </button>
            </>}
            {start && <Produce/>}dw
            {start}
        </div>
    </div>
}