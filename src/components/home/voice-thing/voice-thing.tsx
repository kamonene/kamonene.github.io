import React, { useEffect, useState } from "react";
import { PitchDetector } from "pitchy";
import { numberToNote } from "../../../utils/utils";

const bufferSize = 4096;

interface Note {
  noteName: string;
  noteNumber: number;
}

export const VoiceThing = () => {
  const [note, setNote] = useState<Note>({
    noteName: "",
    noteNumber: 0,
  });
  useEffect(() => {
    const audioContext: AudioContext = new AudioContext();
    const analyzer = audioContext.createAnalyser();
    const scriptProcessor = audioContext.createScriptProcessor(
      bufferSize,
      1,
      1
    );
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      audioContext.createMediaStreamSource(stream).connect(analyzer);
      analyzer.connect(scriptProcessor);
      scriptProcessor.connect(audioContext.destination);
      const eventListener = (event: AudioProcessingEvent) => {
        const detector = PitchDetector.forFloat32Array(bufferSize);
        const pitch: Array<number> = detector.findPitch(
          event.inputBuffer.getChannelData(0),
          audioContext.sampleRate
        );
        const noteNumber =
          Math.round(12 * (Math.log(pitch[0] / 440) / Math.log(2))) + 57;

        const currentNote = { noteName: numberToNote(noteNumber), noteNumber };
        if (noteNumber > 0 && currentNote.noteName && currentNote.noteNumber) {
          setNote(currentNote);
        }
      };
      scriptProcessor.addEventListener("audioprocess", eventListener);
      return () => {
        scriptProcessor.removeEventListener("audioprocess", eventListener);
      };
    });
  }, []);

  return <div>{JSON.stringify(note)}</div>;
};
