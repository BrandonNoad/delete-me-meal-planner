import { useMutation, useFlash } from '@redwoodjs/web';
import { navigate, routes } from '@redwoodjs/router';
import RecipeForm from 'src/components/RecipeForm';

export const QUERY = gql`
    query FIND_RECIPE_BY_ID($id: Int!) {
        recipe: recipe(id: $id) {
            id
            teamId
            name
            url
            items
            createdAt
            updatedAt
        }
    }
`;
const UPDATE_RECIPE_MUTATION = gql`
    mutation UpdateRecipeMutation($id: Int!, $input: UpdateRecipeInput!) {
        updateRecipe(id: $id, input: $input) {
            id
            teamId
            name
            url
            items
            createdAt
            updatedAt
        }
    }
`;

export const Loading = () => <div>Loading...</div>;

export const Success = ({ recipe }) => {
    const { addMessage } = useFlash();
    const [updateRecipe, { loading, error }] = useMutation(UPDATE_RECIPE_MUTATION, {
        onCompleted: () => {
            navigate(routes.recipes());
            addMessage('Recipe updated.', { classes: 'rw-flash-success' });
        }
    });

    const onSave = (input, id) => {
        const castInput = Object.assign(input, { teamId: parseInt(input.teamId) });
        updateRecipe({ variables: { id, input: castInput } });
    };

    return (
        <div className="rw-segment">
            <header className="rw-segment-header">
                <h2 className="rw-heading rw-heading-secondary">Edit Recipe {recipe.id}</h2>
            </header>
            <div className="rw-segment-main">
                <RecipeForm recipe={recipe} onSave={onSave} error={error} loading={loading} />
            </div>
        </div>
    );
};
