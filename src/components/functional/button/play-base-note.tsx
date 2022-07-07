import React, {
  FunctionComponent,
  HTMLAttributes,
  useContext,
  useEffect,
} from "react";
import { useSynth } from "../../hooks/use-synth";
import { ctx } from "../../../App";
import * as Tone from "tone";
import { isMobile } from "react-device-detect";

type Props = HTMLAttributes<HTMLButtonElement>;

export const PlayBaseNote: FunctionComponent<Props> = ({ children }: Props) => {
  const { currentIntervalMetaData } = useContext(ctx);
  const current = useSynth();

  useEffect(() => {
    if (isMobile) {
      return;
    }
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
      if (isMobile) {
        return;
      }
      document.removeEventListener("keyup", keyup);
      document.removeEventListener("keydown", keydown);
      baseNoteSynth.triggerRelease();
      baseNoteSynth.dispose();
    };
  }, [currentIntervalMetaData]);

  const onClick = () => {
    current.synth?.triggerAttackRelease(currentIntervalMetaData.baseNote, "3n");
  };
  return (
    <button onClick={onClick}>
      <>{children}</>
    </button>
  );
};
