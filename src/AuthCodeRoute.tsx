import { Redirect, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useAuthCodeMutation } from "./common/hooks/api";

const AuthCodeRoute = (): JSX.Element => {
  const { code } = useParams<{ code: string }>();
  const mutation = useAuthCodeMutation();
  useEffect(() => {
    mutation.mutate(code);
  }, []);
  return <Redirect to="/" />;
};

export default AuthCodeRoute;
