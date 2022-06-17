import React, {FunctionComponent, useContext, useEffect} from 'react'
import {ctx} from "../../../App";
import {intervalList} from "../../../utils/utils";
import style from './interval-selector.module.less'


export const IntervalSelector: FunctionComponent = () => {
    const {options, setOptions} = useContext(ctx)
    const activeIntervals = options.activeIntervals


    useEffect(() => {
        const current = activeIntervals[Math.floor(Math.random() * activeIntervals.length)]

        setOptions({...options, currentInterval: current})
    }, [activeIntervals.length])

    return <div className={style.container}>
        {intervalList.map(interval =>
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