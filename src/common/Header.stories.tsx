import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import HeaderComponent from "./Header";

export default {
  title: "Common/Header",
  component: HeaderComponent,
} as ComponentMeta<typeof HeaderComponent>;

export const Header: ComponentStory<typeof HeaderComponent> = (args) => (
  <HeaderComponent {...args} />
);
