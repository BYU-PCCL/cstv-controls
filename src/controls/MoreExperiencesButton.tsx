/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { Link } from "react-router-dom";
import AppsRounded from "@material-ui/icons/AppsRounded";

const footerStyle = css`
  height: 64px;
  width: calc(100% - 32px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  transition: background 100ms ease-out;
  background: #001e4c;

  &:hover {
    background: #072b6a;
  }

  &:active {
    background: #0b3379;
  }
`;

const footerInnerStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const titleStyle = css`
  font-family: "Source Code Pro", sans-serif;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  color: #f0f6ff;
`;

const MoreExperiencesButton = (): JSX.Element => {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <div css={footerStyle}>
        <div css={footerInnerStyle}>
          <AppsRounded fontSize="large" style={{ fill: "#f0f6ff" }} />
          <h1 css={titleStyle}>More Experiences</h1>
        </div>
      </div>
    </Link>
  );
};

export default MoreExperiencesButton;
