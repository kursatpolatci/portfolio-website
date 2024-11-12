import {
  FaGithub,
  FaHackerrank,
  FaInstagram,
  FaLinkedin
} from "react-icons/fa";
import { Link } from "react-router-dom";

interface IconLinks {
  Icon: React.ComponentType<{ className: string; size: number }>;
  to: string;
}

const About = () => {
  const icons: IconLinks[] = [
    { Icon: FaGithub, to: "blabla" },
    { Icon: FaHackerrank, to: "blabla" },
    { Icon: FaInstagram, to: "blabla" },
    { Icon: FaLinkedin, to: "blabla" }
  ];
  return (
    <div className="py-12">
      <div className="w-32 h-32 border overflow-hidden rounded-full group">
        <img
          src="/vesikalik.png"
          className="w-full h-full object-cover scale-125 transition-all duration-300 group-hover:grayscale"
        />
      </div>
      <div className="flex flex-col gap-5 pt-8">
        <h1 className="text-light-secondary dark:text-dark-secondary text-2xl">
          Kürşat Polatcı
        </h1>
        <p className="text-light-tertiary dark:text-dark-tertiary">
          Aenean consequat velit magna. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia curae; Vestibulum risus purus,
          tempor nec lacus vel, imperdiet.
        </p>
        <p className="text-light-tertiary dark:text-dark-tertiary">
          Fusce ut lacinia lorem, non posuere risus. Sed iaculis mauris et augue
          varius, sit amet tincidunt ipsum dapibus. Quisque at aliquet nulla.
          Fusce et arcu blandit, sagittis ligula tempus, iaculis tortor. Sed
          scelerisque semper lacus.
        </p>
        <p className="text-light-tertiary dark:text-dark-tertiary">
          If you'd like to collaborate, please{" "}
          <Link to="" className="underline underline-offset-4">
            send me an email
          </Link>{" "}
          or reach out on any of my social handles.
        </p>
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
          to=""
          className="text-light-secondary dark:text-dark-secondary underline underline-offset-4"
        >
          View Resume
        </Link>
      </div>
    </div>
  );
};

export default About;
