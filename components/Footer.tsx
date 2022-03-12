import blogConfig from "blog.config";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  const { copyright } = blogConfig;

  return (
    <footer className="flex flex-col items-center justify-center py-10 border-t min-h-32">
      <p>Made by An Hoang with ❤️</p>
      <p>
        This <i>personal</i> blog is open source. Check it out.
      </p>

      <div className="flex my-6">
        <a href="https://github.com/intagaming/blog2">
          <FaGithub size={32} />
        </a>
      </div>

      <p>
        ©️ {copyright.from} - {new Date().getFullYear()} {copyright.company}.
        All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
