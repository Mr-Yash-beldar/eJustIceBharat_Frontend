import { useMediaQuery } from 'react-responsive';

// Type for the return value of the hook (boolean)
const useIsTab = (): boolean => {
  const isTablet = useMediaQuery({
    minWidth: 768,
    maxWidth: 1223, // Adjusted maxWidth for tablets
  });

  return isTablet;
};

export default useIsTab;
