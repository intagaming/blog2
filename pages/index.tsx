import blogConfig from "blog.config";
import CommonLayout from "components/CommonLayout";
import PostList from "components/PostList";
import { getPlaceholder } from "lib/images";
import { getDefaultNavBarEntries, getPosts } from "lib/server-helpers";
import type { GetStaticProps, NextPage } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";
import { NavBarEntry, PostFrontmatter } from "types/blog";
import { FaPlus } from "react-icons/fa";

type Props = {
  posts: MDXRemoteSerializeResult[];
  coverBlurDataURLs: string[];
  navBarEntries: NavBarEntry[];
  viewArchivePage: number;
};

const Home: NextPage<Props> = ({
  posts,
  coverBlurDataURLs,
  navBarEntries,
  viewArchivePage,
}: Props) => (
  <CommonLayout navBarEntries={navBarEntries}>
    <PostList posts={posts} coverBlurDataURLs={coverBlurDataURLs} />

    <div className="flex justify-center py-10">
      <Link href={`/archive/${viewArchivePage}`}>
        <a className="p-4 border rounded-md flex items-center gap-4">
          <span>View more posts</span>
          <FaPlus />
        </a>
      </Link>
    </div>
  </CommonLayout>
);

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

  return {
    props: { posts, coverBlurDataURLs, navBarEntries, viewArchivePage },
    revalidate: false,
  };
};

export default Home;
