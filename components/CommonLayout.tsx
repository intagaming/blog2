import { ReactNode } from "react";
import { NavBarEntry } from "types/blog";
import Footer from "./Footer";
import NavBar from "./NavBar";

type Props = {
  navBarEntries?: NavBarEntry[];
  children: ReactNode;
};

const CommonLayout = ({ navBarEntries, children }: Props) => (
  <div className="flex flex-col min-h-screen dark:bg-neutral-900">
    <NavBar entries={navBarEntries} />
    <div className="flex-1">{children}</div>
    <Footer />
  </div>
);

CommonLayout.defaultProps = {
  navBarEntries: [],
};

export default CommonLayout;
