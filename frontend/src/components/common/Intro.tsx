import { Link } from "react-router-dom";
import { useGetIntro } from "../../hooks/IntroHooks";
import { uploads } from "../../lib/types/types";
import IntroSkeleton from "../skeletons/IntroSkeleton";
import { IconType } from "react-icons";
import { FaGithub, FaHackerrank, FaInstagram, FaLinkedin } from "react-icons/fa";

const Intro = () => {
  const { data, isLoading } = useGetIntro();
  const Icons: { Icon: IconType; to: string }[] = [
    { Icon: FaGithub, to: "https://github.com/kursatpolatci" },
    { Icon: FaHackerrank, to: "https://www.hackerrank.com/profile/kursatpolatci" },
    { Icon: FaInstagram, to: "https://www.instagram.com/kursatpolatci/" },
    { Icon: FaLinkedin, to: "https://www.linkedin.com/in/kursatpolatci/" },
  ];
  if (isLoading) return <IntroSkeleton />;
  return (
    <div>
      <img src={`${uploads}/${data?.intro?.image}`} className="avatar" alt="profile" />
      <div className="flex flex-col gap-5 pt-5">
        <h1>{data?.intro?.name}</h1>
        <p>{data?.intro?.bio}</p>
        <div className="flex gap-4">
          {Icons?.map((item, id) => {
            return (
              <Link to={item.to} key={id} target="_blank">
                <item.Icon className="icon" />
              </Link>
            );
          })}
        </div>
        {data?.intro?.resume && (
          <Link to={`${uploads}/${data?.intro?.resume}`} target="_blank">
            <span className="link">View Resume</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Intro;
