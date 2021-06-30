/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import PageWidth from "./PageWidth";
import Header from "./Header";
import { CircularProgress } from "@material-ui/core";

const spinnerContainerStyle = css`
  width: 100vw;
  height: 100vh;
  max-height: 900px;
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;

export const LoadingPage = (): JSX.Element => {
  return (
    <PageWidth>
      <div css={spinnerContainerStyle}>
        <CircularProgress />
      </div>
      <Header />
    </PageWidth>
  );
};

export default LoadingPage;
