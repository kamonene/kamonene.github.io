import React, {useState} from 'react';
import './App.css'
import {Test} from "./components/test";

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
    return (
        <div className="App">
            <ctx.Provider value={{options, setOptions}}>
                <Test/>
            </ctx.Provider>

        </div>
    );
}

export default App;
