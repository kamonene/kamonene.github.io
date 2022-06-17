import React, {useState} from 'react';
import {Home} from "./components/home/home";
import {Intervals} from "./utils/utils";

interface Options {
    activeIntervals: Array<Intervals>
    currentInterval: Intervals,
}

const defaultOptions: Options = {
    activeIntervals: [Intervals["Perfect unison"], Intervals["Perfect fifth"]],
    currentInterval: Intervals['Perfect fifth']
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
