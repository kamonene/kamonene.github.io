import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import * as Tone from "tone";
import { findNextInterval, pitchIncrease } from "../../../utils/utils";
import { IntervalSelector } from "../../functional/interval-selector/interval-selector";
import { ctx } from "../../../App";
import style from "./practice-container.module.less";
import { Mode } from "../../../utils/constants";
import { KeybindWrapper } from "./keybind-wrapper/keybind-wrapper";
import { Synth } from "tone";

interface Props {
  mode: Mode;
}

interface Ref {
  synth1?: Synth;
  synth2?: Synth;
}

export const PracticeContainer: FunctionComponent<Props> = ({
  mode,
}: Props) => {
  const { options, currentIntervalMetaData, setCurrentIntervalMetaData } =
    useContext(ctx);

  const [reveal, setReveal] = useState(false);
  const ref = useRef<Ref>({ synth1: undefined, synth2: undefined });
  useEffect(() => {
    const current = ref.current;
    current.synth1 = new Tone.Synth().toDestination();
    current.synth2 = new Tone.Synth().toDestination();
    return () => {
      current.synth1?.dispose();
      current.synth2?.dispose();
    };
  }, []);
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

  useEffect(() => {
    if (!reveal) {
      setCurrentIntervalMetaData(findNextInterval(options));
    }
    const keyup = (event: KeyboardEvent) => {
      if (event.key === "e" && !event.repeat) {
        if (mode === Mode.RECOGNIZE && !reveal) {
          setReveal(true);
          return;
        }
        setCurrentIntervalMetaData(findNextInterval(options));
        setReveal(false);
      }
    };
    document.addEventListener("keyup", keyup);

    return () => {
      document.removeEventListener("keyup", keyup);
    };
  }, [mode, options, reveal, setCurrentIntervalMetaData]);

  const note = currentIntervalMetaData.baseNote;

  const onClickBase = () => {
    ref.current.synth1?.triggerAttackRelease(note, "3n");
  };
  const onClickBaseConfirm = () => {
    const pitchAsString = pitchIncrease(note, currentIntervalMetaData.interval);
    ref.current.synth2?.triggerAttackRelease(pitchAsString, "3n");
  };
  const onClickNext = () => {
    if (mode === Mode.RECOGNIZE && !reveal) {
      setReveal(true);
      return;
    }
    setCurrentIntervalMetaData(findNextInterval(options));
    setReveal(false);
  };

  return (
    <div className={style.container}>
      <KeybindWrapper currentInterval={currentIntervalMetaData} />
      <div className={style.leftArea}>
        {mode === Mode.PRODUCE && (
          <p>
            {currentIntervalMetaData.multiplier === 1
              ? "Ascending"
              : "Descending"}{" "}
            {currentIntervalMetaData.intervalName.toLowerCase()}
          </p>
        )}
        {mode === Mode.RECOGNIZE && (
          <p className={reveal ? "" : style.hide}>
            {currentIntervalMetaData.intervalName}
          </p>
        )}
        <button onClick={onClickBase}>Play first (q)</button>
        <button onClick={onClickBaseConfirm}>Play second (w)</button>
        <button onClick={onClickNext}>
          {mode === Mode.RECOGNIZE && !reveal ? "Reveal" : "Next"} (e)
        </button>
      </div>
      <IntervalSelector currentInterval={currentIntervalMetaData} />
    </div>
  );
};
