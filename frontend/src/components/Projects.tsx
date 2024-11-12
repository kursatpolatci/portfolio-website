import { FaGithub, FaLink } from "react-icons/fa";

interface IProject {
  title: string;
  img: string;
  desc: string;
  tags?: string[];
  link: string;
}

interface IProjects {
  [key: string]: IProject[];
}

const Projects = () => {
  const data: IProjects = {
    "C Projects": [
      {
        title: "Push Swap",
        img: "/pushswap.png",
        desc: "Aliquam rutrum, felis vel tempor mollis, sem augue finibus tellus, non pharetra ligula odio vel ante. Nullam massa ipsum, rutrum quis enim eget, lobortis tempor.",
        tags: ["C", "Bash Terminal", "Kali Linux"],
        link: ""
      },
      {
        title: "So Long",
        img: "/so_long.png",
        desc: "Sed interdum, metus sed efficitur commodo, justo sapien finibus augue, at cursus elit dolor sed augue. Pellentesque volutpat nunc eu urna efficitur pharetra. Nullam eget.",
        tags: ["C", "Tester", "MLX"],
        link: ""
      }
    ],
    "Web Projects": [
      {
        title: "Twitter Clone",
        img: "/twitter.png",
        desc: "Aliquam neque magna, commodo sed ornare ac, finibus a est. Morbi id eleifend turpis. Aliquam eu mi leo. Nam eget tortor eget nunc finibus auctor.",
        tags: [
          "Typescript",
          "React",
          "MongoDB",
          "Node.js",
          "Express.js",
          "Tailwind CSS",
          "NPM"
        ],
        link: ""
      },
      {
        title: "Advanced Auth",
        img: "/auth.png",
        desc: "Mauris vel tincidunt sem. In id sagittis nisi. Morbi fringilla auctor molestie. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;.",
        tags: [
          "Typescript",
          "React",
          "MongoDB",
          "Node.js",
          "Express.js",
          "Docker",
          ".NET Core"
        ],
        link: ""
      }
    ]
  };

  return (
    <div className="w-full py-12 flex flex-col gap-12">
      {Object.entries(data).map(([category, projects], index) => {
        return (
          <div key={index} className="">
            <h1 className="text-light-secondary dark:text-dark-secondary font-semibold text-2xl">
              {category}
            </h1>
            <div className="flex flex-row gap-12 pt-4">
              {projects.map((project, index) => {
                return (
                  <div
                    className="flex flex-col max-w-[23rem] cursor-pointer dark:hover:bg-[#18181a] hover:bg-[#fafafa] rounded-t-xl rounded-b-xl overflow-hidden transition-colors duration-300"
                    key={index}
                  >
                    <div>
                      <img src={project.img} className="w-full h-auto"></img>
                    </div>
                    <div className="p-4">
                      <h1 className="dark:text-dark-secondary text-light-secondary text-xl">
                        {project.title}
                      </h1>
                      <p className="dark:text-dark-quaternary text-light-quaternary text-[0.8rem] pt-1">
                        {project.desc}
                      </p>
                      <div className="pt-2 flex flex-row flex-wrap gap-1">
                        {project.tags?.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="dark:text-dark-tertiary dark:bg-dark-fifth text-light-tertiary bg-[#F4F5F5] inline-block p-1 rounded-xl"
                            >
                              <p className="text-[0.7rem]">{item}</p>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex gap-2 pt-4">
                        <FaGithub className="dark:text-dark-fifth text-light-fifth   size-5" />
                        <FaLink className="dark:text-dark-fifth text-light-fifth  size-5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Projects;
