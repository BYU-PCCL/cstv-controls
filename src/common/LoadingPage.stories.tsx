import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import LoadingPageComponent from "./LoadingPage";

export default {
  title: "Common/LoadingPage",
  component: LoadingPageComponent,
} as ComponentMeta<typeof LoadingPageComponent>;

export const LoadingPage: ComponentStory<typeof LoadingPageComponent> = () => (
  <MemoryRouter initialEntries={["/"]}>
    <LoadingPageComponent />
  </MemoryRouter>
);

// Have to do this to consolidate component and story into one
LoadingPage.storyName = "LoadingPage";
