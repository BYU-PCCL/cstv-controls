/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import logo from "./assets/logo.svg";

const headerContainerStyle = (collapsed: boolean) => css`
  height: ${collapsed ? "64" : "100"}px;
  width: calc(100% - 32px);
  transition: height cubic-bezier(0.16, 0.49, 0.25, 1) 150ms;
  display: flex;
  align-items: center;
  padding: 0 16px;

  @media (min-width: 500px) {
    // TODO: Figure out if there's some way to make this cleaner
    height: ${collapsed ? "72" : "100"}px;
  }
`;

const logoImageStyle = css`
  height: 45px;
`;

const Header = ({
  collapsed = false,
}: {
  collapsed?: boolean;
}): JSX.Element => {
  return (
    <div css={headerContainerStyle(collapsed)}>
      <img src={logo} alt="" css={logoImageStyle} />
    </div>
  );
};

export default Header;
