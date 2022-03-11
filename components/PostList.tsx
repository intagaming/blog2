import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { PostFrontmatter } from "types/blog";
import PostCard from "./PostCard";

type Props = {
  posts: MDXRemoteSerializeResult[];
  coverBlurDataURLs: string[];
};

const PostList = ({ posts, coverBlurDataURLs }: Props) => (
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
);

export default PostList;
