import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/** Get current Google Translate language from cookie. Returns 'hi' if Hindi, else 'en'. */
function getGoogleTranslateLang(): 'en' | 'hi' {
    if (typeof document === 'undefined') return 'en';
    const match = document.cookie.match(/googtrans=([^;]+)/);
    const value = match ? decodeURIComponent(match[1]) : '';
    return value === '/en/hi' ? 'hi' : 'en';
}

/** Switch site language via Google Translate (sets cookie and reloads). */
function switchTranslateLang(lang: 'en' | 'hi'): void {
    try {
        // Get current hostname for domain setting
        const hostname = window.location.hostname;
        const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
        
        // Set cookie with proper domain settings
        let cookieString = '';
        if (lang === 'hi') {
            cookieString = `googtrans=/en/hi; path=/; max-age=31536000; SameSite=Lax`;
            if (!isLocalhost && hostname) {
                cookieString += `; domain=${hostname}`;
            }
        } else {
            // Clear the cookie by setting it with past date
            cookieString = `googtrans=; path=/; max-age=0; SameSite=Lax`;
            if (!isLocalhost && hostname) {
                cookieString += `; domain=${hostname}`;
            }
        }
        
        document.cookie = cookieString;
        
        // Store preference in localStorage as backup
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('nivesh_language_preference', lang);
        }
        
        // Reload after a small delay to ensure cookie is set
        setTimeout(() => {
            window.location.reload();
        }, 100);
    } catch (error) {
        console.error('Error switching language:', error);
    }
}

