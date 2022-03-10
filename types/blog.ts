export interface PostOrPageFrontmatter {
  type?: PostFrontmatter["type"] | PageFrontmatter["type"] | unknown;
}

export interface PostFrontmatter extends PostOrPageFrontmatter {
  type: "post";
  title: string;
  author: string;
}

export interface PageFrontmatter extends PostOrPageFrontmatter {
  type: "page";
  title: string;
}

export type NavBarEntry = {
  slug: string;
  title: string;
};
