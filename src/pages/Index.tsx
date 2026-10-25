import { useCallback, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import Hero from "../components/Hero";
import SelectedWorks from "../components/SelectedWorks";
import Journal from "../components/Journal";
import Explorations from "../components/Explorations";
import Stats from "../components/Stats";
import Contact from "../components/Contact";
import PageTransition from "../components/PageTransition";

// Only show the loader once per browser session
const LOADER_KEY = "portfolio:loaded";

export default function Index() {
  const [isLoading, setIsLoading] = useState(() => {
    try {
      return !sessionStorage.getItem(LOADER_KEY);
    } catch {
      return true;
    }
  });

  const handleComplete = useCallback(() => {
    try {
      sessionStorage.setItem(LOADER_KEY, "1");
    } catch {
      /* ignore */
    }
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleComplete} />}
      <PageTransition>
        <Hero start={!isLoading} />
        <SelectedWorks />
        <Journal />
        <Explorations />
        <Stats />
        <Contact />
      </PageTransition>
    </>
  );
}
