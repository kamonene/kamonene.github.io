import React, { useContext, useEffect } from "react";
import { ctx } from "../../../App";
import * as Tone from "tone";
import { pitchIncrease } from "../../../utils/utils";

export const WithCurrentIntervalButtonBinds = () => {
  const { currentIntervalMetaData } = useContext(ctx);

  useEffect(() => {
    const baseNoteSynth = new Tone.Synth().toDestination();
    const augmentedSynth = new Tone.Synth().toDestination();

    const keydown = (event: KeyboardEvent) => {
      if (event.key === "q" && !event.repeat) {
        baseNoteSynth.triggerAttack(currentIntervalMetaData.baseNote);
      }
      if (event.key === "w" && !event.repeat) {
        augmentedSynth.triggerAttack(
          pitchIncrease(
            currentIntervalMetaData.baseNote,
            currentIntervalMetaData.interval
          )
        );
      }
    };

    const keyup = (event: KeyboardEvent) => {
      if (event.key === "q" && !event.repeat) {
        baseNoteSynth.triggerRelease();
      }
      if (event.key === "w" && !event.repeat) {
        augmentedSynth.triggerRelease();
      }
    };

    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);
    return () => {
      document.removeEventListener("keyup", keyup);
      document.removeEventListener("keydown", keydown);

      augmentedSynth.triggerRelease();
      baseNoteSynth.triggerRelease();
      augmentedSynth.dispose();
      baseNoteSynth.dispose();
    };
  }, [currentIntervalMetaData]);
  return <></>;
};
