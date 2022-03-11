/* eslint-disable import/no-extraneous-dependencies */
import { Element } from "hast";

export interface ImageElement extends Element {
  tagName: "img" | "Image";
  properties: {
    src: string;
    alt: string;
    placeholder: "blur";
    blurDataURL: string;
    width: number;
    height: number;
  };
}
