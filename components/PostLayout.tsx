import { ReactNode } from "react";
import CommonLayout from "./CommonLayout";

type Props = {
  children: ReactNode;
};

const PostLayout = ({ children }: Props) => (
  <CommonLayout>
    <article className="prose xl:prose-xl">{children}</article>
  </CommonLayout>
);

export default PostLayout;
