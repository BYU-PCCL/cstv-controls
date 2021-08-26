/** @jsxImportSource @emotion/react */
import React from "react";
import NowPlaying from "./NowPlaying";
import Header from "../common/Header";
import { CurrentExperience } from "../types/experience";

const ExploreCollapsingHeader = ({
  collapsed = false,
  experience,
}: {
  collapsed?: boolean;
  experience?: CurrentExperience;
}): JSX.Element => {
  return (
    <div>
      <Header collapsed={collapsed} />
      {experience && !experience?.unlisted && (
        <NowPlaying fixed={collapsed} experience={experience} />
      )}
    </div>
  );
};

export default ExploreCollapsingHeader;
