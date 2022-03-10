// eslint-disable-next-line import/no-extraneous-dependencies
import { glob } from "glob";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { getDefaultNavBarEntries, getMDXFromSlug } from "lib/helpers";
import { NavBarEntry, PostOrPageFrontmatter } from "types/blog";
import PostLayout from "components/PostLayout";
import PageLayout from "components/PageLayout";

type Props = {
  mdxParsed: MDXRemoteSerializeResult;
  navBarEntries: NavBarEntry[];
};

const BlogPage: NextPage<Props> = ({ mdxParsed, navBarEntries }: Props) => {
  const { frontmatter } = mdxParsed;

  const castedFrontmatter = frontmatter as unknown as PostOrPageFrontmatter;
  if (castedFrontmatter.type !== "post" && castedFrontmatter !== "page") {
    throw Error(`Type invalid: ${castedFrontmatter.type}`);
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  const renderedMDX = <MDXRemote {...mdxParsed} />;

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
  const mdx = await getMDXFromSlug(slug);

  const mdxParsed = await serialize(mdx, { parseFrontmatter: true });

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
