import fetch from 'node-fetch';

interface MDNSearchResult {
    mdn_url: string
    score: number
    title: string
    locale: string
    slug: string
    popularity: number
    archived: boolean
    summary: string
    highlight: {
        body: string[]
        title: string[]
    }
}

interface MDNResult {
    documents: MDNSearchResult[]
    metadata: {
        took_ms: number
        total: { value: number, relation: string }
        size: number
        page: 1
    }
    suggestions: string[]
}

interface MDNError {
    errors: {
        [key: string]: {
            message: string
            code: string
        }[]
    }
}

const defaultOpts = {
    locale: 'en-US'
}

/**
 * Fetch results from MDN's official API!
 * @example
 * // Search for "fetch", locale defaults to 'en-US'
 * const results = await fetchMDN('fetch');
 * 
 * @example
 * // Use a different locale
 * const results = await fetchMDN('fetch', { locale: 'es' });
 */
export const fetchMDN = async (q: string, opts = defaultOpts) => {
    if (typeof q !== 'string' || q.trim().length === 0)
        throw new RangeError(`Expected query type "string", got "${typeof q}"!`);

    q = encodeURIComponent(q.replace(/\s/g, '+'));

    const r = await fetch(`https://developer.mozilla.org/api/v1/search/${opts.locale}?q=${q}`);
    const j = await r.json() as MDNResult | MDNError;

    return j;
}