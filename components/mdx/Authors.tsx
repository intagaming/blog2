import { Author } from "content/authors";
import AuthorInfo from "./AuthorInfo";

type Props = {
  authors: Author[];
};

const Authors = ({ authors }: Props) => (
  <div>
    {authors.map((author) => (
      <AuthorInfo key={author.username} author={author} />
    ))}
  </div>
);

export default Authors;
