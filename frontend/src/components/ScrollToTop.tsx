import { useEffect, useState } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isScrollAvaible, setIsScrollAvaible] = useState<boolean>(false);

  useEffect(() => {
    addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setIsScrollAvaible(true);
      } else {
        setIsScrollAvaible(false);
      }
    });
  }, []);

  const scrollUp = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return (
    <div>
      <FaAngleDoubleUp
        className={`text-white w-7 h-7 fixed right-12 bottom-12 transition-all duration-100 ease-linear ${
          isScrollAvaible ? "opacity-100" : "opacity-0"
        } cursor-pointer`}
        onClick={() => scrollUp()}
      />
    </div>
  );
};

export default ScrollToTop;
