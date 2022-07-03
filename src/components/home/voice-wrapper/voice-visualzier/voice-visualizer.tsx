import React, { HTMLAttributes, useContext, useEffect, useState } from "react";
import { Note } from "../voice-wrapper";
import { intervals } from "../../../../utils/constants";
import { ctx } from "../../../../App";
import style from "./voice-visualizer.module.less";
import { noteToNumber } from "../../../../utils/utils";

interface Props extends HTMLAttributes<HTMLDivElement> {
  note: Note;
}

export const VoiceVisualizer = ({ note }: Props) => {
  const { currentIntervalMetaData } = useContext(ctx);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    setShouldShow(true);
    const timeout = setTimeout(() => {
      setShouldShow(false);
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, [note.noteNumber]);

  const reversedIntervals = Object.assign([], intervals)
    .reverse()
    .slice(0, intervals.length - 1);

  return (
    <div>
      {reversedIntervals.map((interval, index) => {
        const offset = intervals.findIndex(
          (interval1) => interval1 === interval
        );
        const matches =
          shouldShow &&
          note.noteNumber ===
            noteToNumber(currentIntervalMetaData.baseNote) + offset;
        return (
          <div key={index} className={matches ? style.active : style.inactive}>
            {interval}
          </div>
        );
      })}
      {intervals.map((interval, index) => {
        const matches =
          shouldShow &&
          note.noteNumber ===
            noteToNumber(currentIntervalMetaData.baseNote) + index * -1;
        return (
          <div key={index} className={matches ? style.active : style.inactive}>
            {interval}
          </div>
        );
      })}
    </div>
  );
};
