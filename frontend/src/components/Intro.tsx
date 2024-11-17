import {
  FaGithub,
  FaHackerrank,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetIntro } from "../hooks/IntroHooks";
import { BACKEND_URL, IconLinks } from "../utils/Definations";

const About = () => {
  const icons: IconLinks[] = [
    { Icon: FaGithub, to: "blabla" },
    { Icon: FaHackerrank, to: "blabla" },
    { Icon: FaInstagram, to: "blabla" },
    { Icon: FaLinkedin, to: "blabla" },
  ];

  const { data, isError, error, isLoading } = useGetIntro();

  const intro = data?.intro;
  return (
    <div className="py-12">
      <div className="w-32 h-32 border overflow-hidden rounded-full group">
        <img
          src={`${BACKEND_URL}/uploads/${intro?.profileImg}`}
          className="w-full h-full object-cover scale-125 transition-all duration-300 group-hover:grayscale"
        />
      </div>
      <div className="flex flex-col gap-5 pt-8">
        <h1 className="text-light-secondary dark:text-dark-secondary text-2xl">
          {intro?.fullName}
        </h1>
        {intro?.summary.map((sentence: string, index: number) => {
          return (
            <p
              key={index}
              className="text-light-tertiary dark:text-dark-tertiary"
            >
              {sentence}
            </p>
          );
        })}
      </div>
      <div className="py-6 flex gap-4">
        {icons.map((item, id) => {
          return (
            <Link to={item.to} key={id}>
              <item.Icon
                className="text-light-quaternary dark:text-dark-quaternary hover:text-light-tertiary dark:hover:text-dark-tertiary"
                size={24}
              />
            </Link>
          );
        })}
      </div>
      <div className="">
        <Link
          to={`${BACKEND_URL}/uploads/${intro?.resume}`}
          target="_blank"
          className="text-light-secondary dark:text-dark-secondary underline underline-offset-4"
        >
          View Resume
        </Link>
      </div>
    </div>
  );
};

export default About;
