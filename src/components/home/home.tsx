import React, { FunctionComponent, useState } from "react";
import style from "./home.module.less";
import { Options } from "../functional/options/options";
import { Router } from "../router/router";

export const Home: FunctionComponent = () => {
  const [showOptions, setShowOptions] = useState(false);
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

        {showOptions && <Options />}
        <div className={style.divider} />
        <Router />
      </div>
    </div>
  );
};
