import { parseDate } from "lib/helpers";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";
import { PostFrontmatter } from "types/blog";

type Props = {
  post: MDXRemoteSerializeResult;
};

const PostCard = ({ post }: Props) => {
  const fm = post.frontmatter as unknown as PostFrontmatter;

  return (
    <Link href={`/${fm.slug}`}>
      <a>
        <article>
          <h2>{fm.title}</h2>
          <p>{fm.excerpt}</p>
          <p>
            By {fm.author} on{" "}
            {parseDate(fm.publication_date).toLocaleDateString()}
          </p>
        </article>
      </a>
    </Link>
  );
};

export default PostCard;
