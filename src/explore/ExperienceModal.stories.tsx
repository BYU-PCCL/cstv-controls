import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import ExperienceModalComponent from "./ExperienceModal";
import { Experience } from "../types/experience";
import PageWidth from "../common/PageWidth";

const TestExperience: Experience = {
  id: "test",
  title: "Style Transfer",
  description: "Ever wondered what you'd look like in a van goh painting?",
  lastUpdate: 500,
  thumbnails: {
    thumb: "https://via.placeholder.com/148x148",
    wide: "https://via.placeholder.com/300x180px",
  },
  colors: {
    primary: "#812D1B",
    secondaryDark: "#9C6428",
    secondaryLight: "#FFFFF1",
  },
};

export default {
  title: "Explore/ExperienceModal",
  component: ExperienceModalComponent,
} as ComponentMeta<typeof ExperienceModalComponent>;

export const ExperienceModal: ComponentStory<typeof ExperienceModalComponent> =
  (args) => (
    <PageWidth>
      <ExperienceModalComponent
        experience={TestExperience}
        onClose={() => {
          return TestExperience;
        }}
        onLaunch={(experience: Experience) => undefined}
      />
    </PageWidth>
  );

// Have to do this to consolidate component and story into one
ExperienceModal.storyName = "ExperienceModal";
