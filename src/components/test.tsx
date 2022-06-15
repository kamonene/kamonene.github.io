import React, {FunctionComponent} from 'react'
import {ctx} from "../App";

export const Test: FunctionComponent = () => {

    const {options, setOptions} = React.useContext(ctx);

    return <div>
        <button onClick={() => {
            setOptions({...options, notes: ['ducks']})
        }}>
            button!
        </button>
        {options.notes.map(item=>item)}
    </div>
}