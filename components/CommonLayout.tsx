import { ReactNode } from "react";
import NavBar from "./NavBar";

type Props = {
  children: ReactNode;
};

const CommonLayout = ({ children }: Props) => (
  <>
    <NavBar />
    {children}
  </>
);

export default CommonLayout;
