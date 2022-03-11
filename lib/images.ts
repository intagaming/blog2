/* eslint-disable import/no-extraneous-dependencies */
import { createReadStream } from "fs";
import probe from "probe-image-size";
import { getPlaiceholder } from "plaiceholder";
import { ImageDimensions } from "../types/ImageDimensions";
import { isRemoteURL } from "./helpers";

export const getDimensions = async (url: string): Promise<ImageDimensions> => {
  let width;
  let height;
  if (isRemoteURL(url)) {
    ({ width, height } = await probe(url));
  } else {
    ({ width, height } = await probe(createReadStream(url)));
  }
  return { width, height };
};

export const getPlaceholder = async (url: string): Promise<string> => {
  const { base64 } = await getPlaiceholder(url);
  return base64;
};
