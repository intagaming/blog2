/* eslint-disable import/no-extraneous-dependencies */
import { encode } from "blurhash";
import { createReadStream } from "fs";
import probe from "probe-image-size";
import sharp from "sharp";
import { ImageDimensions } from "../types/ImageDimensions";
import { isRemoteURL } from "./client-helpers";

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

export const getPlaceholder = (path: string): Promise<string> =>
  new Promise((resolve, reject) => {
    sharp(path)
      .raw()
      .ensureAlpha()
      .resize(32, 32, { fit: "inside" })
      .toBuffer((err, buffer, { width, height }) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(encode(new Uint8ClampedArray(buffer), width, height, 4, 4));
      });
  });
