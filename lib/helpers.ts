import { readFile } from "fs/promises";
// eslint-disable-next-line import/no-extraneous-dependencies
import glob from "glob-promise";

export const getMDXPathFromSlug = async (slug: string): Promise<string> => {
  const matches = await glob(`content/**/${slug}.mdx`);
  if (matches.length === 0) {
    throw Error(`Cannot find MDX from slug: ${slug}`);
  }
  return matches[0];
};

export const getMDXFromSlug = async (slug: string): Promise<string> => {
  const path = await getMDXPathFromSlug(slug);
  const content = await readFile(path);
  return content.toString();
};
