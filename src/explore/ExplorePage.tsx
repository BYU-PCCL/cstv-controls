/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Experience } from "../types/experience";
import {
  useCurrentExperienceMutation,
  useFolders,
} from "../common/services/hooks/api";
import {
  useCurrentExperience,
  useExperiences,
} from "../common/services/hooks/api";
import PageWidth from "../common/PageWidth";
import ExploreCollapsingHeader from "./ExploreCollapsingHeader";
import ExperienceList from "./ExperienceList";
import ExperienceModal from "./ExperienceModal";
import ExperienceFolder from "./ExperienceFolder";
import { hasControls } from "../controls/util";
import { useHistory } from "react-router-dom";
import { superheadingStyle } from "./styles";
import { Folder } from "../types/folder";

const MemoizedExperienceList = memo(ExperienceList);
const MemoizedFolderList = memo(ExperienceFolder);

const headerTextContainerStyle = css`
  position: relative;
  overflow: hidden;
  flex-direction: column;
  padding: 32px 16px 0;
`;

const ExplorePage = (): JSX.Element => {
  const currentExperienceMutation = useCurrentExperienceMutation();
  const { data: foldersMap } = useFolders();
  const { data: currentExp } = useCurrentExperience();
  const [folders, setFolders] = useState<Folder[]>([]);

  const [dialogExperience, setDialogExperience] = useState<
    Experience | undefined
  >();

  const onFolderClicked = useCallback(
    (folder: Folder) => {
      history.push(`/explore/${folder.id}`);
    },
    [folders]
  );

  const history = useHistory();

  useEffect(() => {
    if (!foldersMap) {
      return;
    }
    setFolders(Object.values(foldersMap));
  }, [foldersMap]);

  const experienceVisible = currentExp && !currentExp?.unlisted;

  return (
    <PageWidth>
      <ExploreCollapsingHeader experience={currentExp} />
      <div css={headerTextContainerStyle}>
        <h2 css={superheadingStyle}>
          {experienceVisible ? "Try Something Else" : "Explore"}
        </h2>
      </div>
      {folders.length > 0 && (
        <MemoizedFolderList folders={folders} onFolderClick={onFolderClicked} />
      )}
    </PageWidth>
  );
};
export default ExplorePage;
