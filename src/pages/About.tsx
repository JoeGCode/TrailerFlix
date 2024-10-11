import AboutQuestion from "../components/AboutQuestion";

import tmdbLogo from "../assets/images/tmdb_logo.svg";

const About = () => {
  return (
    <div className="text-white flex flex-col items-center justify-center px-16">
      <AboutQuestion question="What is this site?">
        This is a hobby project, built using{" "}
        <a
          className="underline"
          href="https://react.dev/"
          target="_blank"
          rel="noreferrer"
        >
          React
        </a>{" "}
        and{" "}
        <a
          href="https://tailwindcss.com/"
          className="underline"
          target="_blank"
          rel="noreferrer"
        >
          TailwindCSS
        </a>
        .
        <br />
        The basic idea is to create a Netflix-style UI for viewing film
        trailers.
      </AboutQuestion>
      <AboutQuestion question="Where does the data come from?">
        <div className="flex">
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
            className="flex-1"
          >
            <img
              src={tmdbLogo}
              alt="The Movie Database Logo"
              className="h-full w-full"
            />
          </a>
          <div className="ml-4 flex-[4] md:flex-[5]">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </div>
        </div>
      </AboutQuestion>
      <AboutQuestion question="Will you improve the site and add more features?">
        Yes, I already have some things I want to add and improve already.
      </AboutQuestion>
    </div>
  );
};

export default About;
