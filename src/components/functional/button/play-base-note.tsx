import React, {
  FunctionComponent,
  HTMLAttributes,
  useContext,
  useEffect,
} from "react";
import { useSynth } from "../../../utils/use-synth";
import { ctx } from "../../../App";
import * as Tone from "tone";

type Props = HTMLAttributes<HTMLButtonElement>;

export const PlayBaseNote: FunctionComponent<Props> = ({ children }: Props) => {
  const { currentIntervalMetaData } = useContext(ctx);
  const synth = useSynth();

  useEffect(() => {
    const baseNoteSynth = new Tone.Synth().toDestination();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "q" && !event.repeat) {
        baseNoteSynth.triggerAttack(currentIntervalMetaData.baseNote);
      }
    };
    const keyup = (event: KeyboardEvent) => {
      if (event.key === "q" && !event.repeat) {
        baseNoteSynth.triggerRelease();
      }
    };
    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);
    return () => {
      document.removeEventListener("keyup", keyup);
      document.removeEventListener("keydown", keydown);
      baseNoteSynth.triggerRelease();
      baseNoteSynth.dispose();
    };
  }, [currentIntervalMetaData]);

  const onClick = () => {
    synth?.triggerAttackRelease(currentIntervalMetaData.baseNote, "3n");
  };
  return (
    <button onClick={onClick}>
      <>{children}</>
    </button>
  );
};
