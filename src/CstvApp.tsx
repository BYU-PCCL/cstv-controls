/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { lodashTest } from "test-linking-package";

const containerStyle = css`
  background: lightblue;
  height: 500px;
  width: 500px;
`;

function CstvApp(): JSX.Element {
  return <div css={containerStyle}>{JSON.stringify(lodashTest())}</div>;
}

export default CstvApp;
