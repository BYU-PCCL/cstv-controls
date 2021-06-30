import React, { useEffect, useState } from "react";
import { Experience } from "../types/experience";
import { Button } from "@material-ui/core";
import { useCurrentExperienceMutation } from "../common/services/hooks/api";
import {
  useCurrentExperience,
  useExperiences,
} from "../common/services/hooks/api";
import PageWidth from "../common/PageWidth";
import ExploreCollapsingHeader from "./ExploreCollapsingHeader";

const ExplorePage = (): JSX.Element => {
  const currentExperienceMutation = useCurrentExperienceMutation();
  const { data: experiencesMap } = useExperiences();
  const { data: currentExperience } = useCurrentExperience();
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    if (!experiencesMap) {
      return;
    }
    setExperiences(Object.values(experiencesMap));
  }, [experiencesMap]);

  return (
    <PageWidth>
      {currentExperience && (
        <ExploreCollapsingHeader experience={currentExperience} />
      )}
      {experiences.length > 0 &&
        experiences.map((experience) => (
          <div key={experience.id}>
            <h1>{experience.title}</h1>
            <Button
              variant="outlined"
              disableRipple
              onClick={() => currentExperienceMutation.mutate(experience.id)}
            >
              Start it up
            </Button>
          </div>
        ))}
    </PageWidth>
  );
};
export default ExplorePage;
