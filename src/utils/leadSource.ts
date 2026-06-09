/**
 * Builds the lead source string sent with form submissions.
 * Format: website_organic_<PageName> (e.g. website_organic_MutualFund, website_organic_Partner).
 */
export function getLeadSource(pageSource: string): string {
    const normalized = pageSource
        .trim()
        .split(/\s+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
    const result = `website_organic_${normalized}`;
    return result;
}
