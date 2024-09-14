import {CursorType, IDType} from "../models/common";
import {CollectionI} from "../models/common";
import {CategoryI, ProductI} from "../models/shopifyEntities";

const API_URL = process.env.REACT_APP_SHOPIFY_API_URL;
const API_TOKEN = process.env.REACT_APP_SHOPIFY_API_TOKEN;

if (!API_URL || !API_TOKEN) {
    throw new Error('API URL and API Token must be defined in the environment variables.');
}

export const fetchGraphQL = async <T>(query: string, variables = {}): Promise<T> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': API_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
    });

    // Check response status
    if (!response.ok) {
        const errorText = await response.text();
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

export const getCategories = async (limit: number = 10): Promise<CategoryI[]> => {
    const query: string = `
        query GetCategories($limit: Int!) {
          collections(first: $limit) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
    `;
    let data = await fetchGraphQL<any>(
        query, { limit }
    );

    if (data) {
        return data.collections.edges;
    }
    return [];
}

export const getProductsByCategory = async (
    id: IDType,
    cursor: CursorType,
    limit: number = 10
): Promise<CollectionI<ProductI> | null> => {

    const query: string = `
        query GetProductsByCategory($categoryId: ID!, $cursor: String, $first: Int!) {
            collection(id: $categoryId) {
                products(first: $first, after: $cursor) {
                edges {
                  node {
                    id
                    title
                    priceRange {
                        minVariantPrice {
                          amount
                          currencyCode
                        }
                    }
                  }
                }
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                  startCursor
                  endCursor
                }
              }  
            }    
        }
    `;
    const data = await fetchGraphQL<any>(query, {
            categoryId: id,
            cursor: cursor,
            first: limit
        }
    );

    if (data) {
        const products = data.collection.products;
        return {
            items: products.edges,
            pageInfo: products.pageInfo,
        };
    }
    return null;
}