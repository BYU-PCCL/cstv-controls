import Controls1 from "./life/index";
// VideoScrubber will be used by modules that are imported dynamically later
// noinspection ES6UnusedImports
import VideoScrubber from "../VideoScrubber"; // eslint-disable-line @typescript-eslint/no-unused-vars

const controls: Map<string, () => JSX.Element> = new Map([["life", Controls1]]);

export default controls;
