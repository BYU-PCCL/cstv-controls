/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Experience } from "../types/experience";
import { css } from "@emotion/react";
import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "../types/colors";

const useCardStyles = makeStyles({
  paper: {
    backgroundColor: ({ tertiary }: Colors) => tertiary["90"],
    borderRadius: "8px",
  },
});

const useContentStyles = makeStyles({
  root: {
    backgroundColor: ({ primary }: Colors) => primary["20"],
    color: ({ primary }: Colors) => primary["90"],
    // TODO: Decide if these are good numbers for padding here
    padding: "20px 24px",
    margin: "-10",
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
    color: ({ tertiary }: Colors) => tertiary["20"],
    "&:hover": {
      backgroundColor: ({ tertiary }: Colors) => tertiary["60"],
    },
    "&:active": {
      backgroundColor: ({ tertiary }: Colors) => tertiary["50"],
    },
  },
  contained: {
    padding: "8px 28px",
    color: ({ tertiary }: Colors) => tertiary["90"],
    backgroundColor: ({ tertiary }: Colors) => tertiary["30"],
    borderRadius: "6px",
    boxShadow: ({ primary }: Colors) => `0px 4px 6px ${primary["20"]}4d`,
    transition: "transform 100ms",
    "&:hover": {
      backgroundColor: ({ tertiary }: Colors) => tertiary["20"],
      transform: "scale(102%)",
      "-webkit-transform": "scale(1.02, 1.02);",
      boxShadow: ({ primary }: Colors) => `0px 4px 6px ${primary["20"]}4d`,
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
  primary: {
    "0": "#000000",
    "10": "#000000",
    "20": "#000000",
    "30": "#000000",
    "40": "#000000",
    "50": "#000000",
    "60": "#000000",
    "70": "#000000",
    "80": "#000000",
    "90": "#000000",
    "100": "#000000",
  },
  secondary: {
    "0": "#000000",
    "10": "#000000",
    "20": "#000000",
    "30": "#000000",
    "40": "#000000",
    "50": "#000000",
    "60": "#000000",
    "70": "#000000",
    "80": "#000000",
    "90": "#000000",
    "100": "#000000",
  },
  tertiary: {
    "0": "#000000",
    "10": "#000000",
    "20": "#000000",
    "30": "#000000",
    "40": "#000000",
    "50": "#000000",
    "60": "#000000",
    "70": "#000000",
    "80": "#000000",
    "90": "#000000",
    "100": "#000000",
  },
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
        <h1 css={titleStyle}>{lastExperience?.title || "ERROR"}</h1>
        <p
          css={descriptionStyle}
          dangerouslySetInnerHTML={{
            __html: lastExperience?.description || "",
          }}
        />
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
