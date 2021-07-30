/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import remoteIcon from "./assets/remote.svg";

const headerStyle = css`
  height: 64px;
  width: calc(100% - 32px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: #f7faff;
  border-bottom: 2px solid #b4bfd2;
  gap: 12px;
`;

const titleStyle = css`
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
  font-weight: bold;
  color: #001e4c;
`;

const ControlsHeader = ({ title }: { title: string }): JSX.Element => {
  return (
    <div css={headerStyle}>
      <h1 css={titleStyle}>{title}</h1>
      <img src={remoteIcon} alt="controls logo" />
    </div>
  );
};

export default ControlsHeader;
