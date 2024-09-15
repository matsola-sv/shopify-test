import {CollectionI, CursorType, IDType} from "../models/common";
import {ProductI} from "../models/shopifyEntities";
import {fetchGraphQL} from "./graphqlClient";

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