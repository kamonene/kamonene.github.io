import React, { useEffect, useState } from "react";
import { PitchDetector } from "pitchy";
import { numberToNote } from "../../../utils/utils";

const bufferSize = 4096;

export const VoiceThing = () => {
  const [frequency, setFrequency] = useState<number>(0);
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

        setFrequency(pitch[0]);
      };
      scriptProcessor.addEventListener("audioprocess", eventListener);
      return () => {
        scriptProcessor.removeEventListener("audioprocess", eventListener);
      };
    });
  }, []);
  const note = Math.round(12 * (Math.log(frequency / 440) / Math.log(2))) + 69;
  return (
    <div>
      {numberToNote(note ?? 0)}
      <br />
      {note}
    </div>
  );
};
