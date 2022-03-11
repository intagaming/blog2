import blogConfig from "blog.config";
import CommonLayout from "components/CommonLayout";
import Paginate from "components/Paginate";
import PostList from "components/PostList";
import { getPlaceholder } from "lib/images";
import {
  getDefaultNavBarEntries,
  getPosts,
  getPostSlugs,
} from "lib/server-helpers";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { NavBarEntry, PostFrontmatter } from "types/blog";

type Props = {
  posts: MDXRemoteSerializeResult[];
  coverBlurDataURLs: string[];
  navBarEntries: NavBarEntry[];
  currentPage: number;
  pageCount: number;
};

const Archive: NextPage<Props> = ({
  posts,
  coverBlurDataURLs,
  navBarEntries,
  currentPage,
  pageCount,
}: Props) => (
  <CommonLayout navBarEntries={navBarEntries}>
    <PostList posts={posts} coverBlurDataURLs={coverBlurDataURLs} />{" "}
    <Paginate currentPage={currentPage} pageCount={pageCount} />
  </CommonLayout>
);

type Params = {
  page: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths: { params: Params }[] = [];

  const perPage = blogConfig.postsPerArchivePage;
  const numberOfPages = Math.ceil((await getPostSlugs()).length / perPage);

  for (let page = 1; page <= numberOfPages; page += 1) {
    paths.push({ params: { page: page.toString() } });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  let page;
  if (params === undefined) {
    page = 1;
  } else {
    page = parseInt(params?.page, 10);
  }

  const perPage = blogConfig.postsPerArchivePage;

  const allPosts = await getPosts();
  const posts = allPosts.slice(
    (page - 1) * perPage,
    (page - 1) * perPage + perPage
  );

  const coverBlurDataURLs = await Promise.all(
    posts.map((post) =>
      getPlaceholder(
        `public/${(post.frontmatter as unknown as PostFrontmatter).cover_url}`
      )
    )
  );

  const navBarEntries = await getDefaultNavBarEntries();

  const pageCount = Math.ceil((await getPostSlugs()).length / perPage);

  return {
    props: {
      posts,
      coverBlurDataURLs,
      navBarEntries,
      currentPage: page,
      pageCount,
    },
    revalidate: false,
  };
};

export default Archive;
