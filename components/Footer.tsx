import { FaGithub } from "react-icons/fa";

const Footer = () => (
  <footer className="min-h-32 border-t flex flex-col justify-center items-center py-10">
    <p>Made by An Hoang with ❤️</p>
    <p>
      This <i>personal</i> blog is open source. Check it out.
    </p>

    <div className="flex mt-6">
      <a href="https://github.com/intagaming/blog2">
        <FaGithub size={32} />
      </a>
    </div>
  </footer>
);

export default Footer;
