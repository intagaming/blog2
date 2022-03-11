import blogConfig from "blog.config";
import useOnClickOutside from "hooks/useOnClickOutside";
import Link from "next/link";
import { useRef, useState } from "react";
import { NavBarEntry } from "types/blog";

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
      <nav className="flex items-center h-16 px-4 shadow-sm gap-6">
        <button
          type="button"
          className="flex-1 md:hidden"
          onClick={() => setExtend(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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

        <div className="flex-1 md:hidden" />

        <div className="flex-1 hidden md:flex justify-end">
          <button type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>
        </div>
      </nav>

      {extend && (
        <div className="md:hidden fixed top-0 left-0 w-full h-full shadow-md z-50 flex flex-col">
          <div ref={menuRef} className="relative bg-white h-full w-2/3">
            <button
              type="button"
              className="absolute top-0 right-0 p-4 m-2 flex gap-2"
              onClick={() => setExtend(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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

            <ul className="w-full h-full flex flex-col justify-center px-4 text-2xl gap-4">
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
