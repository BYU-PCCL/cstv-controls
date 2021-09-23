/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Experience } from "../types/experience";
import { useCurrentExperienceMutation } from "../common/services/hooks/api";
import {
  useCollections,
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

const MemoizedExperienceList = memo(ExperienceList);
const MemoizedCollectionList = memo(ExperienceFolder);

const headerTextContainerStyle = css`
  position: relative;
  overflow: hidden;
  flex-direction: column;
  padding: 32px 16px 0;
`;

const ExplorePage = (): JSX.Element => {
  const currentExperienceMutation = useCurrentExperienceMutation();
  const { data: collectionsMap } = useCollections();
  const { data: experiencesMap } = useExperiences();
  const { data: currentExperience } = useCurrentExperience();
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

  useEffect(() => {
    if (!experiencesMap) {
      return;
    }
    setExperiences(Object.values(experiencesMap));
  }, [experiencesMap]);

  const experienceVisible = currentExperience && !currentExperience?.unlisted;

  return (
    <PageWidth>
      <ExperienceModal
        experience={dialogExperience}
        onClose={onDialogClosed}
        onLaunch={onExperienceLaunched}
      />
      <ExploreCollapsingHeader experience={currentExperience} />
      <div css={headerTextContainerStyle}>
        <h2 css={superheadingStyle}>
          {experienceVisible ? "Try Something Else" : "Explore"}
        </h2>
      </div>
      {experiences.length > 0 && (
        <MemoizedExperienceList
          experiences={experiences}
          onExperienceClick={onExperienceClicked}
        />
      )}
    </PageWidth>
  );
};
export default ExplorePage;
