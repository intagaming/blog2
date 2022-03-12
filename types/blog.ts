export interface PostOrPageFrontmatterBase {
  type?: PostFrontmatter["type"] | PageFrontmatter["type"];
}

export interface PostFrontmatter extends PostOrPageFrontmatterBase {
  type: "post";
  title: string;
  slug: string;
  authors: string[];
  excerpt: string;
  publication_date: string;
  cover_url: string;
}

export interface PageFrontmatter extends PostOrPageFrontmatterBase {
  type: "page";
  title: string;
  slug: string;
  authors: string[];
  excerpt: string;
  publication_date: string;
}

export type NavBarEntry = {
  slug: string;
  title: string;
};

export type PostOrPageFrontmatter = PostFrontmatter | PageFrontmatter;
