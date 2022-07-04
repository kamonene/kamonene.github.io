import React, { FunctionComponent, useContext, useEffect } from "react";
import { ctx } from "../../../App";

import style from "./interval-selector.module.less";
import { Interval, intervals } from "../../../utils/constants";
import { noteToNumber, numberToNote } from "../../../utils/utils";
import * as Tone from "tone";
import { useSynth } from "../../../utils/use-synth";

export const IntervalSelector: FunctionComponent = () => {
  const { options, setOptions, currentIntervalMetaData } = useContext(ctx);
  const activeIntervals = options.activeIntervals;
  useEffect(() => {
    const baseNoteSynth = new Tone.Synth().toDestination();
    const keyup = (event: KeyboardEvent) => {
      if (event.key === "1" && !event.repeat) {
        baseNoteSynth.triggerRelease();
      }
    };
    document.addEventListener("keyup", keyup);
    return () => {
      document.removeEventListener("keyup", keyup);

      baseNoteSynth.triggerRelease();
      baseNoteSynth.dispose();
    };
  }, [currentIntervalMetaData]);

  const synth = useSynth();

  const makeOnClick = (interval: Interval) => {
    return () => {
      if (activeIntervals.includes(interval)) {
        if (activeIntervals.length === 1) {
          return;
        }
        const index = activeIntervals.findIndex(
          (existingItem) => existingItem === interval
        );
        const before = activeIntervals.slice(0, index);
        const after = activeIntervals.slice(index + 1, activeIntervals.length);
        setOptions({
          ...options,
          activeIntervals: [...before, ...after],
        });
      } else {
        setOptions({
          ...options,
          activeIntervals: [...activeIntervals, interval],
        });
      }
    };
  };

  return (
    <div className={style.container}>
      {intervals.map((interval, index) => (
        <div key={interval} className={style.buttonRow}>
          <button
            className={`${style.button} ${
              activeIntervals.includes(interval) ? style.active : ""
            }`}
            onClick={makeOnClick(interval)}
          >
            {interval}
          </button>
          <button
            onClick={() => {
              synth?.triggerAttackRelease(
                numberToNote(
                  noteToNumber(currentIntervalMetaData.baseNote) +
                    index * currentIntervalMetaData.multiplier
                ),
                "3n"
              );
            }}
          >
            🔊
          </button>
        </div>
      ))}
    </div>
  );
};
