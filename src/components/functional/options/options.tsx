import React, { useContext } from "react";
import { ctx } from "../../../App";
import { numberToNote } from "../../../utils/utils";
import style from "./options.module.less";
import { defaultOptions } from "../../../utils/constants";
import { useSynth } from "../../../utils/use-synth";

export const Options = () => {
  const synth = useSynth();
  const { options, setOptions } = useContext(ctx);
  const playUpper = () => {
    synth?.triggerAttackRelease(numberToNote(options.baseNoteUpper), "8n");
  };
  const playLower = () => {
    synth?.triggerAttackRelease(numberToNote(options.baseNoteLower), "8n");
  };
  return (
    <div className={style.optionsContainer}>
      <div className={style.reset}>
        <button
          onClick={() => {
            setOptions(defaultOptions);
          }}
        >
          Reset
        </button>
      </div>
      <div className={style.pitchControlContainer}>
        <p className={style.pitchLabel}>Max pitch</p>
        <button onClick={playUpper}>
          {numberToNote(options.baseNoteUpper)}
        </button>
        <div className={style.arrows}>
          <button
            onClick={() => {
              const newPitch = options.baseNoteUpper + 1;
              setOptions({ ...options, baseNoteUpper: newPitch });
              synth?.triggerAttackRelease(numberToNote(newPitch), "8n");
            }}
          >
            ↑
          </button>
          <button
            onClick={() => {
              if (options.baseNoteUpper - options.baseNoteLower < 13) {
                return;
              }
              const newPitch = options.baseNoteUpper - 1;
              setOptions({ ...options, baseNoteUpper: newPitch });
              synth?.triggerAttackRelease(numberToNote(newPitch), "8n");
            }}
          >
            ↓
          </button>
        </div>
      </div>
      <div className={style.pitchControlContainer}>
        <p className={style.pitchLabel}>Min pitch</p>
        <button onClick={playLower}>
          {numberToNote(options.baseNoteLower)}
        </button>

        <div className={style.arrows}>
          <button
            onClick={() => {
              if (options.baseNoteUpper - options.baseNoteLower < 13) {
                return;
              }
              const newPitch = options.baseNoteLower + 1;
              setOptions({ ...options, baseNoteLower: newPitch });
              synth?.triggerAttackRelease(numberToNote(newPitch), "8n");
            }}
          >
            ↑
          </button>

          <button
            onClick={() => {
              const newPitch = options.baseNoteLower - 1;
              setOptions({ ...options, baseNoteLower: newPitch });
              synth?.triggerAttackRelease(numberToNote(newPitch), "8n");
            }}
          >
            ↓
          </button>
        </div>
      </div>
      <div className={style.allowedDirectionContainer}>
        <div>
          <label htmlFor={"ascending"}>Ascending intervals</label>
          <input
            onChange={() => {
              if (!options.allowDescending) {
                return;
              }
              setOptions({
                ...options,
                allowAscending: !options.allowAscending,
              });
            }}
            checked={options.allowAscending}
            type={"checkbox"}
            id={"ascending"}
          />
        </div>
        <div>
          <label htmlFor={"descending"}>Descending intervals</label>
          <input
            onChange={() => {
              if (!options.allowAscending) {
                return;
              }
              setOptions({
                ...options,
                allowDescending: !options.allowDescending,
              });
            }}
            checked={options.allowDescending}
            type={"checkbox"}
            id={"descending"}
          />
        </div>
      </div>
    </div>
  );
};
