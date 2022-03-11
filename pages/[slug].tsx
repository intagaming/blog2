/* eslint-disable react/jsx-props-no-spreading */
import NextImage from "components/mdx/NextImage";
import PageLayout from "components/PageLayout";
import PostLayout from "components/PostLayout";
// eslint-disable-next-line import/no-extraneous-dependencies
import { glob } from "glob";
import {
  getDefaultNavBarEntries,
  getParsedMDXFromSlug,
} from "lib/server-helpers";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import path from "path";
import { NavBarEntry, PostOrPageFrontmatter } from "types/blog";

type Props = {
  mdxParsed: MDXRemoteSerializeResult;
  navBarEntries: NavBarEntry[];
};

const mdxComponents: import("mdx/types").MDXComponents = {
  // @ts-ignore
  Image: (props) => <NextImage {...props} />,
};

/**
 * Each BlogPage should correspond to a MDX file of a post or a page in the
 * /content folder.
 */
const BlogPage: NextPage<Props> = ({ mdxParsed, navBarEntries }: Props) => {
  const { frontmatter } = mdxParsed;

  const castedFrontmatter = frontmatter as unknown as PostOrPageFrontmatter;
  if (castedFrontmatter.type !== "post" && castedFrontmatter !== "page") {
    throw Error(`Type invalid: ${castedFrontmatter.type}`);
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  const renderedMDX = <MDXRemote {...mdxParsed} components={mdxComponents} />;

  return (
    <>
      {castedFrontmatter.type === "post" && (
        <PostLayout navBarEntries={navBarEntries}>{renderedMDX}</PostLayout>
      )}

      {castedFrontmatter.type === "page" && (
        <PageLayout navBarEntries={navBarEntries}>{renderedMDX}</PageLayout>
      )}
    </>
  );
};

type Params = {
  slug: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (params === undefined) {
    return {
      notFound: true,
    };
  }

  const { slug } = params;

  const mdxParsed = await getParsedMDXFromSlug(slug);

  const navBarEntries = await getDefaultNavBarEntries();

  return {
    props: { mdxParsed, navBarEntries },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths: { params: Params }[] = [];

  const matches = glob.sync("content/{posts,pages}/*.mdx");

  matches.forEach((match) => {
    const slug = path.basename(match, ".mdx");
    paths.push({ params: { slug } });
  });

  return {
    paths,
    fallback: false,
  };
};

export default BlogPage;
