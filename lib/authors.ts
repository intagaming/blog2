/* eslint-disable import/prefer-default-export */
import authors, { Author } from "content/authors";

export const getAuthor = (username: string): Author | undefined =>
  authors[username];
