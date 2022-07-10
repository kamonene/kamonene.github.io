import React, { FunctionComponent, useContext, useState } from "react";
import style from "./home.module.less";
import { Options } from "../functional/options/options";
import { Router } from "../router/router";
import { ctx } from "../../App";
import { WithMicrophone } from "./microphone/with-microphone";

export const Home: FunctionComponent = () => {
  const [showOptions, setShowOptions] = useState(false);
  const { options, setOptions } = useContext(ctx);
  return (
    <div className={style.home}>
      {options.enableMicrophone && <WithMicrophone />}

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

        <div className={style.enableMic}>
          <label htmlFor={"enableMic"}>Microphone enabled</label>
          <input
            checked={options.enableMicrophone}
            type={"checkbox"}
            id={"enableMic"}
            onClick={() => {
              setOptions({
                ...options,
                enableMicrophone: !options.enableMicrophone,
              });
            }}
          />
        </div>
        {showOptions && <Options />}
        <div className={style.divider} />
        <Router />
      </div>
    </div>
  );
};
