import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import ExperienceFoldersComponent from "./ExperienceFolder";
import { Tag } from "../types/tag";
import PageWidth from "../common/PageWidth";

const testExperienceFolders: Tag[] = [
  {
    id: "test",
    experiences: ["Grendel", "Taijitu"],
    title: "Animation Videos",
    description: "A folder of videos from animation students",
    featured: "Grendel",
  },
  {
    id: "test",
    experiences: ["Grendel", "Taijitu"],
    title: "Animation Videos",
    description: "A folder of videos from animation students",
    featured: "Grendel",
  },
];

export default {
  title: "Explore/ExperienceFolders",
  component: ExperienceFoldersComponent,
} as ComponentMeta<typeof ExperienceFoldersComponent>;

export const ExperienceFolders: ComponentStory<
  typeof ExperienceFoldersComponent
> = (args) => (
  <PageWidth>
    <ExperienceFoldersComponent
      {...args}
      folders={testExperienceFolders}
      onFolderClick={() => null}
    />
  </PageWidth>
);

// Have to do this to consolidate component and story into one
ExperienceFolders.storyName = "ExperienceFolders";
