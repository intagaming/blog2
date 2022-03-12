import { getAuthor } from "lib/authors";
import { parseDate } from "lib/helpers";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import Image from "next/image";
import Link from "next/link";
import { PostFrontmatter } from "types/blog";

type Props = {
  post: MDXRemoteSerializeResult;
  coverBlurDataURL: string;
};

const PostCard = ({ post, coverBlurDataURL }: Props) => {
  const fm = post.frontmatter as unknown as PostFrontmatter;

  const authors = fm.authors.map((author) => getAuthor(author));
  const authorsString = authors.map((author) => author?.fullName).join(", ");

  return (
    <Link href={`/${fm.slug}`}>
      <a>
        <article className="flex flex-col gap-4 md:flex-row md:gap-10">
          <div className="md:flex-1">
            <div className="relative aspect-w-16 aspect-h-9">
              <Image
                className="object-cover rounded-sm"
                src={fm.cover_url}
                layout="fill"
                placeholder="blur"
                blurDataURL={coverBlurDataURL}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-1">
            <h2 className="text-2xl font-bold md:text-3xl">{fm.title}</h2>
            <p className="text-neutral-700 dark:text-neutral-400">
              {fm.excerpt}
            </p>
            <p className="text-neutral-700 dark:text-neutral-400">
              By {authorsString} on{" "}
              {parseDate(fm.publication_date).toLocaleDateString()}
            </p>
          </div>
        </article>
      </a>
    </Link>
  );
};

export default PostCard;
