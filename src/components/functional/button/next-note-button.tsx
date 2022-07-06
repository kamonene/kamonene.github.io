import React, {
  FunctionComponent,
  HTMLAttributes,
  useContext,
  useEffect,
} from "react";
import { Mode } from "../../../utils/constants";
import { findNextInterval } from "../../../utils/utils";
import { ctx } from "../../../App";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  mode: Mode;
  setReveal: (reveal: boolean) => void;
  reveal: boolean;
}

export const NextNoteButton: FunctionComponent<Props> = ({
  children,
  mode,
  setReveal,
  reveal,
}: Props) => {
  const { options, setCurrentIntervalMetaData } = useContext(ctx);
  useEffect(() => {
    const keyup = (event: KeyboardEvent) => {
      if (event.key === "e" && !event.repeat) {
        if (mode === Mode.RECOGNIZE && !reveal) {
          setReveal(true);
          return;
        }
        setCurrentIntervalMetaData(findNextInterval(options));
        setReveal(false);
      }
    };
    document.addEventListener("keyup", keyup);
    return () => {
      document.removeEventListener("keyup", keyup);
    };
  }, [mode, options, reveal, setCurrentIntervalMetaData, setReveal]);

  const onClickNext = () => {
    if (mode === Mode.RECOGNIZE && !reveal) {
      setReveal(true);
      return;
    }
    setCurrentIntervalMetaData(findNextInterval(options));
    setReveal(false);
  };
  return (
    <button onClick={onClickNext}>
      <>{children}</>
    </button>
  );
};
