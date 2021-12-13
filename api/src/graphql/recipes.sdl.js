// TODO: Fix items
// TODO: How to import types from other sdl files?
export const schema = gql`
    type Recipe {
        id: Int!
        team: Team!
        name: String!
        url: String!
        items: String!
    }

    type Query {
        recipes: [Recipe!]!
        recipe(id: Int!): Recipe
    }

    input CreateRecipeInput {
        teamId: Int!
        name: String!
        url: String!
        items: String!
    }

    input UpdateRecipeInput {
        name: String
        url: String
        items: String
    }

    type Mutation {
        createRecipe(input: CreateRecipeInput!): Recipe!
        updateRecipe(id: Int!, input: UpdateRecipeInput!): Recipe!
        deleteRecipe(id: Int!): Recipe!
    }
`;