const Navigation: React.FC = () => {
    const BASE_URL = 'https://nivesh.com';
    const LANGUAGE_PREFIX = '/en';
    const navigate = useNavigate();
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [openDropdowns, setOpenDropdowns] = useState<{ [key: number]: boolean }>({});
    
    // Initialize language state with cookie, fallback to localStorage, then default to 'en'
    const [translateLang, setTranslateLang] = useState<'en' | 'hi'>(() => {
        const cookieLang = getGoogleTranslateLang();
        if (cookieLang !== 'en') return cookieLang;
        
        // Fallback to localStorage if cookie is not set
        if (typeof localStorage !== 'undefined') {
            const storedLang = localStorage.getItem('nivesh_language_preference');
            if (storedLang === 'hi' || storedLang === 'en') {
                return storedLang;
            }
        }
        return 'en';
    });

    useEffect(() => {
        setTranslateLang(getGoogleTranslateLang());
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine if scrolled (for background)
            setScrolled(currentScrollY > 20);

            // Determine visibility (hide on scroll down, show on scroll up)
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false); // Scrolling down & past threshold -> Hide
            } else {
                setIsVisible(true);  // Scrolling up or at top -> Show
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = (index: number) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const buildUrl = (path: string): string => {
        // Handle external URLs (already full URLs)
        if (path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        }
        
        // Handle anchor links
        if (path.startsWith('#')) {
            return path;
        }
        
        // Normalize path
        const normalizedPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
        
        // Build full URL with language prefix
        return `${BASE_URL}${LANGUAGE_PREFIX}${normalizedPath}`;
    };

    const handleNavigate = (path: string, isExternal?: boolean) => {
        if (isExternal) {
            window.open(path, '_blank', 'noopener,noreferrer');
            return;
        }
        setIsMenuOpen(false);
        setOpenDropdowns({});
        
        if (path.startsWith('#')) {
            // Handle anchor links (scroll to element on current page)
            const element = document.querySelector(path);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (path === '/about' || path === '/about-us') {
            // Handle About page - use React Router navigation
            navigate('/about');
        } else if (path === '/nivesh-teams') {
            // Handle Nivesh Teams page - use React Router navigation
            navigate('/nivesh-teams');
        } else if (path === '/partner') {
            // Handle Partner page - use React Router navigation
            navigate('/partner');
        } else if (path === '/partner/all-about-amfi-arn-code') {
            // Handle All About AMFI ARN Code page - use React Router navigation
            navigate('/partner/all-about-amfi-arn-code');
        } else if (path === '/partner/become-mutual-fund-distributors') {
            // Handle Become Mutual Fund Distributors page - use React Router navigation
            navigate('/partner/become-mutual-fund-distributors');
        } else if (path === '/partner/grow-your-mutual-fund') {
            // Handle Grow Your Mutual Fund page - use React Router navigation
            navigate('/partner/grow-your-mutual-fund');
        } else if (path === '/for-mfds') {
            // Handle Transform Your Distribution Business (For MFDs) page - use React Router navigation
            navigate('/for-mfds');
        } else if (path === '/products/specialized-investment-fund' || path === '/specialized-investment-fund') {
            // Handle Specialized Investment Fund page - use React Router navigation
            navigate('/products/specialized-investment-fund');
        } else if (path === '/market-linked-debentures') {
            // Handle Market Linked Debentures page - use React Router navigation
            navigate('/market-linked-debentures');
        } else if (path === '/pre-owned-policies') {
            // Handle Pre-Owned Policies page - use React Router navigation
            navigate('/pre-owned-policies');
        } else if (path === '/nism-certification-exam') {
            // Handle NISM Certification Exam page - use React Router navigation
            navigate('/nism-certification-exam');
        } else if (path === '/plan-for-retirement') {
            // Handle Plan for Retirement page - use React Router navigation
            navigate('/plan-for-retirement');
        } else if (path === '/save-for-children') {
            // Handle Save for Children page - use React Router navigation
            navigate('/save-for-children');
        } else if (path === '/save-tax') {
            // Handle Save Tax page - use React Router navigation
            navigate('/save-tax');
        } else if (path === '/build-long-term-wealth') {
            // Handle Build Long Term Wealth page - use React Router navigation
            navigate('/build-long-term-wealth');
        } else if (path === '/gift-city') {
            // Handle Gift City page - use React Router navigation
            navigate('/gift-city');
        } else if (path === '/unlisted-shares') {
            // Handle Unlisted Shares page - use React Router navigation
            navigate('/unlisted-shares');
        } else if (path === '/fixed-deposit') {
            // Handle Fixed Deposit page - use React Router navigation
            navigate('/fixed-deposit');
        } else if (path === '/alternative-investment-fund') {
            // Handle Alternative Investment Fund page - use React Router navigation
            navigate('/alternative-investment-fund');
        } else if (path === '/national-pension-scheme') {
            // Handle National Pension Scheme page - use React Router navigation
            navigate('/national-pension-scheme');
        } else if (path === '/bond') {
            // Handle Bond page - use React Router navigation
            navigate('/bond');
        } else if (path === '/loans/loan-against-securities') {
            // Handle Loan Against Securities page - use React Router navigation
            navigate('/loans/loan-against-securities');
        } else if (path === '/pms') {
            // Handle PMS page - use React Router navigation
            navigate('/pms');
        } else if (path === '/mutual-funds') {
            // Handle Mutual Funds page - use React Router navigation
            navigate('/mutual-funds');
        } else if (path === '/the-nivesh-platform') {
            // Handle The Nivesh Platform page - use React Router navigation
            navigate('/the-nivesh-platform');
        } else if (path === '/testimonials') {
            // Handle Testimonials page - use React Router navigation
            navigate('/testimonials');
        } else if (path === '/') {
            // Handle Home page - use React Router navigation
            navigate('/');
        } else {
            // Handle regular navigation with base URL (external)
            const fullUrl = buildUrl(path);
            window.location.href = fullUrl;
        }
    };

    const menuItems = [
        { name: 'Home', path: '/', external: false },
        { name: 'About Us', path: '/about', external: false },
        {
            name: 'Products',
            path: '/products',
            external: false,
            dropdown: [
                { name: 'Mutual Funds', path: '/mutual-funds', external: false },
                { name: 'Specialized Investment Fund (SIF)', path: '/products/specialized-investment-fund', external: false },
                { name: 'Market Linked Debentures (MLD)', path: '/market-linked-debentures', external: false },
                { name: 'Pre-owned Policies', path: '/pre-owned-policies', external: false },
                { name: 'Gift City', path: '/gift-city', external: false },
                { name: 'Unlisted Shares', path: '/unlisted-shares', external: false },
                { name: 'Fixed Deposit', path: '/fixed-deposit', external: false },
                { name: 'Portfolio Management Services (PMS)', path: '/pms', external: false },
                { name: 'Alternative Investment Fund', path: '/alternative-investment-fund', external: false },
                { name: 'National Pension Scheme', path: '/national-pension-scheme', external: false },
                { name: 'Bond', path: '/bond', external: false },
                { name: 'Loan Against Securities', path: '/loans/loan-against-securities', external: false },
            ],
        },
        {
            name: 'Partner',
            path: '/partner',
            external: false,
            dropdown: [
                { name: 'Be A Nivesh Partner', path: '/partner', external: false },
                { name: 'Become Mutual Fund Distributors', path: '/partner/become-mutual-fund-distributors', external: false },
                { name: 'Transform Your Distribution Business', path: '/for-mfds', external: false },
                { name: 'Grow Your Mutual Fund Business', path: '/partner/grow-your-mutual-fund', external: false },
                { name: 'All About AMFI ARN Code', path: '/partner/all-about-amfi-arn-code', external: false },
                { name: 'NISM Certification Exam', path: '/nism-certification-exam', external: false },
            ],
        },
        {
            name: 'Solutions',
            path: '/solutions',
            external: false,
            dropdown: [
                { name: 'For HR - Nivesh Teams', path: '/nivesh-teams', external: false },
                { name: 'For MFD - The Nivesh Platform', path: '/the-nivesh-platform', external: false },

            ],
        },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 transform 
            ${isVisible ? 'translate-y-0' : '-translate-y-full'}
            ${scrolled ? 'bg-neutral-100 shadow-lg py-2 lg:py-4' : 'bg-neutral-100 lg:bg-transparent py-2 lg:py-6'}`}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            onClick={() => handleNavigate('/')}
                            className="cursor-pointer bg-transparent border-none outline-none p-0"
                        >
                        <img src="/logo.png" alt="Nivesh" className="h-5 sm:h-6 md:h-8" />
                        </button>
                    </div>

                    <div className="hidden lg:flex items-center gap-8">
                        {menuItems.map((item, index) => (
                            <div key={index} className="relative group">
                                <button
                                    onClick={() => !item.dropdown && handleNavigate(item.path, item.external)}
                                    className={`flex items-center gap-1 transition-colors text-sm font-medium py-2 bg-transparent border-none outline-none ${scrolled ? 'text-neutral-700 hover:text-primary' : 'text-neutral-700 hover:text-primary'}`}
                                >
                                    {item.name}
                                    {item.dropdown && (
                                        <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    )}
                                </button>

                                {item.dropdown && (
                                    <div className="absolute top-full left-0 w-56 bg-white rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                                        {item.dropdown.map((subItem, subIndex) => (
                                            <button
                                                key={subIndex}
                                                onClick={() => handleNavigate(subItem.path, subItem.external)}
                                                className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary bg-transparent border-none outline-none"
                                            >
                                                {subItem.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        
                        {/* Eng / Hindi language toggle (Google Translate) */}
                        <div className="flex items-center rounded-lg border border-neutral-300 overflow-hidden bg-white/80">
                            <button
                                type="button"
                                onClick={() => translateLang !== 'en' && switchTranslateLang('en')}
                                className={`px-3 py-1.5 text-xs font-medium transition-colors ${translateLang === 'en' ? 'bg-primary text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
                                aria-label="English"
                            >
                                English
                            </button>
                            <button
                                type="button"
                                onClick={() => translateLang !== 'hi' && switchTranslateLang('hi')}
                                className={`px-3 py-1.5 text-xs font-medium transition-colors border-l border-neutral-300 ${translateLang === 'hi' ? 'bg-primary text-white border-primary' : 'text-neutral-600 hover:bg-neutral-100'}`}
                                aria-label="Hindi"
                            >
                                हिन्दी
                            </button>
                        </div>

                        <a
                            href="https://app.nivesh.com/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-primary text-white rounded-2xl text-sm font-medium hover:bg-primary-dark transition-colors duration-200"
                        >
                            Login/Register
                        </a>
                    </div>

                    <button
                        onClick={toggleMenu}
                        className={`lg:hidden p-2 ${scrolled ? 'text-neutral-900' : 'text-neutral-900'}`}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
                </div>

            {isMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 lg:hidden z-40 bg-black/20"
                        onClick={toggleMenu}
                    />
                    
                    <div className="fixed top-0 right-0 w-2/3 h-screen lg:hidden z-50 bg-gradient-to-b from-white via-neutral-50 to-neutral-100 shadow-2xl overflow-y-auto animate-slide-in-right border-l-2 border-primary/20">
                        <div className="p-6">
                            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 mb-6 -mx-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-neutral-900 font-bold text-lg">Menu</span>
                                    </div>
                                    <button
                                        onClick={toggleMenu}
                                        className="p-2 bg-white rounded-full shadow-md hover:bg-primary hover:text-white transition-all duration-200"
                                        aria-label="Close menu"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                        {menuItems.map((item, index) => (
                                <div key={index} className="mb-2">
                                    <button
                                        onClick={() => {
                                            if (item.dropdown) {
                                                toggleDropdown(index);
                                            } else {
                                                handleNavigate(item.path, item.external);
                                            }
                                        }}
                                        className="flex items-center justify-between w-full text-left text-neutral-800 hover:text-primary hover:bg-primary/5 transition-all duration-200 text-sm font-medium py-3 px-3 rounded-lg border border-transparent hover:border-primary/20 bg-transparent outline-none"
                                >
                                        <span className="font-semibold">{item.name}</span>
                                {item.dropdown && (
                                            <svg
                                                className={`w-4 h-4 transition-transform duration-200 text-primary ${openDropdowns[index] ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        )}
                                    </button>
                                    {item.dropdown && openDropdowns[index] && (
                                        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg my-2 py-2 border border-primary/20 shadow-sm">
                                        {item.dropdown.map((subItem, subIndex) => (
                                                <button
                                                key={subIndex}
                                                    onClick={() => handleNavigate(subItem.path, subItem.external)}
                                                    className="block w-full text-left px-4 py-2.5 text-sm text-neutral-700 hover:text-primary hover:bg-white/50 rounded-md transition-all duration-200 font-medium bg-transparent border-none outline-none"
                                            >
                                                    {subItem.name}
                                                </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                            {/* Eng / Hindi language toggle (mobile) */}
                            <div className="flex items-center rounded-lg border border-neutral-300 overflow-hidden bg-white mt-4">
                                <button
                                    type="button"
                                    onClick={() => translateLang !== 'en' && switchTranslateLang('en')}
                                    className={`flex-1 px-3 py-2.5 text-sm font-medium transition-colors ${translateLang === 'en' ? 'bg-primary text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
                                    aria-label="English"
                                >
                                    Eng
                                </button>
                                <button
                                    type="button"
                                    onClick={() => translateLang !== 'hi' && switchTranslateLang('hi')}
                                    className={`flex-1 px-3 py-2.5 text-sm font-medium transition-colors border-l border-neutral-300 ${translateLang === 'hi' ? 'bg-primary text-white border-primary' : 'text-neutral-600 hover:bg-neutral-100'}`}
                                    aria-label="Hindi"
                                >
                                    Hindi
                                </button>
                            </div>
                            
                            <a
                                href="https://app.nivesh.com/login"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={toggleMenu}
                                className="block mt-6 px-4 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl text-sm font-semibold text-center hover:from-primary-dark hover:to-primary transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                Login/Register
                            </a>
                        </div>
                    </div>
                </>
                )}
        </nav>
    );
};

export default Navigation;
