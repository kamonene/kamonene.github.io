import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import style from "./home.module.less";

import { PracticeContainer } from "../practice-container/practice-container";
import { Options } from "../functional/options/options";
import { Mode } from "../../utils/constants";
import { ctx } from "../../App";

export const Home: FunctionComponent = () => {
  const { options, setOptions } = useContext(ctx);
  const [showOptions, setShowOptions] = useState(false);
  useEffect(() => {
    const keyup = (event: KeyboardEvent) => {
      if (event.key === "r" && !event.repeat) {
        const nextMode =
          options.mode === Mode.PRODUCE ? Mode.RECOGNIZE : Mode.PRODUCE;
        setOptions({ ...options, mode: nextMode });
      }
    };
    document.addEventListener("keyup", keyup);
    return () => {
      document.removeEventListener("keyup", keyup);
    };
  }, [options, setOptions]);

  return (
    <div className={style.home}>
      <div className={style.container}>
        <button
          className={style.button}
          onClick={() => {
            setShowOptions(!showOptions);
          }}
        >
          ≡
        </button>
        <h3 className={style.title}>Relative pitch</h3>
        <p className={style.infoText}>
          {options.mode === Mode.RECOGNIZE
            ? "Identify the interval"
            : "Produce the given interval from the base note"}
        </p>

        <button
          onClick={() => {
            const nextMode =
              options.mode === Mode.PRODUCE ? Mode.RECOGNIZE : Mode.PRODUCE;
            setOptions({ ...options, mode: nextMode });
          }}
        >
          Change practice mode (r)
        </button>
        <div className={style.divider} />

        {showOptions && <Options />}
        <PracticeContainer mode={options.mode} />
      </div>
    </div>
  );
};
