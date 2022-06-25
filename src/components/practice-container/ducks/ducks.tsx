import {
  IntervalMetaData,
  noteToNumber,
  numberToNote,
} from "../../../utils/utils";
import React, { useEffect } from "react";
import * as Tone from "tone";

interface Props {
  currentInterval: IntervalMetaData;
}

export const Ducks = ({ currentInterval }: Props) => {
  useEffect(() => {
    const synth0 = new Tone.Synth().toDestination();
    const synth1 = new Tone.Synth().toDestination();
    const synth2 = new Tone.Synth().toDestination();
    const synth3 = new Tone.Synth().toDestination();
    const synth4 = new Tone.Synth().toDestination();
    const synth5 = new Tone.Synth().toDestination();
    const synth6 = new Tone.Synth().toDestination();
    const synth7 = new Tone.Synth().toDestination();
    const synth8 = new Tone.Synth().toDestination();
    const synth9 = new Tone.Synth().toDestination();
    const synth10 = new Tone.Synth().toDestination();
    const synth11 = new Tone.Synth().toDestination();
    const synth12 = new Tone.Synth().toDestination();
    const keydown = (event: KeyboardEvent) => {
      if (event.code === "Digit1" && !event.repeat) {
        synth0.triggerAttack(
          numberToNote(noteToNumber(currentInterval.baseNote))
        );
      }
      if (event.code === "Digit2" && !event.repeat && !event.shiftKey) {
        synth1.triggerAttack(
          numberToNote(noteToNumber(currentInterval.baseNote) + 1)
        );
      }
      if (event.code === "Digit2" && !event.repeat && event.shiftKey) {
        synth2.triggerAttack(
          numberToNote(noteToNumber(currentInterval.baseNote) + 2)
        );
      }
      if (event.code === "Digit3" && !event.repeat && !event.shiftKey) {
        synth3.triggerAttack(
          numberToNote(noteToNumber(currentInterval.baseNote) + 3)
        );
      }
      if (event.code === "Digit3" && !event.repeat && event.shiftKey) {
        synth4.triggerAttack(
          numberToNote(noteToNumber(currentInterval.baseNote) + 4)
        );
      }
      if (event.code === "Digit4" && !event.repeat && !event.shiftKey) {
        synth5.triggerAttack(
          numberToNote(noteToNumber(currentInterval.baseNote) + 5)
        );
      }
      if (event.code === "Digit4" && !event.repeat && event.shiftKey) {
        synth6.triggerAttack(
          numberToNote(noteToNumber(currentInterval.baseNote) + 6)
        );
      }
      if (event.code === "Digit5" && !event.repeat) {
        synth7.triggerAttack(
          numberToNote(noteToNumber(currentInterval.baseNote) + 7)
        );
      }
      if (event.code === "Digit6" && !event.repeat && !event.shiftKey) {
        synth8.triggerAttack(
          numberToNote(noteToNumber(currentInterval.baseNote) + 8)
        );
      }
      if (event.code === "Digit6" && !event.repeat && event.shiftKey) {
        synth9.triggerAttack(
          numberToNote(noteToNumber(currentInterval.baseNote) + 9)
        );
      }
      if (event.code === "Digit7" && !event.repeat && !event.shiftKey) {
        synth10.triggerAttack(
          numberToNote(noteToNumber(currentInterval.baseNote) + 10)
        );
      }
      if (event.code === "Digit7" && !event.repeat && event.shiftKey) {
        synth11.triggerAttack(
          numberToNote(noteToNumber(currentInterval.baseNote) + 11)
        );
      }
      if (event.code === "Digit8" && !event.repeat) {
        synth12.triggerAttack(
          numberToNote(noteToNumber(currentInterval.baseNote) + 12)
        );
      }
    };

    const keyup = (event: KeyboardEvent) => {
      console.log(event.code);
      console.log(event.key);
      console.log(event.keyCode);
      if (event.code === "Digit1" && !event.repeat) {
        synth0.triggerRelease();
      }
      if (event.code === "Digit2" && !event.repeat) {
        synth1.triggerRelease();
      }
      if (event.code === "Digit3" && !event.repeat) {
        synth3.triggerRelease();
      }
      if (event.code === "Digit4" && !event.repeat) {
        synth5.triggerRelease();
      }
      if (event.code === "Digit5" && !event.repeat) {
        synth7.triggerRelease();
      }
      if (event.code === "Digit6" && !event.repeat) {
        synth9.triggerRelease();
      }
      if (event.code === "Digit7" && !event.repeat) {
        synth10.triggerRelease();
      }
      if (event.code === "Digit8" && !event.repeat) {
        synth12.triggerRelease();
      }
    };

    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);
    return () => {
      document.removeEventListener("keyup", keyup);
      document.removeEventListener("keydown", keydown);

      synth0.triggerRelease();
      synth1.triggerRelease();
      synth2.triggerRelease();
      synth3.triggerRelease();
      synth4.triggerRelease();
      synth5.triggerRelease();
      synth6.triggerRelease();
      synth7.triggerRelease();
      synth8.triggerRelease();
      synth9.triggerRelease();
      synth10.triggerRelease();
      synth11.triggerRelease();
      synth12.triggerRelease();
    };
  }, [currentInterval]);

  return <></>;
};
