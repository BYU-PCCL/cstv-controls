/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { PropsWithChildren, ReactNode } from "react";
import PageWidth from "./PageWidth";
import Header from "./Header";

const errorTextContainerStyle = css`
  width: 100vw;
  height: 100vh;
  max-height: 900px;
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: -1;
  pointer-events: none;

  h1,
  p {
    margin: 0;
    pointer-events: initial;
  }
`;

const errorTextBoxStyle = css`
  max-width: 400px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const titleStyle = css`
  color: #001e4ce6;
  font-family: "Source Code Pro", monospace;
  font-weight: 600;
  font-size: 24px;
`;

export const ErrorPage = ({
  title,
  description,
  // We use children as a way to drop in header graphics using composition
  // TODO: figure out alignment for this
  children,
}: PropsWithChildren<{
  title: string | ReactNode;
  description: string | ReactNode;
}>): JSX.Element => {
  return (
    <PageWidth>
      <div css={errorTextContainerStyle}>
        <div css={errorTextBoxStyle}>
          <h1 css={titleStyle}>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      {children}
      <Header />
    </PageWidth>
  );
};

export default ErrorPage;
