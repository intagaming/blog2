type BlogConfig = {
  /**
   * Page slugs to show on the navbar. The page title will be rendered on the
   * navbar instead of the slug.
   */
  navbarLinks: string[];
  /**
   * Blog name, for showing the text in various places, i.e. the Home nav link.
   */
  blogName: string;
  /**
   * Number of posts on the home page.
   */
  postsOnHomePage: number;
  /**
   * Number of posts in an archive page, for pagination.
   */
  postsPerArchivePage: number;
  /**
   * URL to the banner image that shows when the home page is shared on social
   * platforms. Can be a remote URL or a relative path from the public/ folder.
   */
  bannerUrl: string;
  /**
   * Blog description to use as the description meta for the blog.
   */
  blogDescription: string;
};

const blogConfig: BlogConfig = {
  navbarLinks: ["about"],
  blogName: "An Hoang",
  postsOnHomePage: 10,
  postsPerArchivePage: 10,
  bannerUrl: "/images/banner.png",
  blogDescription: "I rant universities and document thought process.",
};

export default blogConfig;
