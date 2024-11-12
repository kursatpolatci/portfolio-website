interface imgSkills {
  text: string;
  img: string;
  colorInvert: boolean;
}

const Skills = () => {
  const skills: imgSkills[] = [
    { text: "Javascript", img: "/js.svg", colorInvert: false },
    { text: "React", img: "/react.svg", colorInvert: false },
    { text: "Node.js", img: "/nodejs.svg", colorInvert: false },
    { text: "Express.js", img: "/express.svg", colorInvert: true },
    { text: "HTML", img: "/html.svg", colorInvert: false },
    { text: "CSS", img: "/css.svg", colorInvert: false },
    { text: "Tailwind CSS", img: "/tailwind.svg", colorInvert: false },
    { text: "C#", img: "/csharp.svg", colorInvert: false },
    { text: "Unity", img: "/unity.svg", colorInvert: true },
  ];
  return (
    <div className="py-12">
      <h1 className="text-light-secondary dark:text-dark-secondary text-2xl mb-6">
        Skills
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
        {skills.map((item, index) => {
          return (
            <div key={index} className="border-dark-fifth flex flex-row p-3 items-center justify-start gap-4">
              <div>
                <img
                  src={item.img}
                  alt={`photo-${index}`}
                  className={`w-12 h-12 object-fit ${item.colorInvert ? "dark:invert" : ""}`}
                />
              </div>
              <div>
                <p className="text-light-secondary dark:text-dark-tertiary">
                  {item.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
