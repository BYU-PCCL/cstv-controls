import React from "react";
import { useExperiences } from "../common/hooks/api";

const ExplorePage = (): JSX.Element => {
  const { status, data, error } = useExperiences();

  return (
    <div>
      {status === "loading" ? (
        "Loading..."
      ) : status === "error" && error ? (
        <span>{error.response.status}</span>
      ) : (
        data && <span>{JSON.stringify(data)}</span>
      )}
    </div>
  );
};

export default ExplorePage;
