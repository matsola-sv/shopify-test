import {CategoryI} from "../models/shopifyEntities";
import {fetchGraphQL} from "./graphqlClient";

interface ShopifyCategoriesResult {
    collections: {
        edges: {
            node: CategoryI;
        }[]
    }
}

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
    let data = await fetchGraphQL<ShopifyCategoriesResult>(
        query, { limit }
    );

    if (data) {
        return data.collections
            .edges.map(edge => edge.node);
    }
    return [];
}