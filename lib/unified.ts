/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */

import { Element, Parent } from "hast";
import { ImageElement } from "types/hast";
import { Plugin } from "unified";
import { CONTINUE, SKIP, visit } from "unist-util-visit";
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

/**
 * This converts any <p> that has an <Image> inside to a <div>.
 * This plugin must be ran **after** the `optimizeImages` plugin.
 */
export const removeImageParagraph: Plugin<[]> = () => async (tree) => {
  visit(tree, { tagName: "p" }, (node: Element, index, parent: Parent) => {
    const hasImageTag = node.children.some(
      (c) => c.type === "element" && c.tagName === "Image"
    );

    // If there's any <Image> tag in this <p>...
    if (!hasImageTag) return CONTINUE;

    // ... then remove the paragraph, bring children outside
    parent.children.splice(index, 1, ...node.children);
    return [SKIP, index];
  });

  return tree;
};
