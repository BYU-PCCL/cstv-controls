import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import ControlsPageComponent from "./ControlsPage";

export default {
  title: "Controls/ControlsPage",
  component: ControlsPageComponent,
} as ComponentMeta<typeof ControlsPageComponent>;

export const ControlsPage: ComponentStory<
  typeof ControlsPageComponent
> = () => (
  <MemoryRouter initialEntries={["/"]}>
    <ControlsPageComponent />
  </MemoryRouter>
);

// Have to do this to consolidate component and story into one
ControlsPage.storyName = "ControlsPage";
