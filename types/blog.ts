export interface PostOrPageFrontmatter {
  type?: PostFrontmatter["type"] | PageFrontmatter["type"] | unknown;
}

export interface PostFrontmatter extends PostOrPageFrontmatter {
  type: "post";
  title: string;
  slug: string;
  author: string;
  excerpt: string;
  publication_date: string;
}

export interface PageFrontmatter extends PostOrPageFrontmatter {
  type: "page";
  title: string;
}

export type NavBarEntry = {
  slug: string;
  title: string;
};
