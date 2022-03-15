import { useEffect } from "react";

const useStyle = (stylePath: string) => {
  useEffect(() => {
    const { head } = document;
    const link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = stylePath;

    head.appendChild(link);

    return () => {
      head.removeChild(link);
    };
  }, [stylePath]);
};

export default useStyle;
