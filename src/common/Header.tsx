/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { Link } from "react-router-dom";
import logo from "./assets/logo.svg";
import csLogo from "./assets/cs-logo.svg";

const headerContainerStyle = (collapsed: boolean) => css`
  height: ${collapsed ? "64" : "100"}px;
  width: calc(100% - 32px);
  transition: height cubic-bezier(0.16, 0.49, 0.25, 1) 150ms;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;

  @media (min-width: 500px) {
    // TODO: Figure out if there's some way to make this cleaner
    height: ${collapsed ? "72" : "100"}px;
  }
`;

const csLogoStyle = css`
  width: 90px;
  height: 90px;
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
      <Link to="/">
        <img src={logo} alt="" css={logoImageStyle} />
      </Link>
      <img
        src={csLogo}
        alt="BYU Computer Science department logo"
        css={csLogoStyle}
      />
    </div>
  );
};

export default Header;
