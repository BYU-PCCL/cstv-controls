import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import NowPlayingComponent from "./NowPlaying";
import { Experience } from "../types/experience";
import PageWidth from "../common/PageWidth";

const testExperience: Experience = {
  id: "test",
  title: "Real-time Tracking by Detection of Human Motion",
  lastUpdate: 500,
};

export default {
  title: "Explore/NowPlaying",
  component: NowPlayingComponent,
} as ComponentMeta<typeof NowPlayingComponent>;

export const NowPlaying: ComponentStory<typeof NowPlayingComponent> = (
  args
) => (
  <PageWidth>
    <NowPlayingComponent {...args} experience={testExperience} />
  </PageWidth>
);

// Have to do this to consolidate component and story into one
NowPlaying.storyName = "NowPlaying";
