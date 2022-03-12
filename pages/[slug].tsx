/* eslint-disable react/jsx-props-no-spreading */
import blogConfig from "blog.config";
import NextImage from "components/mdx/NextImage";
import PostOrPageLayout from "components/PostOrPageLayout";
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
import path from "path";
import { NavBarEntry, PostOrPageFrontmatter } from "types/blog";

type Props = {
  mdxParsed: MDXRemoteSerializeResult;
  navBarEntries: NavBarEntry[];
  domainUrl: string;
  seoCover?: { src: string; width: number; height: number };
};

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
  navBarEntries,
  domainUrl,
  seoCover: cover,
}: Props) => {
  const { frontmatter: fm } = mdxParsed;

  const castedFm = fm as unknown as PostOrPageFrontmatter;
  if (!["post", "page"].includes(castedFm.type)) {
    throw Error(`Type invalid: ${castedFm.type}`);
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  const renderedMDX = <MDXRemote {...mdxParsed} components={mdxComponents} />;

  const publicationDate =
    "publication_date" in castedFm ? castedFm.publication_date : undefined;

  return (
    <>
      <NextSeo
        title={castedFm.title}
        description={castedFm.excerpt}
        canonical={`${domainUrl}`}
        openGraph={{
          title: `${castedFm.title} | ${blogConfig.blogName}`,
          type: "article",
          url: `${domainUrl}/${castedFm.slug}`,
          description: castedFm.excerpt,
          images: [
            {
              url: cover?.src || blogConfig.bannerUrl,
              width: cover?.width || 1920,
              height: cover?.height || 1080,
              alt: "",
            },
          ],
          article: {
            publishedTime: publicationDate,
            modifiedTime: publicationDate, // TODO: update with modified_at in the future
            // authors: ["https://hxann.com/about"], // TODO: use the authors field properly
          },
        }}
      />
      <ArticleJsonLd
        url={`${domainUrl}/${castedFm.slug}`}
        title={`${castedFm.title} | ${blogConfig.blogName}`}
        images={[cover?.src || blogConfig.bannerUrl]}
        datePublished={publicationDate || ""}
        dateModified={publicationDate}
        authorName={blogConfig.blogName} // TODO: author instead of blog name
        description={castedFm.excerpt}
      />
      <PostOrPageLayout navBarEntries={navBarEntries}>
        {renderedMDX}
      </PostOrPageLayout>
    </>
  );
};

BlogPage.defaultProps = {
  seoCover: undefined,
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

  const domainUrl =
    process.env.NEXT_PUBLIC_DOMAIN_URL || "http://localhost:3000";

  const fm = mdxParsed.frontmatter as unknown as PostOrPageFrontmatter;

  let seoCover;
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
