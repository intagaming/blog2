import Link from "next/link";
import { NavBarEntry } from "types/blog";

type Props = {
  entries?: NavBarEntry[];
};

const NavBar = ({ entries }: Props) => (
  <header>
    <Link href="/">
      <a>Home</a>
    </Link>

    {entries?.map((entry) => (
      <Link key={entry.slug} href={`/${entry.slug}`}>
        <a>{entry.title}</a>
      </Link>
    ))}
  </header>
);

NavBar.defaultProps = {
  entries: [],
};

export default NavBar;
