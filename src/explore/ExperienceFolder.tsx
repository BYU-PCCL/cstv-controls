/** @jsxImportSource @emotion/react */
import React, { memo } from "react";
import { Tag } from "../types/tag";
import { css } from "@emotion/react";

const folderStyle = (backgroundColor: string) => css`
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  position: relative;
  align-items: center;
  transition: transform 100ms ease-in-out;
  width: 100%;
  height: 100%;
  cursor: pointer;
  margin: 10px;
  &:active {
    transform: scale(98%);
    -webkit-transform: scale(0.98, 0.98);
  }
`;

const thumbnailStyle = css`
  position: relative;
  width: 100%;

`;

const textStyle = (color: string) => css`
  position: absolute;
  font-family: "Montserrat", sans-serif;
  width: calc(100% - 32px);
  font-size: 26px;
  color: ${color};
  padding: 16px;
`;

const foreground = (color: string) => css `
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${color};
  opacity: 70%;

`;

const ExperienceFolders = ({
                            folders,
                            onExperienceClick,
                        }: {
    folders: Tag[];
    onExperienceClick: (folder: Tag) => void;
}): JSX.Element => {
    return (
        <div>
            {
                folders.map((folder) => {
                    return  <ExperienceFolder key={folder.id} folder={folder} onClick={onExperienceClick} />
                })

            }
        </div>
    );
};

const ExperienceFolder = memo(
    ({
         folder,
         onClick,
     }: {
        folder: Tag;
        onClick: (folder: Tag) => void;
    }) => {
        const { description, title } = folder;
        return (
            <div css={folderStyle("#737311")} onClick={() => onClick(folder)}>
                <img css={thumbnailStyle} src={ "https://via.placeholder.com/298x95"} />
                <div css={foreground( "#737311")}></div>
                <p css={textStyle("#ECF4E3")}>{title}</p>
            </div>
        );
    }
);

ExperienceFolder.displayName = "ExperienceFolders";

export default ExperienceFolders;
