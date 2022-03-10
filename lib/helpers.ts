import blogConfig from "blog.config";
import { readFile } from "fs/promises";
// eslint-disable-next-line import/no-extraneous-dependencies
import glob from "glob-promise";
import { serialize } from "next-mdx-remote/serialize";
import { NavBarEntry, PageFrontmatter } from "types/blog";

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

export const getDefaultNavBarEntries = async (): Promise<NavBarEntry[]> => {
  const pageSlugs = blogConfig.navbarLinks;

  // Fetch titles
  const fromSlugToTitle = async (slug: string): Promise<string> => {
    const content = await getMDXFromSlug(slug);
    const mdxParseResult = await serialize(content, { parseFrontmatter: true });
    return (mdxParseResult.frontmatter as unknown as PageFrontmatter).title;
  };
  const titlesPromises = pageSlugs.map((slug) => fromSlugToTitle(slug));
  const titles = await Promise.all(titlesPromises);

  return titles.map((title, index) => ({
    slug: pageSlugs[index],
    title,
  }));
};
