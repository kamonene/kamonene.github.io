import React, { FunctionComponent, useContext } from "react";
import style from "./note.module.less";
import { ctx } from "../../../../App";

export const Note: FunctionComponent = () => {
  const { note } = useContext(ctx);

  return <div className={style.note}>{JSON.stringify(note)}</div>;
};
