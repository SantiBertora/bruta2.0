import React, { useState, useEffect } from "react";
import HomeMobile from "../components/HomeMobile";
import HomeDesktop from "../components/HomeDesktop";

const Home = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 992);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop ? <HomeDesktop /> : <HomeMobile />;
};

export default Home;
