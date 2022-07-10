import React, { useEffect, useState } from "react";
import { Home } from "./components/home/home";
import { defaultOptions, Interval, Options } from "./utils/constants";
import { useCookies } from "react-cookie";
import { findNextInterval, IntervalMetaData } from "./utils/utils";
import { Note } from "./components/home/microphone/with-microphone";

const defaultUpdate: React.Dispatch<React.SetStateAction<Options>> = () =>
  defaultOptions;
const defaultIntervalMetaDataUpdate: React.Dispatch<
  React.SetStateAction<IntervalMetaData>
> = () => defaultOptions;
const defaultSetNote: React.Dispatch<React.SetStateAction<Note>> = () =>
  defaultNote;

const defaultNote: Note = {
  noteName: "",
  noteNumber: 0,
  volume: 0,
  cents: 0,
};

const defaultIntervalMetaData: IntervalMetaData = {
  interval: 5,
  intervalName: Interval.Tritone,
  baseNote: "c4",
  multiplier: 1,
};

export const ctx = React.createContext({
  options: defaultOptions,
  setOptions: defaultUpdate,
  setCurrentIntervalMetaData: defaultIntervalMetaDataUpdate,
  currentIntervalMetaData: defaultIntervalMetaData,
  setNote: defaultSetNote,
  note: defaultNote,
});

const cookieName = "options";

function App() {
  const [options, setOptions] = useState<Options>(defaultOptions);
  const [note, setNote] = useState<Note>({
    noteName: "",
    noteNumber: 0,
    volume: 0,
    cents: 0,
  });
  const [cookies, setCookie] = useCookies(["options"]);
  const [firstLoaded, setFirstLoaded] = useState(true);
  const [currentIntervalMetaData, setCurrentIntervalMetaData] =
    useState<IntervalMetaData>(findNextInterval(options));

  useEffect(() => {
    if (firstLoaded) {
      setFirstLoaded(false);
      const newOptions = {
        ...defaultOptions,
        ...(cookies.options ?? defaultOptions),
      };
      setCurrentIntervalMetaData(findNextInterval(newOptions));
      setOptions(newOptions);
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
          note,
          setNote,
        }}
      >
        {!firstLoaded && <Home />}
      </ctx.Provider>
    </div>
  );
}

export default App;
