import classNames from "classnames";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { PostFrontmatter } from "types/blog";

type NavCardProps = {
  post?: PostFrontmatter;
  isNext: boolean;
};

const NavCard = ({ post, isNext }: NavCardProps) => (
  <div className="flex-1 max-w-xs">
    {post && (
      <Link href={`/${post.slug}`}>
        <a className="flex flex-col w-full h-full gap-4 p-4 no-underline border rounded-md">
          <div
            className={classNames(
              "flex items-center gap-4",
              isNext ? "justify-end" : undefined
            )}
          >
            {!isNext ? (
              <>
                <FaArrowLeft />
                <span>Last Article</span>
              </>
            ) : (
              <>
                <span>Next Article</span>
                <FaArrowRight />
              </>
            )}
          </div>
          <div className="font-bold">{post.title}</div>
        </a>
      </Link>
    )}
  </div>
);
NavCard.defaultProps = {
  post: undefined,
};

type Props = {
  last?: PostFrontmatter;
  next?: PostFrontmatter;
};

const PostLastNextNav = ({ last, next }: Props) => (
  <div className="flex items-stretch justify-between gap-4 py-8">
    <NavCard isNext={false} post={last} />
    <NavCard isNext post={next} />
  </div>
);

PostLastNextNav.defaultProps = {
  last: undefined,
  next: undefined,
};

export default PostLastNextNav;
