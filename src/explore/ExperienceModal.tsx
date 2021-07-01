/** @jsxImportSource @emotion/react */
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { Experience } from "../types/experience";
import { css } from "@emotion/react";
import { makeStyles } from "@material-ui/core/styles";
import { background } from "@storybook/theming";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const actionsStyle = css`
  color: blue;
`;

const useCardStyles = (backgroundColor: string) =>
  makeStyles({
    paper: {
      backgroundColor,
      borderRadius: "8px",
    },
  })();

const useContentStyles = (backgroundColor: string) =>
  makeStyles({
    root: {
      backgroundColor: backgroundColor,
      padding: "0",
      margin: "-10",
    },
  })();

const useContentTextStyles = (color: string) =>
  makeStyles({
    root: {
      color,
      padding: "18px 20px",
    },
  })();

const useActionStyles = () =>
  makeStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
  })();

const useButtonStyles = () =>
  makeStyles({
    root: {
      fontFamily: `"Source Code Pro", monospace`,
    },
    text: {},
    contained: {},
  })();

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

const ExperienceModal = ({
  experience,
  onClose,
}: {
  experience?: Experience;
  onClose: () => void;
}): JSX.Element => {
  const cardClasses = useCardStyles(
    experience?.colors.secondaryLight || "white"
  );

  const contentClasses = useContentStyles(experience?.colors.primary || "blue");
  const contentTextClasses = useContentTextStyles(
    experience?.colors.secondaryLight || "black"
  );
  const actionClasses = useActionStyles();
  const buttonClasses = useButtonStyles();

  const maxWidth = "xs";

  return (
    <div>
      <Dialog
        open={experience != null}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        maxWidth={maxWidth}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        classes={{
          paper: cardClasses.paper,
        }}
      >
        <img src={experience?.thumbnail.large || ""} alt="" />

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
            <h1 css={titleStyle}>{experience?.title || "ERROR"}</h1>
            <p css={descriptionStyle}>
              {experience?.description || "no description found"}
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          classes={{
            root: actionClasses.root,
          }}
        >
          <Button
            onClick={onClose}
            classes={{
              root: buttonClasses.root,
              text: buttonClasses.text,
            }}
          >
            CANCEL
          </Button>
          <Button
            onClick={onClose}
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
    </div>
  );
};

export default ExperienceModal;
