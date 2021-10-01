import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import ExperienceListComponent from "./ExperienceList";
import { Experience } from "../types/experience";
import PageWidth from "../common/PageWidth";

const testExperienceList: Experience[] = [
  // {
  //   id: "test2",
  //   title: "Style Transfer",
  //   lastUpdate: 500,
  //   thumbnails: {
  //     thumb: "https://via.placeholder.com/148x148",
  //     wide: "https://via.placeholder.com/300x180",
  //   },
  //   colors: {
  //     primary: "#737311",
  //     secondaryDark: "#748C31",
  //     secondaryLight: "#ECF4E3",
  //   },
  // },
  // {
  //   id: "test",
  //   title: "Animation video from cool students",
  //   lastUpdate: 500,
  //   thumbnails: {
  //     thumb: "https://via.placeholder.com/148x148",
  //     wide: "https://via.placeholder.com/300x180",
  //   },
  //   colors: {
  //     primary: "#812D1B",
  //     secondaryDark: "#9C6428",
  //     secondaryLight: "#FFFFF1",
  //   },
  // },
  // {
  //   id: "test",
  //   title: "Grendel",
  //   lastUpdate: 500,
  //   thumbnail: "https://via.placeholder.com/148x148",
  //   colors: {
  //     primary: "#737311",
  //     secondaryDark: "#748C31",
  //     secondaryLight: "#ECF4E3",
  //   },
  // },
  // {
  //   id: "test",
  //   title: "A title that goes on multiple lines. This needs to be extra long",
  //   lastUpdate: 500,
  //   thumbnail: "https://via.placeholder.com/148x148",
  //   colors: {
  //     primary: "#30207A",
  //     secondaryDark: "#632E94",
  //     secondaryLight: "#FBEEFB",
  //   },
  // },
  // {
  //   id: "test",
  //   title: "CSS clock",
  //   lastUpdate: 500,
  //   thumbnail: "https://via.placeholder.com/148x148",
  //   colors: {
  //     primary: "#812D1B",
  //     secondaryDark: "#9C6428",
  //     secondaryLight: "#FFFFF1",
  //   },
  // },
  // {
  //   id: "test",
  //   title: "Another CSS clock",
  //   lastUpdate: 500,
  //   thumbnail: "https://via.placeholder.com/148x148",
  //   colors: {
  //     primary: "#737311",
  //     secondaryDark: "#748C31",
  //     secondaryLight: "#ECF4E3",
  //   },
  // },
  // {
  //   id: "test",
  //   title: "The hilbert curve",
  //   lastUpdate: 500,
  //   thumbnail: "https://via.placeholder.com/148x148",
  //   colors: {
  //     primary: "#30207A",
  //     secondaryDark: "#632E94",
  //     secondaryLight: "#FBEEFB",
  //   },
  // },
  // {
  //   id: "test",
  //   title: "another cool visualization",
  //   lastUpdate: 500,
  //   thumbnail: "https://via.placeholder.com/148x148",
  //   colors: {
  //     primary: "#812D1B",
  //     secondaryDark: "#9C6428",
  //     secondaryLight: "#FFFFF1",
  //   },
  // },
  // {
  //   id: "test",
  //   title: "Dancing chewbacca",
  //   lastUpdate: 500,
  //   thumbnail: "https://via.placeholder.com/148x148",
  //   colors: {
  //     primary: "#30207A",
  //     secondaryDark: "#632E94",
  //     secondaryLight: "#FBEEFB",
  //   },
  // },
  // {
  //   id: "test",
  //   title: "Movie",
  //   lastUpdate: 500,
  //   thumbnail: "https://via.placeholder.com/148x148",
  //   colors: {
  //     primary: "#737311",
  //     secondaryDark: "#748C31",
  //     secondaryLight: "#ECF4E3",
  //   },
  // },
  // {
  //   id: "test",
  //   title: "Real time data stuff",
  //   lastUpdate: 500,
  //   thumbnail: "https://via.placeholder.com/148x148",
  //   colors: {
  //     primary: "#737311",
  //     secondaryDark: "#748C31",
  //     secondaryLight: "#ECF4E3",
  //   },
  // },
  // {
  //   id: "test",
  //   title: "The game of life.",
  //   lastUpdate: 500,
  //   thumbnail: "https://via.placeholder.com/148x148",
  //   colors: {
  //     primary: "#30207A",
  //     secondaryDark: "#632E94",
  //     secondaryLight: "#FBEEFB",
  //   },
  // },
];

export default {
  title: "Explore/ExperienceList",
  component: ExperienceListComponent,
} as ComponentMeta<typeof ExperienceListComponent>;

export const ExperienceList: ComponentStory<typeof ExperienceListComponent> = (
  args
) => (
  <PageWidth>
    <ExperienceListComponent {...args} experiences={testExperienceList} />
  </PageWidth>
);

// Have to do this to consolidate component and story into one
ExperienceList.storyName = "ExperienceList";
