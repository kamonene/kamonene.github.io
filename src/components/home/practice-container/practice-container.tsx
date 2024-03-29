import React, { FunctionComponent, useContext, useState } from "react";
import { ctx } from "../../../App";
import style from "./practice-container.module.less";
import { Mode } from "../../../utils/constants";
import { PlayBaseNote } from "../../functional/button/play-base-note";
import { PlayRelativeInterval } from "../../functional/button/play-relative-interval";
import { NextNoteButton } from "../../functional/button/next-note-button";
import { isMobile } from "react-device-detect";

interface Props {
  mode: Mode;
}

export const PracticeContainer: FunctionComponent<Props> = ({
  mode,
}: Props) => {
  const { currentIntervalMetaData } = useContext(ctx);
  const [reveal, setReveal] = useState(false);

  return (
    <div className={style.container}>
      <div className={style.leftArea}>
        {mode !== Mode.VOICE_SANDBOX && (
          <>
            <PlayBaseNote>
              {currentIntervalMetaData.baseNote} {isMobile ? "" : "(q)"}
            </PlayBaseNote>
            <PlayRelativeInterval>
              {(() => {
                if (mode === Mode.PRODUCE || reveal) {
                  return currentIntervalMetaData.intervalName;
                } else {
                  return "?";
                }
              })()}
              {currentIntervalMetaData.multiplier === 1 ? " ↑" : " ↓"}
              {isMobile ? "" : "(w)"}
            </PlayRelativeInterval>

            <NextNoteButton mode={mode} setReveal={setReveal} reveal={reveal}>
              {mode === Mode.RECOGNIZE && !reveal ? "Reveal" : "Next"}
              {isMobile ? "" : "(e)"}
            </NextNoteButton>
          </>
        )}
        {mode === Mode.VOICE_SANDBOX && (
          <>
            <PlayBaseNote>
              {currentIntervalMetaData.baseNote} {isMobile ? "" : "(q)"}
            </PlayBaseNote>
            <NextNoteButton mode={mode} setReveal={setReveal} reveal={reveal}>
              Next {isMobile ? "" : "(e)"}
            </NextNoteButton>
          </>
        )}
      </div>
    </div>
  );
};
