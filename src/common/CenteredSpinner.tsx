/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const spinnerContainerStyle = css`
  width: 100%;
  height: 100%;
  min-height: 300px;
  max-height: 900px;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;

const CenteredSpinner = (): JSX.Element => (
  <div css={spinnerContainerStyle}>
    <CircularProgress />
  </div>
);

export default CenteredSpinner;
