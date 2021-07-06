/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { Experience } from "../types/experience";
import SettingsRemoteIcon from "@material-ui/icons/SettingsRemoteRounded";

const containerStyle = css`
  display: flex;
  flex-direction: column;
`;

const headerTextContainerStyle = (visible: boolean) => css`
  height: ${visible ? "initial" : "0"};
  position: relative;
  overflow: hidden;
  flex-direction: column;
  padding: ${visible ? "12px 16px" : "0"};
`;

const superheadingStyle = css`
  font-family: "Source Code Pro", monospace;
  text-transform: uppercase;
  /* Break this out */
  color: #39518d;
  margin: 0;
  font-size: 18px;
`;

const titleStyle = css`
  font-family: "Montserrat", sans-serif;
  /* Break this out */
  color: #0b1d39;
  margin: 4px 0 0;
  font-size: 26px;
`;

const imageContainerStyle = css`
  position: relative;
  height: 160px;
  overflow: hidden;

  @media (min-width: 400px) {
    height: 216px;
  }

  @media (min-width: 500px) {
    height: 272px;
    // We have to use margin here because padding doesn't lay out absolutely
    // positioned children correctly. Maybe I'm just doing it wrong.
    margin: 0 16px;
    border-radius: 6px;
  }
`;

const imageOverlayContainerStyle = (
  overlayColor: string,
  textColor: string
) => css`
  // TODO: Define this color somewhere
  color: ${textColor};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${overlayColor}b3;
  gap: 4px;
  cursor: pointer;
  user-select: none;
  transition: background-color 200ms;

  &:hover {
    background: ${overlayColor}bb;
  }

  &:active {
    background: ${overlayColor}cc;
  }
`;

const controlPromptTextStyle = css`
  font-size: 20px;
`;

const imageStyle = css`
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: absolute;
`;

const NowPlaying = ({
  fixed = false,
  experience,
}: {
  fixed: boolean;
  experience?: Experience;
}): JSX.Element => {
  return (
    <div css={containerStyle}>
      <div css={headerTextContainerStyle(!fixed)}>
        <h2 css={superheadingStyle}>NOW</h2>
        <h1 css={titleStyle}>{experience?.title || "Nothing"}</h1>
      </div>
      {experience != null && (
        <div css={imageContainerStyle}>
          <img
            src={experience?.thumbnails.wide || ""}
            alt=""
            css={imageStyle}
          />
          <div css={imageOverlayContainerStyle("#0B1D39", "#ffffff")}>
            <SettingsRemoteIcon fontSize="large" />
            <h2 css={controlPromptTextStyle}>Tap to control</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default NowPlaying;
