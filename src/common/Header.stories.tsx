import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import HeaderComponent from "./Header";
import PageWidth from "./PageWidth";

export default {
  title: "Common/Header",
  component: HeaderComponent,
} as ComponentMeta<typeof HeaderComponent>;

export const Header: ComponentStory<typeof HeaderComponent> = (args) => (
  <PageWidth>
    <HeaderComponent {...args} />
  </PageWidth>
);
