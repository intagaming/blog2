import { ReactNode } from "react";
import { NavBarEntry } from "types/blog";
import CommonLayout from "./CommonLayout";

type Props = {
  navBarEntries?: NavBarEntry[];
  children: ReactNode;
};

const PostOrPageLayout = ({ navBarEntries, children }: Props) => (
  <CommonLayout navBarEntries={navBarEntries}>
    <article className="prose xl:prose-xl mx-auto my-10 md:my-20 px-4 md:px-0">
      {children}
    </article>
  </CommonLayout>
);

PostOrPageLayout.defaultProps = {
  navBarEntries: [],
};

export default PostOrPageLayout;
