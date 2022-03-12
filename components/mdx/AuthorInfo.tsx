import { Author } from "content/authors";

type Props = {
  author: Author;
};

const AuthorInfo = ({ author }: Props) => (
  <>
    <p>
      Written by <b className="font-bold">{author.fullName}</b>
    </p>
    <blockquote className="italic">{author.bio}</blockquote>
  </>
);

export default AuthorInfo;
