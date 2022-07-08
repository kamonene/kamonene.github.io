import React, {
  FunctionComponent,
  HTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react";
import { ctx } from "../../../App";
import * as Tone from "tone";
import { pitchIncrease } from "../../../utils/utils";
import { useSynth } from "../../hooks/use-synth";
import { isMobile } from "react-device-detect";
import style from "./button.module.less";
import { Tab } from "../../../utils/constants";

type Props = HTMLAttributes<HTMLButtonElement>;

export const PlayRelativeInterval: FunctionComponent<Props> = ({
  className,
  ...rest
}: Props) => {
  const { options, note, currentIntervalMetaData } = useContext(ctx);
  const current = useSynth();
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    setShouldShow(true);
    const timeout = setTimeout(() => {
      setShouldShow(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [note]);
  const isGreen =
    shouldShow &&
    note.noteName ===
      pitchIncrease(
        currentIntervalMetaData.baseNote,
        currentIntervalMetaData.interval
      ) &&
    options.tab === Tab.PRACTICE;
  useEffect(() => {
    if (isMobile) {
      return;
    }
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
      if (isMobile) {
        return;
      }
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
    current.synth?.triggerAttackRelease(pitchAsString, "3n");
  };
  return (
    <button
      className={`${className} ${isGreen ? style.green : ""}`}
      {...rest}
      onClick={onClick}
    />
  );
};
