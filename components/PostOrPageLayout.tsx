import { ReactNode } from "react";
import { NavBarEntry } from "types/blog";
import CommonLayout from "./CommonLayout";

type Props = {
  navBarEntries?: NavBarEntry[];
  children: ReactNode;
};

const PostOrPageLayout = ({ navBarEntries, children }: Props) => (
  <CommonLayout navBarEntries={navBarEntries}>
    <article className="px-4 mx-auto my-10 prose dark:prose-invert xl:prose-xl md:my-20 md:px-0">
      {children}
    </article>
  </CommonLayout>
);

PostOrPageLayout.defaultProps = {
  navBarEntries: [],
};

export default PostOrPageLayout;
