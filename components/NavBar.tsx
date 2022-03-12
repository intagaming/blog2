import blogConfig from "blog.config";
import useOnClickOutside from "hooks/useOnClickOutside";
import Link from "next/link";
import { useRef, useState } from "react";
import { NavBarEntry } from "types/blog";
import ThemeToggle from "./ThemeToggle";

type Props = {
  entries?: NavBarEntry[];
};

const NavBar = ({ entries }: Props) => {
  const [extend, setExtend] = useState(false);

  const menuRef = useRef(null);

  const handleClickOutsideMenu = () => {
    setExtend(false);
  };

  useOnClickOutside(menuRef, handleClickOutsideMenu);

  return (
    <>
      <nav className="flex items-center h-16 gap-6 px-4 border-b dark:bg-neutral-900">
        <button
          type="button"
          className="flex-1 md:hidden"
          onClick={() => setExtend(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <Link href="/">
          <a className="text-2xl flex-[2] md:flex-1 text-center md:text-left font-bold">
            {blogConfig.blogName}
          </a>
        </Link>

        <div className="hidden md:flex flex-[3] text-lg justify-center">
          {entries?.map((entry) => (
            <Link key={entry.slug} href={`/${entry.slug}`}>
              <a>{entry.title}</a>
            </Link>
          ))}
        </div>

        <div className="flex justify-end flex-1">
          <ThemeToggle />
        </div>
      </nav>

      {extend && (
        <div className="fixed top-0 left-0 z-50 flex flex-col w-full h-full md:hidden">
          <div
            ref={menuRef}
            className="relative w-2/3 h-full bg-white shadow-md dark:bg-neutral-900"
          >
            <button
              type="button"
              className="absolute top-0 right-0 flex gap-2 p-4 m-2"
              onClick={() => setExtend(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>Close</span>
            </button>

            <ul className="flex flex-col justify-center w-full h-full gap-4 px-4 text-2xl">
              <li>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              {entries?.map((entry) => (
                <li key={entry.slug}>
                  <Link href={`/${entry.slug}`}>
                    <a>{entry.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

NavBar.defaultProps = {
  entries: [],
};

export default NavBar;
