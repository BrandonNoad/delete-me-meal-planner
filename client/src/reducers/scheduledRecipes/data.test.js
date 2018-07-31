import dataReducer, { getScheduledRecipesForDate } from './data';
import * as actionTypes from '../../actions/actionTypes';

describe('data reducer', () => {

    describe('when the state arg is undefined', () => {

        it('should return the initial state', () => {

            const newState = dataReducer(undefined, {});

            expect(newState).toEqual([]);
        });
    });

    describe('when the action type is FETCH_SCHEDULED_RECIPES_FOR_DAY_SUCCESS', () => {

        const date = '2018-07-27';

        const fetchScheduledRecipesSuccess = (data) => ({
            type: actionTypes.FETCH_SCHEDULED_RECIPES_FOR_DAY_SUCCESS,
            date,
            data
        });

        it('should return the data for the day', () => {

            const previousState = [];

            const data = [
                {
                    id: 42,
                    dateScheduled: date,
                    recipe: { id: 99, name: 'recipe', url: 'www.recipe.com' }
                },
                {
                    id: 43,
                    dateScheduled: date,
                    recipe: { id: 21, name: 'recipe2', url: 'www.recipe2.com' }
                }
            ];

            const newState = dataReducer(previousState, fetchScheduledRecipesSuccess(data));

            const expectedNewState = data;

            expect(newState).toEqual(expectedNewState);
        });
    });
});

describe('getScheduledRecipesForDate selector', () => {

    describe('when the state is undefined', () => {

        const state = undefined;

        it('should return undefined', () => {

            const scheduledRecipes = getScheduledRecipesForDate(state);

            expect(scheduledRecipes).toBe(undefined);
        });
    });

    describe('when the state is not undefined', () => {

        const date = '2018-08-01';

        const state = {
            meta: {
                isFetching: false,
                isCache: false,
                errorMessage: 'error',
                numFailures: 2
            },
            data: [
                {
                    id: 42,
                    dateScheduled: date,
                    recipe: { id: 99, name: 'recipe', url: 'www.recipe.com' }
                },
                {
                    id: 43,
                    dateScheduled: date,
                    recipe: { id: 21, name: 'recipe2', url: 'www.recipe2.com' }
                }
            ]
        };

        it('should return the data', () => {

            const scheduledRecipes = getScheduledRecipesForDate(state);

            expect(scheduledRecipes).toEqual([
                {
                    id: 42,
                    dateScheduled: date,
                    recipe: { id: 99, name: 'recipe', url: 'www.recipe.com' }
                },
                {
                    id: 43,
                    dateScheduled: date,
                    recipe: { id: 21, name: 'recipe2', url: 'www.recipe2.com' }
                }
            ]);
        });
    });
});
