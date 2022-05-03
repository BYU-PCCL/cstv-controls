import { Navigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useAuthCodeMutation } from "./common/services/hooks/api";

const AuthCodeRoute = (): JSX.Element => {
  const { code } = useParams<{ code: string }>();
  const mutation = useAuthCodeMutation();
  useEffect(() => {
    mutation.mutate(code as string);
  }, []);
  return <Navigate to="/" />;
};

export default AuthCodeRoute;
