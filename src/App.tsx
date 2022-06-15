import React, {useState} from 'react';
import './App.css'
import {Test} from "./components/test";
import {Recognize} from "./components/recognize/recognize";

interface Options {
    notes: Array<string>
}

const defaultOptions: Options = {notes: []}
const defaultUpdate: React.Dispatch<React.SetStateAction<Options>> = () => defaultOptions;
export const ctx = React.createContext({
    options: defaultOptions,
    setOptions: defaultUpdate
});

function App() {
    const [options, setOptions] = useState<Options>(defaultOptions)
    const [start, setStart] = useState(false)
    return (

        <div className={'appContainer'}>
            <ctx.Provider value={{options, setOptions}}>
                {!start && <>
                    <h3>Relative pitch exercises</h3>
                    <p>ducks ducks ducks</p>
                    <button onClick={() => {
                        setStart(true)
                    }}>
                        Get started
                    </button>
                </>}
                {start && <Recognize/>}

            </ctx.Provider>
        </div>

    );
}

export default App;
