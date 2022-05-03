/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useCallback, useState } from "react";
import { useMessaging } from "@footron/controls-client";
import { IconButton, Slider } from "@material-ui/core";
import { Forward10, Pause, PlayArrow, Replay10 } from "@material-ui/icons";

const containerStyle = css`
  padding: 16px;
  overflow-x: hidden;

  p {
    margin: 0 0 16px;
  }
`;

const timingContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
  margin-top: 48px;
`;

const formatDurationSeconds = (duration: number) => {
  const minutes = Math.floor(duration / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(duration % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const ControlsComponent = (): JSX.Element => {
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [actualProgress, setActualProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number | undefined>();
  const [paused, setPaused] = useState<boolean>(false);

  const { sendMessage } = useMessaging<any>((message) => {
    if (message.type === "progress") {
      setActualProgress(message.progress);
      if (message.duration != duration) {
        setDuration(message.duration);
      }
    } else if (message.type === "state") {
      setPaused(message.state === "paused");
    }
  });

  const updateSlider = useCallback(
    async (event: React.ChangeEvent<unknown>, value: number | number[]) => {
      setProgress(value as number);
      await sendMessage({
        type: "scrub",
        progress: value as number,
        precise: false,
      });
    },
    [sendMessage]
  );

  const updateSliderCommitted = useCallback(
    async (event: React.ChangeEvent<unknown>, value: number | number[]) => {
      await sendMessage({
        type: "scrub",
        progress: value as number,
        precise: true,
      });
      setProgress(undefined);
      setActualProgress(value as number);
    },
    [sendMessage]
  );

  const onToggle = useCallback(async () => {
    await sendMessage({ type: "toggle" });
  }, [sendMessage]);

  const onRewind10 = useCallback(async () => {
    await sendMessage({ type: "jump", delta: -10 });
  }, [sendMessage]);

  const onAdvance10 = useCallback(async () => {
    await sendMessage({ type: "jump", delta: 10 });
  }, [sendMessage]);

  return (
    <div css={containerStyle}>
      <div css={timingContainerStyle}>
        <span>
          {formatDurationSeconds(
            (progress ?? actualProgress ?? 0) * (duration ?? 0)
          )}
        </span>
        <div>
          <IconButton onClick={onRewind10} color="primary">
            <Replay10 fontSize="large" />
          </IconButton>
          <IconButton onClick={onToggle} color="primary">
            {paused ? (
              <PlayArrow fontSize="large" />
            ) : (
              <Pause fontSize="large" />
            )}
          </IconButton>
          <IconButton onClick={onAdvance10} color="primary">
            <Forward10 fontSize="large" />
          </IconButton>
        </div>
        <span>{formatDurationSeconds(duration ?? 0)}</span>
      </div>
      <Slider
        min={0}
        max={1}
        onChange={updateSlider}
        onChangeCommitted={updateSliderCommitted}
        step={0.001}
        value={progress ?? actualProgress}
      />
      <br />
      <br />
    </div>
  );
};

export default ControlsComponent;
