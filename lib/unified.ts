/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */

import { ImageElement } from "types/hast";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { getDimensions, getPlaceholder } from "./images";

// Converts <img> to <Image> and assign width & height
export const optimizeImages: Plugin<[]> = () => async (tree) => {
  // We need a little trick to do this the async way,
  // although we could change the signature as well.
  // But then await multiple HTTP requests is faster.
  const promises: Promise<void>[] = [];

  visit(tree, { tagName: "img" }, (node: ImageElement) => {
    promises.push(
      (async () => {
        const { width, height } = await getDimensions(
          `public/${node.properties.src}`
        );
        node.tagName = "Image";
        node.properties.placeholder = "blur";
        node.properties.blurDataURL = await getPlaceholder(
          `/${node.properties.src}`
        );
        node.properties.width = width;
        node.properties.height = height;
      })()
    );
  });

  await Promise.allSettled(promises);

  return tree;
};
