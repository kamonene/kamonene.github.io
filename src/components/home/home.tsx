import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import style from "./home.module.less";
import { Options } from "../functional/options/options";
import { Mode } from "../../utils/constants";
import { ctx } from "../../App";
import { Router } from "../router/router";
import { WithIntervalKeybindWrapper } from "../ducks/with-interval-keybind-wrapper/with-interval-keybind-wrapper";

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
      <WithIntervalKeybindWrapper />
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

        {showOptions && <Options />}
        <div className={style.divider} />
        <Router />
      </div>
    </div>
  );
};
