import {CollectionI, CursorType, IDType, PageInfoI} from "../models/common";
import {ProductI} from "../models/shopifyEntities";
import {fetchGraphQL} from "./graphqlClient";

interface ShopifyProductsResult {
    collection: {
        products: {
            edges: {
                node: ProductI
            }[],
            pageInfo: PageInfoI
        }
    }
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
    const result = await fetchGraphQL<ShopifyProductsResult>(query, {
            categoryId: id,
            cursor: cursor,
            first: limit
        }
    );

    if (result) {
        const products = result.collection.products;
        return {
            items: products.edges.map(edge => edge.node),
            pageInfo: products.pageInfo,
        };
    }
    return null;
}