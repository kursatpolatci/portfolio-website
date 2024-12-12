import { FaGithub, FaHackerrank, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetIntro } from "../../hooks/IntroHooks";
import { BACKEND_URL } from "../../lib/types/types";
import { IconType } from "react-icons";

const Intro = () => {
  const icons: { Icon: IconType; to: string }[] = [
    { Icon: FaGithub, to: "https://github.com/kursatpolatci" },
    { Icon: FaHackerrank, to: "https://www.hackerrank.com/profile/kursatpolatci" },
    { Icon: FaInstagram, to: "https://www.instagram.com/kursatpolatci/" },
    { Icon: FaLinkedin, to: "https://www.linkedin.com/in/kursatpolatci/" },
  ];

  const { data, isLoading } = useGetIntro();
  if (isLoading) return <></>;
  return (
    <div className="py-12">
      <div className="w-32 h-32 overflow-hidden rounded-full group">
        <img
          src={`${BACKEND_URL}/uploads/${data?.intro?.image}`}
          className="w-full h-full object-cover scale-125 transition-all duration-300 group-hover:grayscale"
        />
      </div>
      <div className="flex flex-col gap-5 pt-8">
        <h1 className="text-light-secondary dark:text-dark-secondary text-2xl">{data?.intro?.name}</h1>
        <p className="text-light-tertiary dark:text-dark-tertiary">{data?.intro?.bio}</p>
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
      <div>
        <Link
          to={`${BACKEND_URL}/uploads/${data?.intro?.resume}`}
          target="_blank"
          className="text-light-secondary dark:text-dark-secondary underline underline-offset-4"
        >
          View Resume
        </Link>
      </div>
    </div>
  );
};

export default Intro;
