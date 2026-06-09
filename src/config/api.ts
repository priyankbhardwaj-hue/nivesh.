// API Base URLs Configuration
const _env = typeof import.meta !== 'undefined' ? (import.meta as { env?: { VITE_API_BASE_URL?: string; VITE_LEAD_PARTNER_API_URL?: string } }).env : undefined;
export const API_BASE_URL = _env?.VITE_API_BASE_URL || 'http://127.0.0.1:8000/';
export const API_BASE_URL1 = API_BASE_URL; // Primary API base URL
export const API_BASE_URL2 = ''; // Secondary API base URL (if needed in future)

// Lead Partner form submission (set VITE_LEAD_PARTNER_API_URL in .env if you get 404)
export const API_LEAD_PARTNER = _env?.VITE_LEAD_PARTNER_API_URL || 'https://api.nivesh.com/API/WebAddLeadPartner';

export const PARTNER_ONBOARDING_URL = 'https://app.nivesh.com/partner_onboarding/sign_in';

// Contact / lead form (product pages modal)
export const API_WEB_ADD_LEAD = 'https://api.nivesh.com/api/webaddlead';

// API Endpoints
export const API_ENDPOINTS = {
    CAREERS: 'dashboard/api/careers/',
    CAREER_DETAIL: 'dashboard/api/careers/',
    CAREER_APPLICATIONS: 'dashboard/api/career-applications/',
    TESTIMONIALS: 'dashboard/api/testimonials/',
    FAQS: 'dashboard/api/faqs/',
    STATISTICS: 'dashboard/api/statistics/',
    BANNERS: 'dashboard/api/banners/',
    BLOGS: 'dashboard/api/blogs/',
    BLOG_CATEGORIES: 'dashboard/api/blog-categories/',
    NFOS: 'dashboard/api/nfos/',
    FUND_CATEGORIES: 'fund/api/category-choices/',
};

// Helper function to build full API URL
export const buildApiUrl = (endpoint: string, baseUrl: string = API_BASE_URL1): string => {
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    return `${normalizedBaseUrl}${normalizedEndpoint}`;
};

