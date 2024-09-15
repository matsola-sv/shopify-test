import {CategoryI} from "../models/shopifyEntities";
import {fetchGraphQL} from "./graphqlClient";

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
