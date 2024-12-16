import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useThemeContext } from "../../ThemeContext";

const LoadingSpinner = () => {
  const { theme } = useThemeContext();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center animate-spin">
        <AiOutlineLoading3Quarters color={theme === "dark" ? "white" : "black"} className="size-16" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
