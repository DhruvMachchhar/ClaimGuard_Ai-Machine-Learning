import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Global Scroll Restoration Component
 * Automatically resets window scroll to (0, 0) whenever the route pathname changes.
 * Handles in-page anchor links smoothly if a hash (e.g. #results) is present.
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // If there is an in-page anchor hash, attempt to scroll to the target element
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Default for new routes: immediately reset scroll position to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
