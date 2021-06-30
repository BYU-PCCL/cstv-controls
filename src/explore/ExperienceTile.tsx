/** @jsxImportSource @emotion/react */
import React from "react";
import { Experience } from "../types/experience";
import { css } from "@emotion/react";

const containerStyle = css`
  display: flex;
  flex-direction: column;
  width: 150px;
`;

const titleStyle = css`
  display: flex;
  width: 150px;
  background-color: lightblue;
  word-break: break-all;
`;

const imageStyle = css``;

const ExperienceTile = ({
  experience,
}: {
  experience: Experience;
}): JSX.Element => {
  return (
    <div css={containerStyle}>
      <div css={imageStyle}>
        <img src={experience.thumbnail}></img>
      </div>
      <div css={titleStyle}>
        <p>{experience.title}</p>
      </div>
    </div>
  );
};

export default ExperienceTile;
