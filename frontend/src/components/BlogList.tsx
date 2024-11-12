import { Link } from "react-router-dom";

interface Item {
    date: string;
    title: string;
    desc: string;
  }
  
  const BlogList = () => {
    const data: Item[] = [
      {
        date: "September 3, 2024",
        title: "In imperdiet augue orci. Nullam suscipit, massa vitae imperdiet tristique.",
        desc: "Vivamus eget laoreet ante. Maecenas accumsan viverra imperdiet. Nunc facilisis arcu a lorem tincidunt bibendum. Donec porttitor risus eget purus dapibus vestibulum ut at erat. Curabitur imperdiet feugiat convallis."
      },
      {
        date: "July 13, 2023 ",
        title: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.",
        desc: "Ut eget pulvinar neque. Aenean faucibus facilisis lorem et vehicula. Nulla suscipit varius consectetur. In ut leo laoreet, blandit quam ac, ultrices ex. Sed a nisi massa. Aenean laoreet lacinia neque vel tincidunt."
      }
    ];
    return (
      <div className="py-12">
        <div className="flex flex-col">
          {data.map((item, id) => {
            return <Link to="/blog/1" key={id}>
              <div className="flex flex-col gap-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 p-4 cursor-pointer">
              <h3 className="text-light-quaternary dark:text-dark-quaternary">{item.date}</h3>
              <h1 className="text-light-secondary dark:text-dark-secondary">{item.title}</h1>
              <p className="text-light-quaternary dark:text-dark-quaternary">{item.desc}</p>
            </div>
            </Link>
          })}
        </div>
      </div>
    );
  };
  
  export default BlogList;
  