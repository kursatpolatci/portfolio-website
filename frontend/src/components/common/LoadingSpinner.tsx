import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useThemeContext } from '../../ThemeContext';

const LoadingSpinner = () => {
  const { theme } = useThemeContext();
  return (
    <div className="flex items-center justify-center h-screen">
      <AiOutlineLoading3Quarters
        color={theme === 'dark' ? 'white' : 'black'}
        className="size-16 max-md:size-12 animate-spin"
      />
    </div>
  );
};

export default LoadingSpinner;
