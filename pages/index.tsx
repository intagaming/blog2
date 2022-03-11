import CommonLayout from "components/CommonLayout";
import PostCard from "components/PostCard";
import { getPlaceholder } from "lib/images";
import { getDefaultNavBarEntries, getPosts } from "lib/server-helpers";
import type { GetStaticProps, NextPage } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { NavBarEntry, PostFrontmatter } from "types/blog";

type Props = {
  posts: MDXRemoteSerializeResult[];
  coverBlurDataURLs: string[];
  navBarEntries: NavBarEntry[];
};

const Home: NextPage<Props> = ({
  posts,
  coverBlurDataURLs,
  navBarEntries,
}: Props) => (
  <CommonLayout navBarEntries={navBarEntries}>
    <main className="flex flex-col divide-y items-center px-6 my-10">
      {posts.slice(0, 10).map((post, index) => (
        <div
          key={(post.frontmatter as unknown as PostFrontmatter).slug}
          className="py-4 w-full md:max-w-3xl"
        >
          <PostCard post={post} coverBlurDataURL={coverBlurDataURLs[index]} />
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

  const navBarEntries = await getDefaultNavBarEntries();

  return {
    props: { posts, coverBlurDataURLs, navBarEntries },
    revalidate: false,
  };
};

export default Home;
