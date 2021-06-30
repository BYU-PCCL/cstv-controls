import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import ExperienceTileComponent from "./ExperienceTile";
import { Experience } from "../types/experience";
import PageWidth from "../common/PageWidth";

const testExperience: Experience = {
  id: "test",
  title: "Real-time Tracking by Detection of Human Motion",
  lastUpdate: 500,
  thumbnail: "https://via.placeholder.com/150x150",
};

export default {
  title: "Explore/ExperienceTile",
  component: ExperienceTileComponent,
} as ComponentMeta<typeof ExperienceTileComponent>;

export const ExperienceTile: ComponentStory<typeof ExperienceTileComponent> = (
  args
) => (
  <PageWidth>
    <ExperienceTileComponent {...args} experience={testExperience} />
  </PageWidth>
);

// Have to do this to consolidate component and story into one
ExperienceTile.storyName = "ExperienceTile";
