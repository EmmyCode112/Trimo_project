import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component
 * 
 * This component uses the useLocation hook to detect route changes
 * and automatically scrolls the window to the top whenever the route changes.
 * 
 * Place this component inside your Router but outside your Routes.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);

  // This component doesn't render anything
  return null;
};

export default ScrollToTop; 