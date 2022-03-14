import blogConfig from "blog.config";
import { readFile } from "fs/promises";
// eslint-disable-next-line import/no-extraneous-dependencies
import glob from "glob-promise";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { basename } from "path";
import { NavBarEntry, PageFrontmatter, PostFrontmatter } from "types/blog";
import { parseDate } from "./helpers";
import { removeImageParagraph, optimizeImages } from "./unified";

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

export const getParsedMDXFromSlug = async (
  slug: string
): Promise<MDXRemoteSerializeResult> => {
  const mdx = await getMDXFromSlug(slug);
  const parsed = await serialize(mdx, {
    parseFrontmatter: true,
    mdxOptions: {
      rehypePlugins: [optimizeImages, removeImageParagraph],
    },
  });
  return parsed;
};

export const getDefaultNavBarEntries = async (): Promise<NavBarEntry[]> => {
  const pageSlugs = blogConfig.navbarLinks;

  // Fetch titles
  const fromSlugToTitle = async (slug: string): Promise<string> => {
    const mdxParseResult = await getParsedMDXFromSlug(slug);
    return (mdxParseResult.frontmatter as unknown as PageFrontmatter).title;
  };
  const titlesPromises = pageSlugs.map((slug) => fromSlugToTitle(slug));
  const titles = await Promise.all(titlesPromises);

  return titles.map((title, index) => ({
    slug: pageSlugs[index],
    title,
  }));
};

export const getPostSlugs = async () =>
  (await glob(`content/posts/*.mdx`)).map((path) => basename(path, ".mdx"));

export const getPosts = async (): Promise<MDXRemoteSerializeResult[]> => {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(
    slugs.map((slug) => getParsedMDXFromSlug(slug))
  );

  // Sort posts by DESC publication date
  posts.sort((a, b) => {
    const aFrontmatter = a.frontmatter as unknown as PostFrontmatter;
    const bFrontmatter = b.frontmatter as unknown as PostFrontmatter;

    return (
      parseDate(bFrontmatter.publication_date).getTime() -
      parseDate(aFrontmatter.publication_date).getTime()
    );
  });

  return posts;
};
