import CommonLayout from "components/CommonLayout";
import PostCard from "components/PostCard";
import { getPosts } from "lib/server-helpers";
import type { GetStaticProps, NextPage } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { PostFrontmatter } from "types/blog";

type Props = {
  posts: MDXRemoteSerializeResult[];
};

const Home: NextPage<Props> = ({ posts }: Props) => (
  <CommonLayout>
    <h1 className="text-3xl">Home Page</h1>

    {posts.slice(0, 10).map((post) => (
      <PostCard
        key={(post.frontmatter as unknown as PostFrontmatter).slug}
        post={post}
      />
    ))}
  </CommonLayout>
);

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();

  return {
    props: { posts },
    revalidate: false,
  };
};

export default Home;
