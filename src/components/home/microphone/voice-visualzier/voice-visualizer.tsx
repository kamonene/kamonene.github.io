import React, { useContext, useEffect, useState } from "react";
import { intervals } from "../../../../utils/constants";
import { ctx } from "../../../../App";
import style from "./voice-visualizer.module.less";
import { noteToNumber } from "../../../../utils/utils";
import { Note } from "../with-microphone";

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
      {!options.enableMicrophone && (
        <p>Does not work well without microphone enabled</p>
      )}
      {reversedIntervals.map((interval, index) => {
        const offset = intervals.findIndex(
          (interval1) => interval1 === interval
        );
        const number = noteToNumber(currentIntervalMetaData.baseNote) + offset;
        const matches = shouldShow && note.noteNumber === number;
        const isOutOfRange = number > options.baseNoteUpper;
        return (
          <IntervalRow
            key={index}
            interval={interval}
            index={index}
            note={note}
            isOutOfRange={isOutOfRange}
            matches={matches}
          />
        );
      })}
      {intervals.map((interval, index) => {
        const number =
          noteToNumber(currentIntervalMetaData.baseNote) + index * -1;
        const matches = shouldShow && note.noteNumber === number;
        const isOutOfRange = number < options.baseNoteLower;

        return (
          <IntervalRow
            key={index}
            interval={interval}
            index={index}
            note={note}
            isOutOfRange={isOutOfRange}
            matches={matches}
          />
        );
      })}
    </div>
  );
};
interface IntervalRowProps {
  index: number;
  matches: boolean;
  isOutOfRange: boolean;
  note: Note;
  interval: string;
}
const IntervalRow = ({
  index,
  matches,
  isOutOfRange,
  note,
  interval,
}: IntervalRowProps) => {
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
      <div className={style.indicator}>
        {(() => {
          if (matches) {
            if (Math.abs(note.cents) < 20) {
              return "◯";
            } else if (note.cents < 0) {
              return "↑";
            } else if (note.cents > 0) {
              return "↓";
            }
          }
        })()}
      </div>
    </div>
  );
};
