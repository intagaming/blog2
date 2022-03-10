type BlogConfig = {
  /**
   * Page slugs to show on the navbar. The page title will be rendered on the
   * navbar instead of the slug.
   */
  navbarLinks: string[];
};

const blogConfig: BlogConfig = {
  navbarLinks: ["about"],
};

export default blogConfig;
