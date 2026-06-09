/**
 * Utility functions for safely rendering HTML content
 */

/**
 * Sanitize HTML content by removing dangerous scripts and attributes
 * while preserving safe HTML like links, formatting, etc.
 */
export const sanitizeHtml = (html: string): string => {
    if (!html) return '';
    
    // Create a temporary div to parse HTML
    const temp = document.createElement('div');
    temp.innerHTML = html;
    
    // Remove script tags and event handlers
    const scripts = temp.querySelectorAll('script');
    scripts.forEach(script => script.remove());
    
    // Remove event handlers from all elements
    const allElements = temp.querySelectorAll('*');
    allElements.forEach(element => {
        // Remove all event handler attributes
        Array.from(element.attributes).forEach(attr => {
            if (attr.name.startsWith('on')) {
                element.removeAttribute(attr.name);
            }
        });
        
        // Remove potentially dangerous attributes
        element.removeAttribute('onerror');
        element.removeAttribute('onload');
        element.removeAttribute('onclick');
    });
    
    return temp.innerHTML;
};

/**
 * Get HTML content for rendering in React component with dangerouslySetInnerHTML
 * Includes basic styling for rendered HTML
 */
export const getHtmlContent = (html: string): { __html: string } => {
    return {
        __html: sanitizeHtml(html)
    };
};

/**
 * CSS classes for styling rendered HTML content
 */
export const htmlContentClasses = `
    prose prose-sm max-w-none
    [&_a]:text-primary [&_a]:underline hover:[&_a]:text-primary-dark
    [&_a]:transition-colors [&_a]:duration-200
    [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:my-2
    [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:my-2
    [&_li]:my-1 [&_p]:my-2
    [&_strong]:font-bold [&_em]:italic
    [&_code]:bg-neutral-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded
`;
