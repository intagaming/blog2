import { ReactNode } from "react";
import { NavBarEntry } from "types/blog";
import NavBar from "./NavBar";

type Props = {
  navBarEntries?: NavBarEntry[];
  children: ReactNode;
};

const CommonLayout = ({ navBarEntries, children }: Props) => (
  <>
    <NavBar entries={navBarEntries} />
    {children}
  </>
);

CommonLayout.defaultProps = {
  navBarEntries: [],
};

export default CommonLayout;
