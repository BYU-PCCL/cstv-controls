import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import ExploreFolderPageComponent from "./ExploreFolderPage";
import { Experience } from "../types/experience";
import PageWidth from "../common/PageWidth";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Explore/ExploreFolderPage",
  component: ExploreFolderPageComponent,
} as ComponentMeta<typeof ExploreFolderPageComponent>;

export const ExploreFolderPage: ComponentStory<
  typeof ExploreFolderPageComponent
> = (args) => (
  <MemoryRouter>
    <PageWidth>
      <ExploreFolderPageComponent />
    </PageWidth>
  </MemoryRouter>
);

// Have to do this to consolidate component and story into one
ExploreFolderPage.storyName = "ExploreFolderPage";
