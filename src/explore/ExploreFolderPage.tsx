/** @jsxImportSource @emotion/react */
import React, { memo, useCallback, useEffect, useState } from "react";
import PageWidth from "../common/PageWidth";
import { useHistory, useParams } from "react-router-dom";
import Header from "../common/Header";
import ExperienceList from "./ExperienceList";
import { Experience } from "../types/experience";
import MoreExperiencesButton from "../controls/MoreExperiencesButton";
import { css } from "@emotion/react";
import {
  useExperiences,
  useFolder,
  useFolders,
} from "../common/services/hooks/api";
import { hasControls } from "../controls/util";
import { useCurrentExperienceMutation } from "../common/services/hooks/api";
import ExperienceModal from "./ExperienceModal";

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
  const folder = useFolder(id);

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
        {folder && (
          <div>
            <h1 css={folderTitle}>{folder.title}</h1>
            <p css={folderDescription}>{folder.description}</p>
          </div>
        )}

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
