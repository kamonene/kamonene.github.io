import React, {FunctionComponent} from 'react'
import {ctx} from "../App";

export const Test: FunctionComponent = () => {

    const {options, setOptions} = React.useContext(ctx);

    return <div>
        <button onClick={() => {
            setOptions({...options, activePitches: ['ducks']})
        }}>
            button!
        </button>
        {options.activePitches.map(item=>item)}
    </div>
}