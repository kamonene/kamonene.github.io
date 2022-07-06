import React, { useContext } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.less";
import { VoiceWrapper } from "../home/voice-wrapper/voice-wrapper";
import { PracticeContainer } from "../home/practice-container/practice-container";
import { Mode } from "../../utils/constants";
import { IntervalSelector } from "../functional/interval-selector/interval-selector";
import style from "./router.module.less";
import { useTabKeyBinds } from "../hooks/use-tab-key-binds";
import { ctx } from "../../App";

export const Router = () => {
  useTabKeyBinds();
  const { options, setOptions } = useContext(ctx);

  return (
    <Tabs
      selectedIndex={options.tab}
      onSelect={(index) => {
        setOptions({ ...options, tab: index });
      }}
    >
      <TabList>
        <Tab>Practice (a)</Tab>
        <Tab>Voice playground (s)</Tab>
        <Tab>Quiz (d)</Tab>
      </TabList>

      <TabPanel>
        <div className={style.tabContainer}>
          <PracticeContainer mode={Mode.PRODUCE} />
          <IntervalSelector />
        </div>
      </TabPanel>
      <TabPanel>
        <div className={style.tabContainer}>
          <PracticeContainer mode={Mode.VOICE_SANDBOX} />
          <VoiceWrapper />
        </div>
      </TabPanel>
      <TabPanel>
        <div className={style.tabContainer}>
          <PracticeContainer mode={Mode.RECOGNIZE} />
          <IntervalSelector />
        </div>
      </TabPanel>
    </Tabs>
  );
};
