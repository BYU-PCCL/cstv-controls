import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import ExploreCollapsingHeaderComponent from "./ExploreCollapsingHeader";
import { CurrentExperience } from "../types/experience";
import PageWidth from "../common/PageWidth";
import { MemoryRouter } from "react-router-dom";

const testExperience: CurrentExperience = {
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
  lock: false,
};

export default {
  title: "Explore/ExploreCollapsingHeader",
  component: ExploreCollapsingHeaderComponent,
} as ComponentMeta<typeof ExploreCollapsingHeaderComponent>;

export const ExploreCollapsingHeader: ComponentStory<
  typeof ExploreCollapsingHeaderComponent
> = (args) => (
  <MemoryRouter initialEntries={["/"]}>
    <PageWidth>
      <ExploreCollapsingHeaderComponent {...args} experience={testExperience} />
    </PageWidth>
  </MemoryRouter>
);

// Have to do this to consolidate component and story into one
ExploreCollapsingHeader.storyName = "ExploreCollapsingHeader";
