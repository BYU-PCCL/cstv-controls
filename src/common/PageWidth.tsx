import { css } from "@emotion/react";
import React, { ReactNode } from "react";

const pageWrapperStyle = css`
  display: flex;
  justify-content: center;
  height: 100%;
`;

// TODO: Decide if this is the right max width based on Figma designs
const pageWidthStyle = css`
  width: 100%;
  height: 100%;

  @media (min-width: 600px) {
    width: 600px;
  }
`;

const PageWidth = ({ children }: { children?: ReactNode }): JSX.Element => {
  return (
    <main css={pageWrapperStyle}>
      <div css={pageWidthStyle}>{children}</div>
    </main>
  );
};

export default PageWidth;
