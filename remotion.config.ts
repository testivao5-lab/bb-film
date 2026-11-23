import { Config } from "@remotion/cli/config";
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(90);
Config.setConcurrency(1);
Config.setChromiumOpenGlRenderer("swangle");
Config.setOverwriteOutput(true);
