import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.less";
import { VoiceWrapper } from "../home/voice-wrapper/voice-wrapper";
import { PracticeContainer } from "../home/practice-container/practice-container";
import { Mode } from "../../utils/constants";
import { IntervalSelector } from "../functional/interval-selector/interval-selector";
import style from "./router.module.less";

export const Router = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Practice</Tab>
        <Tab>Voice playground</Tab>
        <Tab>Quiz</Tab>
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
