import { useTheme } from "next-themes";
import { CSSProperties, useEffect, useState } from "react";
import { animated, config, useTransition } from "react-spring";

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const transition = useTransition<string, CSSProperties>(resolvedTheme, {
    from: { position: "absolute", transform: "scale(1.5)", opacity: 0 },
    enter: { transform: "scale(1)", opacity: 1 },
    leave: { transform: "scale(0.5)", opacity: 0 },
    config: { ...config.molasses, duration: 300 },
  });

  const [mounted, setMounted] = useState(false);
  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleClick = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <button
      className="relative flex items-center justify-center w-12 h-12"
      type="button"
      onClick={handleClick}
    >
      {transition((styles, theme) => (
        <>
          {theme === "light" && (
            <animated.svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              style={styles}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </animated.svg>
          )}
          {theme === "dark" && (
            <animated.svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              style={styles}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </animated.svg>
          )}
        </>
      ))}
    </button>
  );
};

export default ThemeToggle;
