/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Experience } from "../types/experience";
import { css } from "@emotion/react";
import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "../types/colors";

const useCardStyles = makeStyles({
  paper: {
    backgroundColor: ({ secondaryLight }: Colors) => secondaryLight,
    borderRadius: "8px",
  },
});

const useContentStyles = makeStyles({
  root: {
    backgroundColor: ({ primary }: Colors) => primary,
    padding: "0",
    margin: "-10",
  },
});

const useContentTextStyles = makeStyles({
  root: {
    color: ({ secondaryLight }: Colors) => secondaryLight,
    padding: "18px 20px",
  },
});

const useActionStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

const useButtonStyles = makeStyles({
  root: {
    fontFamily: `"Source Code Pro", monospace`,
    fontSize: "18px",
    padding: "14px 18px",
  },
  text: {
    color: ({ secondaryDark }: Colors) => secondaryDark,
    "&:hover": {
      backgroundColor: ({ secondaryDark }: Colors) => secondaryDark + "30",
    },
    "&:active": {
      backgroundColor: ({ secondaryDark }: Colors) => secondaryDark + "50",
    },
  },
  contained: {
    padding: "8px 28px",
    color: ({ secondaryLight }: Colors) => secondaryLight,
    backgroundColor: ({ secondaryDark }: Colors) => secondaryDark,
    borderRadius: "6px",
    boxShadow: ({ primary }: Colors) => `0px 4px 6px ${primary}4d`,
    transition: "transform 100ms",
    "&:hover": {
      backgroundColor: ({ secondaryDark }: Colors) => secondaryDark,
      transform: "scale(102%)",
      "-webkit-transform": "scale(1.02, 1.02);",
      boxShadow: ({ primary }: Colors) => `0px 4px 6px ${primary}4d`,
    },
    "&:active": {
      transform: "scale(96%)",
      "-webkit-transform": "scale(0.96, 0.96);",
    },
  },
});

const titleStyle = css`
  font-size: 22px;
  font-family: "Montserrat", sans-serif;
  margin: 0;
`;

const descriptionStyle = css`
  font-size: 14px;
  margin: 10px 0 0;
  font-family: "Lato", sans-serif;
  opacity: 81%;
`;

const imageStyle = css`
  width: 100%;
  object-fit: cover;
`;

const defaultColors: Colors = {
  primary: "#212121",
  secondaryLight: "#fafafa",
  secondaryDark: "#252525",
};

const ExperienceModal = ({
  experience,
  onClose,
  onLaunch,
}: {
  experience?: Experience;
  onClose: () => void;
  onLaunch: (experience: Experience) => void;
}): JSX.Element => {
  const [lastExperience, setLastExperience] = useState<
    Experience | undefined
  >();

  useEffect(() => {
    if (experience == null) {
      return;
    }

    setLastExperience(experience);
  }, [experience]);

  const cardClasses = useCardStyles(lastExperience?.colors || defaultColors);

  const contentClasses = useContentStyles(
    lastExperience?.colors || defaultColors
  );
  const contentTextClasses = useContentTextStyles(
    lastExperience?.colors || defaultColors
  );
  const actionClasses = useActionStyles();
  const buttonClasses = useButtonStyles(
    lastExperience?.colors || defaultColors
  );

  const onLaunchFn = useCallback(
    () => experience && onLaunch(experience),
    [experience]
  );

  return (
    <Dialog
      open={experience != null}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      classes={{
        paper: cardClasses.paper,
      }}
    >
      <img
        css={imageStyle}
        src={lastExperience?.thumbnails?.wide || ""}
        alt=""
      />

      <DialogContent
        classes={{
          root: contentClasses.root,
        }}
      >
        <DialogContentText
          id="alert-dialog-slide-description"
          classes={{
            root: contentTextClasses.root,
          }}
        >
          <h1 css={titleStyle}>{lastExperience?.title || "ERROR"}</h1>
          <p
            css={descriptionStyle}
            dangerouslySetInnerHTML={{
              __html: lastExperience?.description || "",
            }}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions
        classes={{
          root: actionClasses.root,
        }}
      >
        <Button
          disableRipple
          disableElevation
          onClick={onClose}
          classes={{
            root: buttonClasses.root,
            text: buttonClasses.text,
          }}
        >
          CANCEL
        </Button>
        <Button
          disableRipple
          disableElevation
          onClick={onLaunchFn}
          variant="contained"
          classes={{
            root: buttonClasses.root,
            contained: buttonClasses.contained,
          }}
        >
          LAUNCH
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExperienceModal;
