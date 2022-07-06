import { useContext, useEffect } from "react";
import { ctx } from "../../App";
import { Tab } from "../../utils/constants";

export const useTabKeyBinds = () => {
  const { options, setOptions } = useContext(ctx);

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "a" && !event.repeat) {
        setOptions({ ...options, tab: Tab.PRACTICE });
      }
      if (event.key === "s" && !event.repeat) {
        setOptions({ ...options, tab: Tab.PLAYGROUND });
      }
      if (event.key === "d" && !event.repeat) {
        setOptions({ ...options, tab: Tab.QUIZ });
      }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      document.removeEventListener("keydown", keydown);
    };
  }, [options, setOptions]);
};
