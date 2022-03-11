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
};

const blogConfig: BlogConfig = {
  navbarLinks: ["about"],
  blogName: "An Hoang",
  postsOnHomePage: 10,
  postsPerArchivePage: 10,
};

export default blogConfig;
