/** @jsxImportSource @emotion/react */
import React, { memo } from "react";
import { Folder } from "../types/folder";
import { css } from "@emotion/react";

const folderStyle = css`
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  position: relative;
  align-items: center;
  transition: transform 100ms ease-in-out;
  width: 100%;
  height: 100%;
  cursor: pointer;
  &:active {
    transform: scale(98%);
    -webkit-transform: scale(0.98, 0.98);
  }
`;

const thumbnailStyle = css`
  position: relative;
  width: 100%;
  height: 108px;
  object-fit: cover;
`;

const textStyle = (color: string) => css`
  position: absolute;
  font-family: "Montserrat", sans-serif;
  font-size: 26px;
  color: ${color};
  padding: 16px;
`;

const foregroundStyle = (color: string) => css`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${color};
  opacity: 70%;
`;

const foldersContainerStyle = css`
  display: flex;
  flex-direction: column;
  margin: 16px 8px;
  width: calc(100% - 16px);
  gap: 8px;

  @media (min-width: 500px) {
    margin: 16px;
    width: calc(100% - 32px);
  }
`;

const ExperienceFolders = ({
  folders,
  onFolderClick,
}: {
  folders: Folder[];
  onFolderClick: (folder: Folder) => void;
}): JSX.Element => {
  return (
    <div css={foldersContainerStyle}>
      {folders.map((folder) => {
        return (
          <ExperienceFolder
            key={folder.id}
            folder={folder}
            onClick={onFolderClick}
          />
        );
      })}
    </div>
  );
};

const ExperienceFolder = memo(
  ({
    folder,
    onClick,
  }: {
    folder: Folder;
    onClick: (folder: Folder) => void;
  }) => {
    const { colors, thumbnails, title } = folder;
    return (
      <div css={folderStyle} onClick={() => onClick(folder)}>
        <img css={thumbnailStyle} src={thumbnails.wide} alt="" />
        <div css={foregroundStyle(colors.primary)} />
        <p css={textStyle(colors.secondaryLight)}>{title}</p>
      </div>
    );
  }
);

ExperienceFolder.displayName = "ExperienceFolders";

export default ExperienceFolders;
