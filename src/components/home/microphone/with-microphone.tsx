import React, { useContext, useEffect } from "react";
import { PitchDetector } from "pitchy";
import { numberToNote } from "../../../utils/utils";
import { ctx } from "../../../App";

const bufferSize = 4096;

export interface Note {
  noteName: string;
  noteNumber: number;
  volume: number;
}

export const WithMicrophone = () => {
  const { setNote } = useContext(ctx);
  useEffect(() => {
    const audioContext: AudioContext = new AudioContext();
    const analyzer = audioContext.createAnalyser();
    const scriptProcessor = audioContext.createScriptProcessor(
      bufferSize,
      1,
      1
    );
    let eventListener: (event: AudioProcessingEvent) => void;
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      audioContext.createMediaStreamSource(stream).connect(analyzer);
      analyzer.connect(scriptProcessor);
      scriptProcessor.connect(audioContext.destination);
      eventListener = (event: AudioProcessingEvent) => {
        const channelData = event.inputBuffer.getChannelData(0);
        const detector = PitchDetector.forFloat32Array(bufferSize);
        const pitch: Array<number> = detector.findPitch(
          channelData,
          audioContext.sampleRate
        );
        const noteNumber =
          Math.round(12 * (Math.log(pitch[0] / 440) / Math.log(2))) + 57;

        const volume =
          channelData
            .map((item: number) => Math.abs(item))
            .reduce((a, b) => a + b) / channelData.length;

        const currentNote = {
          noteName: numberToNote(noteNumber),
          noteNumber,
          volume: volume,
        };
        if (
          noteNumber > 0 &&
          currentNote.noteName &&
          currentNote.noteNumber &&
          volume > 0.02
        ) {
          setNote(currentNote);
        }
      };
      scriptProcessor.addEventListener("audioprocess", eventListener);
    });
    return () => {
      audioContext.close().then(() => {
        scriptProcessor.removeEventListener("audioprocess", eventListener);
        scriptProcessor.disconnect();
        analyzer.disconnect();
      });
    };
  }, [setNote]);

  return <></>;
};
