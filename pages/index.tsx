import CommonLayout from "components/CommonLayout";
import PostCard from "components/PostCard";
import { getPlaceholder } from "lib/images";
import { getPosts } from "lib/server-helpers";
import type { GetStaticProps, NextPage } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { PostFrontmatter } from "types/blog";

type Props = {
  posts: MDXRemoteSerializeResult[];
  coverBlurDataURLs: string[];
};

const Home: NextPage<Props> = ({ posts, coverBlurDataURLs }: Props) => (
  <CommonLayout>
    <h1 className="text-3xl">Home Page</h1>

    <main className="flex flex-col divide-y items-center px-6">
      {posts.slice(0, 10).map((post, index) => (
        <div className="py-4 w-full md:max-w-3xl">
          <PostCard
            key={(post.frontmatter as unknown as PostFrontmatter).slug}
            post={post}
            coverBlurDataURL={coverBlurDataURLs[index]}
          />
        </div>
      ))}
    </main>
  </CommonLayout>
);

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();

  const coverBlurDataURLs = await Promise.allSettled(
    posts.map((post) =>
      getPlaceholder(
        `public/${(post.frontmatter as unknown as PostFrontmatter).cover_url}`
      )
    )
  );

  return {
    props: { posts, coverBlurDataURLs },
    revalidate: false,
  };
};

export default Home;
