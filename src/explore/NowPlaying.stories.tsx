import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import NowPlayingComponent from "./NowPlaying";
import { Experience } from "../types/experience";
import PageWidth from "../common/PageWidth";
import { MemoryRouter } from "react-router-dom";

const testExperience: Experience = {
  folders: [],
  tags: [],
  colors: {
    primary: "",
    secondaryLight: "",
    secondaryDark: "",
  },
  thumbnails: {
    thumb: "",
    wide: "",
  },
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
  <MemoryRouter initialEntries={["/"]}>
    <PageWidth>
      <NowPlayingComponent {...args} experience={testExperience} />
    </PageWidth>
  </MemoryRouter>
);

// Have to do this to consolidate component and story into one
NowPlaying.storyName = "NowPlaying";
