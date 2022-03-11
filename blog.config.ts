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
};

const blogConfig: BlogConfig = {
  navbarLinks: ["about"],
  blogName: "An Hoang",
};

export default blogConfig;
