import React from 'react';
import * as Tone from 'tone';
import './App.css';

function App() {

    const onClick = () => {
        const synth = new Tone.Synth().toDestination()
        synth.triggerAttackRelease("C4", "8n");

    }

    return (
        <div className="App">
            <button onClick={onClick}>noise!</button>
        </div>
    );
}

export default App;
