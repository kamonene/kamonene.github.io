import React, {useState} from 'react';
import {Home} from "./components/home/home";
import {Interval} from "./utils/utils";

export interface Options {
    activeIntervals: Array<Interval>
    baseNoteLower: number,
    baseNoteUpper: number,

}

const defaultOptions: Options = {
    activeIntervals: [Interval["Perfect fifth"]],
    baseNoteLower: 35,
    baseNoteUpper: 50
}
const defaultUpdate: React.Dispatch<React.SetStateAction<Options>> = () => defaultOptions;

export const ctx = React.createContext({
    options: defaultOptions,
    setOptions: defaultUpdate
});

function App() {
    const [options, setOptions] = useState<Options>(defaultOptions)
    return (
        <div className={'appContainer'}>
            <ctx.Provider value={{options, setOptions}}>
                <Home/>
            </ctx.Provider>
        </div>

    );
}

export default App;
