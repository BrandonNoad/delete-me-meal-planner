import groupedByDate, { getScheduledRecipesForDate } from './groupedByDate';
import * as actionTypes from '../../actions/actionTypes';

describe('groupedByDate reducer', () => {

    describe('when the state arg is undefined', () => {

        it('should return the initial state', () => {

            const newState = groupedByDate(undefined, {});

            expect(newState).toEqual({});
        });
    });

    describe('when the action type is FETCH_SCHEDULED_RECIPES_FOR_DAY_SUCCESS', () => {

        const date = '2018-07-27';

        const fetchScheduledRecipesSuccess = (data) => ({
            type: actionTypes.FETCH_SCHEDULED_RECIPES_FOR_DAY_SUCCESS,
            date,
            data
        });

        describe('when the previous state does not have data for the day', () => {

            const previousState = {};

            it('should return a new state object that includes the data for the day', () => {

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

                const newState = groupedByDate(previousState, fetchScheduledRecipesSuccess(data));

                const expectedNewState = {
                    [date]: data
                };

                expect(newState).toEqual(expectedNewState);
            });
        });

        describe('when the previous state has data for the day', () => {

            const previousState = {
                '2018-07-01': [],
                [date]: [
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

            it('should overwrite the existing data', () => {

                const data = [
                    ...previousState[date],
                    {
                        id: 89,
                        dateScheduled: date,
                        recipe: {
                            id: 1,
                            name: 'recipe3',
                            url: 'www.recipe3.com'
                        }
                    }
                ];

                const newState = groupedByDate(previousState, fetchScheduledRecipesSuccess(data));

                const expectedNewState = {
                    '2018-07-01': [],
                    [date]: data
                };

                expect(newState).toEqual(expectedNewState);
            });
        });
    });
});

describe('getScheduledRecipesForDate selector', () => {

    describe('when there is no entry for the given date', () => {

        it('should return an empty array', () => {

            let state = {};

            const date = '2018-08-01';

            let scheduledRecipes = getScheduledRecipesForDate(state, date);

            expect(scheduledRecipes).toEqual([]);

            state = {
                '2018-07-27': [
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

            scheduledRecipes = getScheduledRecipesForDate(state, date);

            expect(scheduledRecipes).toEqual([]);
        });
    });

    describe('when there exists an entry for the given date', () => {

        it('should return the value', () => {

            const date = '2018-08-01';

            let state = {
                [date]: []
            };

            let scheduledRecipes = getScheduledRecipesForDate(state, date);

            expect(scheduledRecipes).toEqual([]);

            state = {
                '2018-07-27': [],
                [date]: [
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

            scheduledRecipes = getScheduledRecipesForDate(state, date);

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
