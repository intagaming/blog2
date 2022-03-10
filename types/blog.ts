export interface PostOrPage {
  type?: Post["type"] | Page["type"] | unknown;
}

export interface Post extends PostOrPage {
  type: "post";
  title: string;
  author: string;
}

export interface Page extends PostOrPage {
  type: "page";
  title: string;
}
