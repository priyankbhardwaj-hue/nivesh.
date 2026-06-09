import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Function to scroll to top using multiple methods
        const scrollToTop = () => {
            try {
                // Method 1: window.scrollTo
                window.scrollTo(0, 0);
                
                // Method 2: window.scrollTo with options
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'auto'
                });
                
                // Method 3: Direct property assignment
                if (document.documentElement) {
                    document.documentElement.scrollTop = 0;
                    document.documentElement.scrollLeft = 0;
                }
                if (document.body) {
                    document.body.scrollTop = 0;
                    document.body.scrollLeft = 0;
                }
                
                // Method 4: Scroll any scrollable containers
                const scrollableElements = document.querySelectorAll('[data-scroll-container]');
                scrollableElements.forEach((el) => {
                    (el as HTMLElement).scrollTop = 0;
                });
            } catch (error) {
                console.error('Error scrolling to top:', error);
            }
        };

        // Immediate scroll
        scrollToTop();

        // Use requestAnimationFrame for next frame
        const rafId = requestAnimationFrame(() => {
            scrollToTop();
        });

        // Also scroll after a small delay to handle any async rendering
        const timeoutId = setTimeout(scrollToTop, 10);

        return () => {
            cancelAnimationFrame(rafId);
            clearTimeout(timeoutId);
        };
    }, [pathname]);

    return null;
};

export default ScrollToTop;
