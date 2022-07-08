import React, {
  FunctionComponent,
  HTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSynth } from "../../hooks/use-synth";
import { ctx } from "../../../App";
import * as Tone from "tone";
import { isMobile } from "react-device-detect";
import style from "./button.module.less";
import { Tab } from "../../../utils/constants";

type Props = HTMLAttributes<HTMLButtonElement>;

export const PlayBaseNote: FunctionComponent<Props> = ({
  className,
  ...rest
}: Props) => {
  const { options, currentIntervalMetaData, note } = useContext(ctx);
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
  const current = useSynth();
  const isGreen =
    shouldShow &&
    currentIntervalMetaData.baseNote === note.noteName &&
    options.tab === Tab.PRACTICE;
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
    <button
      className={`${className} ${isGreen ? style.green : ""}`}
      {...rest}
      onClick={onClick}
    />
  );
};
