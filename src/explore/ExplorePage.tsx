import React, { memo, useCallback, useEffect, useState } from "react";
import { Experience } from "../types/experience";
import { useCurrentExperienceMutation } from "../common/services/hooks/api";
import {
  useCurrentExperience,
  useExperiences,
} from "../common/services/hooks/api";
import PageWidth from "../common/PageWidth";
import ExploreCollapsingHeader from "./ExploreCollapsingHeader";
import ExperienceList from "./ExperienceList";
import ExperienceModal from "./ExperienceModal";

const MemoizedExperienceList = memo(ExperienceList);

const ExplorePage = (): JSX.Element => {
  const currentExperienceMutation = useCurrentExperienceMutation();
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

  useEffect(() => {
    let experiencesWithout = [...experiences];
    if (currentExperience) {
      experiencesWithout = experiencesWithout.filter(
        (experience) => experience.id !== currentExperience.id
      );
    }
    setExperiencesWithoutCurrent(experiencesWithout);
  }, [experiences, currentExperience]);

  const history = useHistory();

  const onExperienceLaunched = useCallback(
    (experience: Experience) => {
      currentExperienceMutation.mutate(experience.id);
      onDialogClosed();
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

  return (
    <PageWidth>
      <ExperienceModal
        experience={dialogExperience}
        onClose={onDialogClosed}
        onLaunch={onExperienceLaunched}
      />
      <ExploreCollapsingHeader experience={currentExperience} />
      {experiences.length > 0 && (
        <MemoizedExperienceList
          experiences={experiencesWithoutCurrent}
          onExperienceClick={onExperienceClicked}
        />
      )}
    </PageWidth>
  );
};
export default ExplorePage;
