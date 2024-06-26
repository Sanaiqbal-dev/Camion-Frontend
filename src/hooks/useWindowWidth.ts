import { useEffect, useState } from "react";
const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const windowSizeHandler = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', windowSizeHandler);

    return () => {
      window.removeEventListener('resize', windowSizeHandler);
    };
  }, []);

  return windowWidth;
};

export default useWindowWidth;