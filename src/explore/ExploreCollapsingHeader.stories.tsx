import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import ExploreCollapsingHeaderComponent from "./ExploreCollapsingHeader";
import { Experience } from "../types/experience";

const testExperience: Experience = {
  id: "test",
  title: "Real-time Tracking by Detection of Human Motion",
  lastUpdate: 500,
};

export default {
  title: "Explore/ExploreCollapsingHeader",
  component: ExploreCollapsingHeaderComponent,
} as ComponentMeta<typeof ExploreCollapsingHeaderComponent>;

export const ExploreCollapsingHeader: ComponentStory<
  typeof ExploreCollapsingHeaderComponent
> = (args) => (
  <ExploreCollapsingHeaderComponent {...args} experience={testExperience} />
);

// Have to do this to consolidate component and story into one
ExploreCollapsingHeader.storyName = "ExploreCollapsingHeader";
