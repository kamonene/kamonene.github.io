import React, {FunctionComponent, useContext, useEffect} from 'react'
import {ctx} from "../../../App";
import {intervals} from "../../../utils/utils";
import style from './interval-selector.module.less'


export const IntervalSelector: FunctionComponent = () => {
    const {options, setOptions} = useContext(ctx)
    const activeIntervals = options.activeIntervals



    return <div className={style.container}>
        {intervals.map(interval =>
            <button key={interval}
                    className={`${style.button} ${activeIntervals.includes(interval) ? style.active : ''}`}
                    onClick={() => {
                        if (activeIntervals.includes(interval)) {
                            if (activeIntervals.length === 1) {
                                return
                            }
                            const index = activeIntervals.findIndex(existingItem => existingItem === interval)
                            const before = activeIntervals.slice(0, index)
                            const after = activeIntervals.slice(index + 1, activeIntervals.length)
                            setOptions({...options, activeIntervals: [...before, ...after]})
                        } else {
                            setOptions({...options, activeIntervals: [...activeIntervals, interval]})
                        }
                    }}>{interval}</button>
        )}
    </div>
}