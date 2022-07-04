import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { findNextInterval, pitchIncrease } from "../../../utils/utils";
import { ctx } from "../../../App";
import style from "./practice-container.module.less";
import { Mode } from "../../../utils/constants";
import { WithCurrentIntervalButtonBinds } from "../../ducks/with-current-interval-button-binds/with-current-interval-button-binds";
import { useSynth } from "../../../utils/use-synth";

interface Props {
  mode: Mode;
}

export const PracticeContainer: FunctionComponent<Props> = ({
  mode,
}: Props) => {
  const { options, currentIntervalMetaData, setCurrentIntervalMetaData } =
    useContext(ctx);

  const [reveal, setReveal] = useState(false);
  const synth1 = useSynth();
  const synth2 = useSynth();

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
    synth1?.triggerAttackRelease(note, "3n");
  };
  const onClickBaseConfirm = () => {
    const pitchAsString = pitchIncrease(note, currentIntervalMetaData.interval);
    synth2?.triggerAttackRelease(pitchAsString, "3n");
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
      <WithCurrentIntervalButtonBinds />
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

        {mode !== Mode.VOICE_SANDBOX && (
          <>
            <button onClick={onClickBase}>Play first (q)</button>
            <button onClick={onClickBaseConfirm}>Play second (w)</button>
            <button onClick={onClickNext}>
              {mode === Mode.RECOGNIZE && !reveal ? "Reveal" : "Next"} (e)
            </button>
          </>
        )}
        {mode === Mode.VOICE_SANDBOX && (
          <>
            <button onClick={onClickBase}>Play base (q)</button>
            <button onClick={onClickNext}>Next (e)</button>
          </>
        )}
      </div>
    </div>
  );
};
