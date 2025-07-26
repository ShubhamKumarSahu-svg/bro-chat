const Footer = () => {
  return (
    <footer className="footer items-center justify-between px-8 py-6 bg-base-300 text-base-content text-sm flex flex-col sm:flex-row gap-4 sm:gap-0">
      <p className="text-center sm:text-left">
        © {new Date().getFullYear()} Bro Chat. All rights reserved.
      </p>
      <div className="flex gap-4">
        <a
          href="https://github.com/ShubhamKumarSahu-svg/bro-chat"
          target="_blank"
          rel="noopener noreferrer"
          className="link link-hover"
        >
          GitHub
        </a>
        <a href="/about-me" className="link link-hover">
          About Me
        </a>
      </div>
    </footer>
  );
};

export default Footer;
