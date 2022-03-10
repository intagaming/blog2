import { ReactNode } from "react";
import { NavBarEntry } from "types/blog";
import CommonLayout from "./CommonLayout";

type Props = {
  navBarEntries?: NavBarEntry[];
  children: ReactNode;
};

const PageLayout = ({ navBarEntries, children }: Props) => (
  <CommonLayout navBarEntries={navBarEntries}>
    <article className="prose xl:prose-xl">{children}</article>
  </CommonLayout>
);

PageLayout.defaultProps = {
  navBarEntries: [],
};

export default PageLayout;
