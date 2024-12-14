import { FaGithub, FaHackerrank, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetIntro } from "../../hooks/IntroHooks";
import { BACKEND_URL } from "../../lib/types/types";
import { IconType } from "react-icons";

const Intro = () => {
  const { data, isLoading } = useGetIntro();
  const icons: { Icon: IconType; to: string }[] = [
    { Icon: FaGithub, to: "https://github.com/kursatpolatci" },
    { Icon: FaHackerrank, to: "https://www.hackerrank.com/profile/kursatpolatci" },
    { Icon: FaInstagram, to: "https://www.instagram.com/kursatpolatci/" },
    { Icon: FaLinkedin, to: "https://www.linkedin.com/in/kursatpolatci/" },
  ];

  if (isLoading) return <></>;
  return (
    <div className="max-md:px-10 px-4">
      <img src={`${BACKEND_URL}/uploads/${data?.intro?.image}`} className="avatar" />
      <div className="flex flex-col gap-5 pt-5">
        <h1>{data?.intro?.name}</h1>
        <p>{data?.intro?.bio}</p>
      </div>
      <div className="py-5 flex gap-4">
        {icons.map((item, id) => {
          return (
            <Link to={item.to} key={id} target="_blank">
              <item.Icon className="icon" />
            </Link>
          );
        })}
      </div>
      <Link to={`${BACKEND_URL}/uploads/${data?.intro?.resume}`} target="_blank">
        <span className="link">View Resume</span>
      </Link>
    </div>
  );
};

export default Intro;
