import React, { useEffect, useState } from "react";
import { Home } from "./components/home/home";
import { defaultOptions, Interval, Options } from "./utils/constants";
import { useCookies } from "react-cookie";
import { findNextInterval, IntervalMetaData } from "./utils/utils";

const defaultUpdate: React.Dispatch<React.SetStateAction<Options>> = () =>
  defaultOptions;
const defaultIntervalMetaDataUpdate: React.Dispatch<
  React.SetStateAction<IntervalMetaData>
> = () => defaultOptions;

const a: IntervalMetaData = {
  interval: 5,
  intervalName: Interval.Tritone,
  baseNote: "c4",
  multiplier: 1,
};

export const ctx = React.createContext({
  options: defaultOptions,
  setOptions: defaultUpdate,
  setCurrentIntervalMetaData: defaultIntervalMetaDataUpdate,
  currentIntervalMetaData: a,
});

const cookieName = "options";

function App() {
  const [options, setOptions] = useState<Options>(defaultOptions);
  const [cookies, setCookie] = useCookies(["options"]);
  const [firstLoaded, setFirstLoaded] = useState(true);
  const [currentIntervalMetaData, setCurrentIntervalMetaData] =
    useState<IntervalMetaData>(findNextInterval(options));
  useEffect(() => {
    if (firstLoaded) {
      setFirstLoaded(false);
      setOptions({ ...defaultOptions, ...(cookies.options ?? defaultOptions) });
    }
  }, [cookies.options, firstLoaded]);

  useEffect(() => {
    setCookie(cookieName, options, { sameSite: "strict" });
  }, [options, setCookie]);

  return (
    <div className={"appContainer"}>
      <ctx.Provider
        value={{
          currentIntervalMetaData,
          setCurrentIntervalMetaData,
          options,
          setOptions,
        }}
      >
        <Home />
      </ctx.Provider>
    </div>
  );
}

export default App;
