import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import * as Tone from "tone";
import { findNextInterval, pitchIncrease } from "../../utils/utils";
import { IntervalSelector } from "../functional/interval-selector/interval-selector";
import { ctx } from "../../App";
import style from "./practice-container.module.less";
import { Mode } from "../../utils/constants";
import { Ducks } from "./ducks/ducks";

interface Props {
  mode: Mode;
}

export const PracticeContainer: FunctionComponent<Props> = ({
  mode,
}: Props) => {
  const { options } = useContext(ctx);
  const [currentIntervalMetaData, setCurrentIntervalMetaData] = useState(
    findNextInterval(options)
  );
  const [reveal, setReveal] = useState(false);

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
  }, [mode, options, reveal]);

  const note = currentIntervalMetaData.baseNote;

  const onClickBase = () => {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(note, "3n");
  };
  const onClickBaseConfirm = () => {
    const synth = new Tone.Synth().toDestination();
    const pitchAsString = pitchIncrease(note, currentIntervalMetaData.interval);
    synth.triggerAttackRelease(pitchAsString, "3n");
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
      <Ducks currentInterval={currentIntervalMetaData} />
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
