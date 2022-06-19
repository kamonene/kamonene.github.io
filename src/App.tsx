import React, {useEffect, useState} from 'react';
import {Home} from "./components/home/home";
import {defaultOptions, Interval, Options} from "./utils/constants";
import {useCookies} from "react-cookie";


const defaultUpdate: React.Dispatch<React.SetStateAction<Options>> = () => defaultOptions;

export const ctx = React.createContext({
    options: defaultOptions,
    setOptions: defaultUpdate
});

const cookieName = 'options'

function App() {
    const [options, setOptions] = useState<Options>(defaultOptions)
    const [cookies, setCookie] = useCookies(['options'])

    useEffect(() => {
        setOptions(cookies.options)
    }, [])

    useEffect(() => {
        setCookie(cookieName, options)
    }, [options])

    return (
        <div className={'appContainer'}>
            <ctx.Provider value={{options, setOptions}}>
                <Home/>
            </ctx.Provider>
        </div>

    );
}

export default App;
