/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import PageWidth from "../common/PageWidth";
import ControlsHeader from "./ControlsHeader";
import MoreExperiencesButton from "./MoreExperiencesButton";
import {
  useCurrentExperience,
  useExperience,
} from "../common/services/hooks/api";
import { useParams } from "react-router-dom";
import LoadingPage from "../common/LoadingPage";
import ControlsView from "./ControlsView";

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

const ControlsPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const experience = useExperience(id);
  // It feels pretty hacky to ask for both the experience and the current
  // experience, but those two aren't always the same--we could be trying to
  // launch a new experience, for example
  const { data: currentExperience } = useCurrentExperience();
  const isCurrentExperience =
    experience && currentExperience && experience.id === currentExperience.id;

  return experience ? (
    <PageWidth>
      <ControlsHeader title={experience.title} />
      <ControlsView id={id} />
      {(!isCurrentExperience || currentExperience?.lock !== true) && (
        <div css={fixedFooterStyle}>
          <MoreExperiencesButton />
        </div>
      )}
    </PageWidth>
  ) : (
    <LoadingPage />
  );
};

export default ControlsPage;
