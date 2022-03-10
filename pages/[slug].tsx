// eslint-disable-next-line import/no-extraneous-dependencies
import { glob } from "glob";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { getMDXFromSlug } from "lib/helpers";
import { PostOrPage } from "types/blog";
import PostLayout from "components/PostLayout";
import PageLayout from "components/PageLayout";

type Props = {
  source: MDXRemoteSerializeResult;
};

const BlogPage: NextPage<Props> = ({ source }: Props) => {
  const { frontmatter } = source;

  const castedFrontmatter = frontmatter as unknown as PostOrPage;
  if (castedFrontmatter.type !== "post" && castedFrontmatter !== "page") {
    throw Error(`Type invalid: ${castedFrontmatter.type}`);
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  const renderedMDX = <MDXRemote {...source} />;

  return (
    <>
      {castedFrontmatter.type === "post" && (
        <PostLayout>{renderedMDX}</PostLayout>
      )}

      {castedFrontmatter.type === "page" && (
        <PageLayout>{renderedMDX}</PageLayout>
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

  const source = await serialize(mdx, { parseFrontmatter: true });

  return {
    props: { source },
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
