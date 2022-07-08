import React, { useContext } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.less";
import { PracticeContainer } from "../home/practice-container/practice-container";
import { Mode } from "../../utils/constants";
import { IntervalSelector } from "../functional/interval-selector/interval-selector";
import style from "./router.module.less";
import { useTabKeyBinds } from "../hooks/use-tab-key-binds";
import { ctx } from "../../App";
import { isMobile } from "react-device-detect";
import { VoiceVisualizer } from "../home/microphone/voice-visualzier/voice-visualizer";

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
        <Tab>Practice {isMobile ? "" : "(a)"}</Tab>
        <Tab>Voice playground {isMobile ? "" : "(s)"}</Tab>
        <Tab>Quiz {isMobile ? "" : "(d)"}</Tab>
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
          <VoiceVisualizer />
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
