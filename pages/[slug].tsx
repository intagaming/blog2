/* eslint-disable react/jsx-props-no-spreading */
import blogConfig from "blog.config";
import Authors from "components/mdx/Authors";
import NextImage from "components/mdx/NextImage";
import authors from "content/authors";
// eslint-disable-next-line import/no-extraneous-dependencies
import { glob } from "glob";
import { getResourceRemoteURL, isRemoteURL } from "lib/helpers";
import { getDimensions } from "lib/images";
import {
  getDefaultNavBarEntries,
  getParsedMDXFromSlug,
} from "lib/server-helpers";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ArticleJsonLd, NextSeo } from "next-seo";
import { useTheme } from "next-themes";
import path from "path";
import { useEffect, useState } from "react";
import { PostOrPageFrontmatter } from "types/blog";
import { Utterances } from "utterances-react-component";
import { PageRequiredProps } from "./_app";

interface Props extends PageRequiredProps {
  mdxParsed: MDXRemoteSerializeResult;
  domainUrl: string;
  seoCover: { src: string; width: number; height: number } | null;
}

const mdxComponents: import("mdx/types").MDXComponents = {
  // @ts-ignore
  Image: (props) => <NextImage {...props} />,
};

/**
 * Each BlogPage should correspond to a MDX file of a post or a page in the
 * /content folder.
 */
const BlogPage: NextPage<Props> = ({
  mdxParsed,
  domainUrl,
  seoCover: cover,
}: Props) => {
  const { resolvedTheme } = useTheme();

  const { frontmatter: fm } = mdxParsed;

  const castedFm = fm as unknown as PostOrPageFrontmatter;
  if (!["post", "page"].includes(castedFm.type)) {
    throw Error(`Type invalid: ${castedFm.type}`);
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  const renderedMDX = <MDXRemote {...mdxParsed} components={mdxComponents} />;

  const publicationDate =
    "publication_date" in castedFm ? castedFm.publication_date : undefined;

  const { bannerUrl, blogName } = blogConfig;

  const authorNames = castedFm.authors.map((a) => authors[a].fullName);

  return (
    <>
      <NextSeo
        title={castedFm.title}
        description={castedFm.excerpt}
        canonical={`${domainUrl}/${castedFm.slug}`}
        openGraph={{
          title: `${castedFm.title} | ${blogName}`,
          type: "article",
          url: `${domainUrl}/${castedFm.slug}`,
          description: castedFm.excerpt,
          images: [
            {
              url: cover?.src || bannerUrl,
              width: cover?.width || 1920,
              height: cover?.height || 1080,
              alt: "",
            },
          ],
          article: {
            publishedTime: publicationDate,
            modifiedTime: publicationDate, // TODO: update with modified_at in the future
            authors: authorNames,
          },
        }}
      />
      <ArticleJsonLd
        url={`${domainUrl}/${castedFm.slug}`}
        title={`${castedFm.title} | ${blogName}`}
        images={[cover?.src || bannerUrl]}
        datePublished={publicationDate || ""}
        dateModified={publicationDate}
        authorName={authorNames}
        description={castedFm.excerpt}
      />
      <article className="px-4 mx-auto my-10 prose dark:prose-invert xl:prose-xl md:my-20 md:px-0">
        {renderedMDX}
        <hr />
        <Authors authors={castedFm.authors.map((a) => authors[a])} />
        <Utterances
          repo="intagaming/blog2"
          theme={resolvedTheme === "light" ? "github-light" : "github-dark"}
          issueTerm="pathname"
        />
      </article>
    </>
  );
};

type Params = {
  slug: string;
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

  const domainUrl =
    process.env.NEXT_PUBLIC_DOMAIN_URL || "http://localhost:3000";

  const fm = mdxParsed.frontmatter as unknown as PostOrPageFrontmatter;

  let seoCover = null;
  if ("cover_url" in fm) {
    let src = fm.cover_url;
    let remoteUrl;
    if (!isRemoteURL(src)) {
      remoteUrl = getResourceRemoteURL(src);
      src = `public/${src}`;
    } else {
      remoteUrl = src;
    }
    const size = await getDimensions(src);
    seoCover = {
      src: remoteUrl,
      width: size.width,
      height: size.height,
    };
  }

  return {
    props: { mdxParsed, navBarEntries, domainUrl, seoCover },
  };
};

export default BlogPage;
