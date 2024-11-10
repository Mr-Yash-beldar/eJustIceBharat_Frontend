import { useState, useEffect } from 'react';

// Define a type for the window size object
interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

// Hook
export default function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add the resize event listener
    window.addEventListener('resize', handleResize);

    // Call the resize handler once to set the initial size
    handleResize();

    // Clean up the event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array to run only on mount/unmount

  return windowSize;
}
