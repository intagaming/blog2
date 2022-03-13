import blogConfig from "blog.config";
import PostList from "components/PostList";
import { getResourceRemoteURL, isRemoteURL } from "lib/helpers";
import { getPlaceholder } from "lib/images";
import { getDefaultNavBarEntries, getPosts } from "lib/server-helpers";
import type { GetStaticProps, NextPage } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { PostFrontmatter } from "types/blog";
import { PageRequiredProps } from "./_app";

interface Props extends PageRequiredProps {
  posts: MDXRemoteSerializeResult[];
  coverBlurDataURLs: string[];
  viewArchivePage: number;
  domainUrl: string;
}

const Home: NextPage<Props> = ({
  posts,
  coverBlurDataURLs,
  viewArchivePage,
  domainUrl,
}: Props) => {
  const { blogDescription, bannerUrl, blogName } = blogConfig;

  return (
    <>
      <NextSeo
        title="Blog"
        description={blogDescription}
        canonical={`${domainUrl}`}
        openGraph={{
          title: `Blog | ${blogName}`,
          type: "website",
          url: domainUrl,
          description: blogDescription,
          images: [
            {
              url: isRemoteURL(bannerUrl)
                ? bannerUrl
                : getResourceRemoteURL(bannerUrl),
              width: 1920,
              height: 1080,
              alt: blogName,
            },
          ],
        }}
      />
      <PostList posts={posts} coverBlurDataURLs={coverBlurDataURLs} />

      <div className="flex justify-center pb-10">
        <Link href={`/archive/${viewArchivePage}`}>
          <a className="flex items-center gap-4 p-4 border rounded-md">
            <span>View more posts</span>
            <FaPlus />
          </a>
        </Link>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const numberOfPosts = blogConfig.postsOnHomePage;

  const allPosts = await getPosts();
  const posts = allPosts.slice(0, numberOfPosts);

  const coverBlurDataURLs = await Promise.all(
    posts.map((post) =>
      getPlaceholder(
        `/${(post.frontmatter as unknown as PostFrontmatter).cover_url}`
      )
    )
  );

  const navBarEntries = await getDefaultNavBarEntries();

  const pageCount = Math.ceil(allPosts.length / blogConfig.postsPerArchivePage);
  const viewArchivePage = Math.min(
    Math.ceil((numberOfPosts + 1) / blogConfig.postsPerArchivePage),
    pageCount
  );

  const domainUrl =
    process.env.NEXT_PUBLIC_DOMAIN_URL || "http://localhost:3000";

  return {
    props: {
      posts,
      coverBlurDataURLs,
      navBarEntries,
      viewArchivePage,
      domainUrl,
    },
    revalidate: false,
  };
};

export default Home;
