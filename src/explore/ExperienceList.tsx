/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { Experience } from "../types/experience";
import { css } from "@emotion/react";
import ReactDOM from "react-dom";
import { Masonry } from "masonic";
import ExperienceModal from "./ExperienceModal";

const containerStyle = css`
  min-height: 100vh;
  width: 100%;
`;

const masonicStyle = css`
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
`;

const tileStyle = (backgroundColor: string) => css`
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: ${backgroundColor};
  justify-content: center;
  align-items: center;
  transition: transform 100ms ease-in-out;
  width: 100%;
  min-height: 100px;
  cursor: pointer;

  &:active {
    transform: scale(98%);
  }
`;

const thumbnailStyle = css`
  width: 100%;
  display: flex;
`;

const textStyle = (color: string) => css`
  font-family: "Montserrat", sans-serif;
  margin: 10px 16px;
  width: calc(100% - 32px);
  font-size: 18px;
  color: ${color};
`;

const ExperienceList = ({
  experiences,
}: {
  experiences: Experience[];
}): JSX.Element => {
  const [dialogExperience, setDialogExperience] = useState<
    Experience | undefined
  >();

  const onExperienceClicked = (id: string) => {
    console.log("The " + id + " experience was clicked.");
    const experience = experiences.find((experience) => experience.id == id);
    if (experience == null) {
      return;
    }
    setDialogExperience(experience);
  };

  const onDialogClosed = () => {
    setDialogExperience(undefined);
  };

  return (
    <main css={containerStyle}>
      <ExperienceModal experience={dialogExperience} onClose={onDialogClosed} />
      <div css={masonicStyle}>
        <Masonry
          // Provides the data for our grid items
          items={experiences}
          // Adds 8px of space between the grid cells
          columnGutter={8}
          // Sets the minimum column width to 172px
          columnWidth={148}
          // Pre-renders 5 windows worth of content
          overscanBy={5}
          // This is the grid item component
          render={({ data }) => (
            <ExperienceTile data={data} onClick={onExperienceClicked} />
          )}
        />
      </div>
    </main>
  );
};

const ExperienceTile = ({
  data: { id, title, thumbnail, colors },
  onClick,
}: {
  data: Experience;
  onClick: (id: string) => void;
}) => (
  <div css={tileStyle(colors.primary)} onClick={() => onClick(id)}>
    <img css={thumbnailStyle} src={thumbnail.small} />
    <p css={textStyle(colors.secondaryLight)}>{title}</p>
  </div>
);

export default ExperienceList;
