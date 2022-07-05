import React, {
  FunctionComponent,
  HTMLAttributes,
  useContext,
  useEffect,
} from "react";
import { ctx } from "../../../App";
import * as Tone from "tone";
import { pitchIncrease } from "../../../utils/utils";
import { useSynth } from "../../../utils/use-synth";

type Props = HTMLAttributes<HTMLButtonElement>;

export const PlayRelativeInterval: FunctionComponent<Props> = ({
  children,
}: Props) => {
  const { currentIntervalMetaData } = useContext(ctx);
  const synth = useSynth();

  useEffect(() => {
    const keyBindSynth = new Tone.Synth().toDestination();

    const keydown = (event: KeyboardEvent) => {
      if (event.key === "w" && !event.repeat) {
        keyBindSynth.triggerAttack(
          pitchIncrease(
            currentIntervalMetaData.baseNote,
            currentIntervalMetaData.interval
          )
        );
      }
    };

    const keyup = (event: KeyboardEvent) => {
      if (event.key === "w" && !event.repeat) {
        keyBindSynth.triggerRelease();
      }
    };

    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);
    return () => {
      document.removeEventListener("keyup", keyup);
      document.removeEventListener("keydown", keydown);

      keyBindSynth.triggerRelease();

      keyBindSynth.dispose();
    };
  }, [currentIntervalMetaData]);
  const onClick = () => {
    const pitchAsString = pitchIncrease(
      currentIntervalMetaData.baseNote,
      currentIntervalMetaData.interval
    );
    synth?.triggerAttackRelease(pitchAsString, "3n");
  };
  return (
    <button onClick={onClick}>
      <>{children}</>
    </button>
  );
};
