import { noteToNumber, numberToNote } from "../../utils/utils";
import { useContext, useEffect } from "react";
import * as Tone from "tone";
import { ctx } from "../../App";

export const useIntervalKeyBindings = () => {
  const { currentIntervalMetaData } = useContext(ctx);
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
          numberToNote(noteToNumber(currentIntervalMetaData.baseNote))
        );
      }
      if (event.code === "Digit2" && !event.repeat && !event.shiftKey) {
        synth1.triggerAttack(
          numberToNote(
            noteToNumber(currentIntervalMetaData.baseNote) +
              currentIntervalMetaData.multiplier
          )
        );
      }
      if (event.code === "Digit2" && !event.repeat && event.shiftKey) {
        synth2.triggerAttack(
          numberToNote(
            noteToNumber(currentIntervalMetaData.baseNote) +
              2 * currentIntervalMetaData.multiplier
          )
        );
      }
      if (event.code === "Digit3" && !event.repeat && !event.shiftKey) {
        synth3.triggerAttack(
          numberToNote(
            noteToNumber(currentIntervalMetaData.baseNote) +
              3 * currentIntervalMetaData.multiplier
          )
        );
      }
      if (event.code === "Digit3" && !event.repeat && event.shiftKey) {
        synth4.triggerAttack(
          numberToNote(
            noteToNumber(currentIntervalMetaData.baseNote) +
              4 * currentIntervalMetaData.multiplier
          )
        );
      }
      if (event.code === "Digit4" && !event.repeat && !event.shiftKey) {
        synth5.triggerAttack(
          numberToNote(
            noteToNumber(currentIntervalMetaData.baseNote) +
              5 * currentIntervalMetaData.multiplier
          )
        );
      }
      if (event.code === "Digit4" && !event.repeat && event.shiftKey) {
        synth6.triggerAttack(
          numberToNote(
            noteToNumber(currentIntervalMetaData.baseNote) +
              6 * currentIntervalMetaData.multiplier
          )
        );
      }
      if (event.code === "Digit5" && !event.repeat) {
        synth7.triggerAttack(
          numberToNote(
            noteToNumber(currentIntervalMetaData.baseNote) +
              7 * currentIntervalMetaData.multiplier
          )
        );
      }
      if (event.code === "Digit6" && !event.repeat && !event.shiftKey) {
        synth8.triggerAttack(
          numberToNote(
            noteToNumber(currentIntervalMetaData.baseNote) +
              8 * currentIntervalMetaData.multiplier
          )
        );
      }
      if (event.code === "Digit6" && !event.repeat && event.shiftKey) {
        synth9.triggerAttack(
          numberToNote(
            noteToNumber(currentIntervalMetaData.baseNote) +
              9 * currentIntervalMetaData.multiplier
          )
        );
      }
      if (event.code === "Digit7" && !event.repeat && !event.shiftKey) {
        synth10.triggerAttack(
          numberToNote(
            noteToNumber(currentIntervalMetaData.baseNote) +
              10 * currentIntervalMetaData.multiplier
          )
        );
      }
      if (event.code === "Digit7" && !event.repeat && event.shiftKey) {
        synth11.triggerAttack(
          numberToNote(
            noteToNumber(currentIntervalMetaData.baseNote) +
              11 * currentIntervalMetaData.multiplier
          )
        );
      }
      if (event.code === "Digit8" && !event.repeat) {
        synth12.triggerAttack(
          numberToNote(
            noteToNumber(currentIntervalMetaData.baseNote) +
              12 * currentIntervalMetaData.multiplier
          )
        );
      }
    };

    const keyup = (event: KeyboardEvent) => {
      if (event.code === "Digit1" && !event.repeat) {
        synth0.triggerRelease();
      }
      if (event.code === "Digit2" && !event.repeat) {
        synth1.triggerRelease();
        synth2.triggerRelease();
      }
      if (event.code === "Digit3" && !event.repeat) {
        synth3.triggerRelease();
        synth4.triggerRelease();
      }
      if (event.code === "Digit4" && !event.repeat) {
        synth5.triggerRelease();
        synth6.triggerRelease();
      }
      if (event.code === "Digit5" && !event.repeat) {
        synth7.triggerRelease();
      }
      if (event.code === "Digit6" && !event.repeat) {
        synth8.triggerRelease();
        synth9.triggerRelease();
      }
      if (event.code === "Digit7" && !event.repeat) {
        synth10.triggerRelease();
        synth11.triggerRelease();
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

      synth0.dispose();
      synth1.dispose();
      synth2.dispose();
      synth3.dispose();
      synth4.dispose();
      synth5.dispose();
      synth6.dispose();
      synth7.dispose();
      synth8.dispose();
      synth9.dispose();
      synth10.dispose();
      synth11.dispose();
      synth12.dispose();
    };
  }, [currentIntervalMetaData]);
};
