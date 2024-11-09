import { useMediaQuery } from "react-responsive";

// Define the function with proper type annotations
const useIsMobile = (maxWidth: number = 767): boolean => {
  const isMobile = useMediaQuery({ maxWidth });
  return isMobile;
};

export default useIsMobile;
