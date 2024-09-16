const API_URL = process.env.REACT_APP_SHOPIFY_API_URL;
const API_TOKEN = process.env.REACT_APP_SHOPIFY_API_TOKEN;

// Validate API_URL and API_TOKEN early to avoid runtime errors in all requests
if (!API_URL || !API_TOKEN) {
    throw new Error(
        'API URL and API Token must be defined in the environment variables.'
    );
}

export const fetchGraphQL = async <T>(query: string, variables = {}): Promise<T> => {
    const response: Response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': API_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
        const errorText: string = await response.text();
        console.error(`HTTP error ${response.status}: ${errorText}`);
        throw new Error(`Failed to fetch from Shopify API: ${errorText}`);
    }

    const { data, errors } = await response.json();

    if (errors) {
        console.error(errors);
        throw new Error('Failed to fetch from Shopify API');
    }
    return data;
};
