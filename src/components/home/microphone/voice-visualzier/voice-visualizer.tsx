import React, { useContext, useEffect, useState } from "react";
import { intervals } from "../../../../utils/constants";
import { ctx } from "../../../../App";
import style from "./voice-visualizer.module.less";
import { noteToNumber } from "../../../../utils/utils";

export const VoiceVisualizer = () => {
  const { note, options, currentIntervalMetaData } = useContext(ctx);
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

  const reversedIntervals = Object.assign([], intervals)
    .reverse()
    .slice(0, intervals.length - 1);

  return (
    <div className={style.container}>
      {reversedIntervals.map((interval, index) => {
        const offset = intervals.findIndex(
          (interval1) => interval1 === interval
        );
        const number = noteToNumber(currentIntervalMetaData.baseNote) + offset;
        const matches = shouldShow && note.noteNumber === number;
        const isOutOfRange = number > options.baseNoteUpper;
        return (
          <div
            key={index}
            className={(() => {
              if (matches) {
                return style.active;
              } else if (isOutOfRange) {
                return style.outOfRange;
              } else {
                return style.inactive;
              }
            })()}
          >
            {interval}
          </div>
        );
      })}
      {intervals.map((interval, index) => {
        const number =
          noteToNumber(currentIntervalMetaData.baseNote) + index * -1;
        const matches = shouldShow && note.noteNumber === number;
        const isOutOfRange = number < options.baseNoteLower;

        return (
          <div
            key={index}
            className={(() => {
              if (matches) {
                return style.active;
              } else if (isOutOfRange) {
                return style.outOfRange;
              } else {
                return style.inactive;
              }
            })()}
          >
            {interval}
          </div>
        );
      })}
    </div>
  );
};
