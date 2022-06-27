import React, { useEffect, useState } from "react";
import { Home } from "./components/home/home";
import { defaultOptions, Options } from "./utils/constants";
import { useCookies } from "react-cookie";

const defaultUpdate: React.Dispatch<React.SetStateAction<Options>> = () =>
  defaultOptions;

export const ctx = React.createContext({
  options: defaultOptions,
  setOptions: defaultUpdate,
});

const cookieName = "options";

function App() {
  const [options, setOptions] = useState<Options>(defaultOptions);
  const [cookies, setCookie] = useCookies(["options"]);
  const [firstLoaded, setFirstLoaded] = useState(true);
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
      <ctx.Provider value={{ options, setOptions }}>
        <Home />
      </ctx.Provider>
    </div>
  );
}

export default App;
