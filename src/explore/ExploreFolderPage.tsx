/** @jsxImportSource @emotion/react */
import React, { memo, useCallback, useEffect, useState } from "react";
import PageWidth from "../common/PageWidth";
import { useHistory, useParams } from "react-router-dom";
import Header from "../common/Header";
import ExperienceList from "./ExperienceList";
import { Experience } from "../types/experience";
import MoreExperiencesButton from "../controls/MoreExperiencesButton";
import { css } from "@emotion/react";
import { useExperiences, useFolders } from "../common/services/hooks/api";
import { hasControls } from "../controls/util";
import { useCurrentExperienceMutation } from "../common/services/hooks/api";
import ExperienceModal from "./ExperienceModal";

const FolderTitle = "Folder Title";
const FolderDescription = "A small description of the folder.";

// const testExperienceList: Experience[] = [
//   {
//     id: "test2",
//     title: "Style Transfer",
//     lastUpdate: 500,
//     thumbnails: {
//       thumb: "https://via.placeholder.com/148x148",
//       wide: "https://via.placeholder.com/300x180",
//     },
//     colors: {
//       primary: "#737311",
//       secondaryDark: "#748C31",
//       secondaryLight: "#ECF4E3",
//     },
//   },
//   {
//     id: "test",
//     title: "Animation video from cool students",
//     lastUpdate: 500,
//     thumbnails: {
//       thumb: "https://via.placeholder.com/148x148",
//       wide: "https://via.placeholder.com/300x180",
//     },
//     colors: {
//       primary: "#812D1B",
//       secondaryDark: "#9C6428",
//       secondaryLight: "#FFFFF1",
//     },
//   },
//   {
//     id: "test",
//     title: "A title that goes on multiple lines. This needs to be extra long",
//     lastUpdate: 500,
//     thumbnails: {
//       thumb: "https://via.placeholder.com/148x148",
//       wide: "https://via.placeholder.com/300x180",
//     },
//     colors: {
//       primary: "#30207A",
//       secondaryDark: "#632E94",
//       secondaryLight: "#FBEEFB",
//     },
//   },
//   {
//     id: "test",
//     title: "A title that goes on multiple lines. This needs to be extra long",
//     lastUpdate: 500,
//     thumbnails: {
//       thumb: "https://via.placeholder.com/148x148",
//       wide: "https://via.placeholder.com/300x180",
//     },
//     colors: {
//       primary: "#30207A",
//       secondaryDark: "#632E94",
//       secondaryLight: "#FBEEFB",
//     },
//   },
//   {
//     id: "test2",
//     title: "Style Transfer",
//     lastUpdate: 500,
//     thumbnails: {
//       thumb: "https://via.placeholder.com/148x148",
//       wide: "https://via.placeholder.com/300x180",
//     },
//     colors: {
//       primary: "#737311",
//       secondaryDark: "#748C31",
//       secondaryLight: "#ECF4E3",
//     },
//   },
//   {
//     id: "test",
//     title: "Animation video from cool students",
//     lastUpdate: 500,
//     thumbnails: {
//       thumb: "https://via.placeholder.com/148x148",
//       wide: "https://via.placeholder.com/300x180",
//     },
//     colors: {
//       primary: "#812D1B",
//       secondaryDark: "#9C6428",
//       secondaryLight: "#FFFFF1",
//     },
//   },
// ];

const fixedFooterStyle = css`
  position: fixed;
  bottom: 0;

  @media (max-width: 600px) {
    left: 0;
    right: 0;
  }

  @media (min-width: 600px) {
    width: 600px;
    margin-bottom: 16px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: rgba(0, 30, 76, 0.25) 0 5px 5px;
  }
`;

const folderTitle = css`
  font-family: "Montserrat", sans-serif;
  font-size: 26px;
  font-weight: bold;
  margin: 0px 16px 12px;
  color: #001e4c;
`;

const folderDescription = css`
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: bold;
  margin: 0px 16px 32px;
  color: #001e4c;
`;

const MemoizedExperienceList = memo(ExperienceList);

const ExploreFolderPage = (): JSX.Element => {
  const currentExperienceMutation = useCurrentExperienceMutation();
  const { data: foldersMap } = useFolders();
  const { data: experiencesMap } = useExperiences();
  const [experiences, setExperiences] = useState<Experience[]>([]);

  const [dialogExperience, setDialogExperience] = useState<
    Experience | undefined
  >();

  const onExperienceClicked = useCallback(
    (experience: Experience) => {
      setDialogExperience(experience);
    },
    [experiences, setDialogExperience]
  );

  const history = useHistory();

  const onExperienceLaunched = useCallback(
    (experience: Experience) => {
      currentExperienceMutation.mutate(experience.id);
      onDialogClosed();
      if (hasControls(experience.id)) {
        history.push(`/controls/${experience.id}`);
      }
    },
    [experiences, setDialogExperience]
  );

  const onDialogClosed = () => {
    setDialogExperience(undefined);
  };

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!experiencesMap || !id) {
      return;
    }
    // Filter the experiences for the ones that exist in the specified folder.
    setExperiences(
      Object.values(experiencesMap).filter((val) => val.folders.includes(id))
    );
  }, [experiencesMap, id]);

  return (
    <PageWidth>
      <ExperienceModal
        experience={dialogExperience}
        onClose={onDialogClosed}
        onLaunch={onExperienceLaunched}
      />
      <div>
        <Header collapsed={false} />
        <div>
          <h1 css={folderTitle}>{FolderTitle}</h1>
          <p css={folderDescription}>{FolderDescription}</p>
        </div>

        {experiences.length > 0 && (
          <MemoizedExperienceList
            experiences={experiences}
            onExperienceClick={onExperienceClicked}
          />
        )}
        <div css={fixedFooterStyle}>
          <MoreExperiencesButton />
        </div>
      </div>
    </PageWidth>
  );
};
export default ExploreFolderPage;
