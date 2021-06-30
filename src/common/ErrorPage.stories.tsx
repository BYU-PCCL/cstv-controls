import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import ErrorPageComponent from "./ErrorPage";

export default {
  title: "Common/ErrorPage",
  component: ErrorPageComponent,
} as ComponentMeta<typeof ErrorPageComponent>;

export const ErrorPage: ComponentStory<typeof ErrorPageComponent> = (args) => (
  <MemoryRouter initialEntries={["/"]}>
    <ErrorPageComponent {...args} />
  </MemoryRouter>
);

ErrorPage.args = {
  title: "A wild Error occurred!",
  description: "This is not good at all.",
};

// Have to do this to consolidate component and story into one
ErrorPage.storyName = "ErrorPage";
