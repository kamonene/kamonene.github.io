import React, {useState} from 'react';
import {Produce} from "./components/produce/produce";
import {Home} from "./components/home/home";

interface Options {
    activePitches: Array<string>
}

const defaultOptions: Options = {activePitches: []}
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
