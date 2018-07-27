import dailyMeta, { isFetching, isCache, errorMessage, numFailures, getDailyMetaForDate }
        from './dailyMeta';
import * as actionTypes from '../../actions/actionTypes';

const date = '2018-07-27';
const errorMsg = 'Error fetching data!';

const fetchScheduledRecipesForDayRequest = () => ({
    type: actionTypes.FETCH_SCHEDULED_RECIPES_FOR_DAY_REQUEST,
    date
});

const fetchScheduledRecipesForDaySuccess = () => ({
    type: actionTypes.FETCH_SCHEDULED_RECIPES_FOR_DAY_SUCCESS,
    date,
    data: []
});

const fetchScheduledRecipesForDayFailure = () => ({
    type: actionTypes.FETCH_SCHEDULED_RECIPES_FOR_DAY_FAILURE,
    date,
    message: errorMsg
});

describe('isFetching reducer', () => {

    describe('when the state arg is undefined', () => {

        it('should return the initial state', () => {

            const newState = isFetching(undefined, {});

            expect(newState).toBe(false);
        });
    });

    it('should set the new state to true when the action type is FETCH_SCHEDULED_RECIPES_FOR_DAY_REQUEST', () => {

        let previousState = false;

        let newState = isFetching(previousState, fetchScheduledRecipesForDayRequest());

        expect(newState).toBe(true);

        previousState = true;

        newState = isFetching(previousState, fetchScheduledRecipesForDayRequest());

        expect(newState).toBe(true);
    });

    it('should set the new state to false when the action type is FETCH_SCHEDULED_RECIPES_FOR_DAY_SUCCESS', () => {

        let previousState = true;

        let newState = isFetching(previousState, fetchScheduledRecipesForDaySuccess());

        expect(newState).toBe(false);

        previousState = false;

        newState = isFetching(previousState, fetchScheduledRecipesForDaySuccess());

        expect(newState).toBe(false);
    });

    it('should set the new state to false when the action type is FETCH_SCHEDULED_RECIPES_FOR_DAY_FAILURE', () => {

        let previousState = true;

        let newState = isFetching(previousState, fetchScheduledRecipesForDayFailure());

        expect(newState).toBe(false);

        previousState = false;

        newState = isFetching(previousState, fetchScheduledRecipesForDayFailure());

        expect(newState).toBe(false);
    });
});

describe('isCache reducer', () => {

    describe('when the state arg is undefined', () => {

        it('should return the initial state', () => {

            const newState = isCache(undefined, {});

            expect(newState).toBe(false);
        });
    });

    it('should set the new state to false when the action type is FETCH_SCHEDULED_RECIPES_FOR_DAY_REQUEST', () => {

        let previousState = false;

        let newState = isCache(previousState, fetchScheduledRecipesForDayRequest());

        expect(newState).toBe(false);

        previousState = true;

        newState = isCache(previousState, fetchScheduledRecipesForDayRequest());

        expect(newState).toBe(false);
    });

    it('should set the new state to true when the action type is FETCH_SCHEDULED_RECIPES_FOR_DAY_SUCCESS', () => {

        let previousState = true;

        let newState = isCache(previousState, fetchScheduledRecipesForDaySuccess());

        expect(newState).toBe(true);

        previousState = false;

        newState = isCache(previousState, fetchScheduledRecipesForDaySuccess());

        expect(newState).toBe(true);
    });
});

describe('errorMessage reducer', () => {

    describe('when the state arg is undefined', () => {

        it('should return the initial state', () => {

            const newState = errorMessage(undefined, {});

            expect(newState).toBe(null);
        });
    });

    it('should set the new state to null when the action type is FETCH_SCHEDULED_RECIPES_FOR_DAY_REQUEST', () => {

        let previousState = null;

        let newState = errorMessage(previousState, fetchScheduledRecipesForDayRequest());

        expect(newState).toBe(null);

        previousState = 'error';

        newState = errorMessage(previousState, fetchScheduledRecipesForDayRequest());

        expect(newState).toBe(null);
    });

    it('should set the new state to false when the action type is FETCH_SCHEDULED_RECIPES_FOR_DAY_SUCCESS', () => {

        let previousState = null;

        let newState = errorMessage(previousState, fetchScheduledRecipesForDaySuccess());

        expect(newState).toBe(null);

        previousState = 'error';

        newState = errorMessage(previousState, fetchScheduledRecipesForDaySuccess());

        expect(newState).toBe(null);
    });

    it('should set the new state to the error msg when the action type is FETCH_SCHEDULED_RECIPES_FOR_DAY_FAILURE', () => {

        let previousState = null;

        let newState = errorMessage(previousState, fetchScheduledRecipesForDayFailure());

        expect(newState).toBe(errorMsg);

        previousState = 'another error msg';

        newState = errorMessage(previousState, fetchScheduledRecipesForDayFailure());

        expect(newState).toBe(errorMsg);
    });
});

describe('numFailures reducer', () => {

    describe('when the state arg is undefined', () => {

        it('should return the initial state', () => {

            const newState = numFailures(undefined, {});

            expect(newState).toBe(0);
        });
    });

    it('should set the new state to 0 when the action type is FETCH_SCHEDULED_RECIPES_FOR_DAY_SUCCESS', () => {

        let previousState = 0;

        let newState = numFailures(previousState, fetchScheduledRecipesForDaySuccess());

        expect(newState).toBe(0);

        previousState = 15;

        newState = numFailures(previousState, fetchScheduledRecipesForDaySuccess());

        expect(newState).toBe(0);
    });

    it('should set the new state to the previous state + 1 when the action type is FETCH_SCHEDULED_RECIPES_FOR_DAY_FAILURE', () => {

        let previousState = 0;

        let newState = numFailures(previousState, fetchScheduledRecipesForDayFailure());

        expect(newState).toBe(1);

        previousState = 5;

        newState = numFailures(previousState, fetchScheduledRecipesForDayFailure());

        expect(newState).toBe(6);
    });
});

describe('dailyMeta reducer', () => {

    describe('when the state arg is undefined', () => {

        it('should return the initial state', () => {

            const newState = dailyMeta(undefined, {});

            expect(newState).toEqual({});
        });
    });

    it('should handle FETCH_SCHEDULED_RECIPES_FOR_DAY_REQUEST', () => {

        let previousState = {};

        let newState = dailyMeta(previousState, fetchScheduledRecipesForDayRequest());

        expect(newState).toEqual({
            [date]: {
                isFetching: true,
                isCache: false,
                errorMessage: null,
                numFailures: 0
            }
        });

        previousState = {
            '2018-08-01': {
                isFetching: false,
                isCache: false,
                errorMessage: 'error',
                numFailures: 3
            }
        };

        newState = dailyMeta(previousState, fetchScheduledRecipesForDayRequest());

        expect(newState).toEqual({
            ...previousState,
            [date]: {
                isFetching: true,
                isCache: false,
                errorMessage: null,
                numFailures: 0
            }
        });

        previousState = {
            [date]: {
                isFetching: false,
                isCache: true,
                errorMessage: null,
                numFailures: 0
            }
        };

        newState = dailyMeta(previousState, fetchScheduledRecipesForDayRequest());

        expect(newState).toEqual({
            [date]: {
                isFetching: true,
                isCache: false,
                errorMessage: null,
                numFailures: 0
            }
        });
    });

    it('should handle FETCH_SCHEDULED_RECIPES_FOR_DAY_SUCCESS', () => {

        let previousState = {};

        let newState = dailyMeta(previousState, fetchScheduledRecipesForDaySuccess());

        expect(newState).toEqual({
            [date]: {
                isFetching: false,
                isCache: true,
                errorMessage: null,
                numFailures: 0
            }
        });

        previousState = {
            '2018-08-01': {
                isFetching: false,
                isCache: false,
                errorMessage: 'error',
                numFailures: 3
            }
        };

        newState = dailyMeta(previousState, fetchScheduledRecipesForDaySuccess());

        expect(newState).toEqual({
            ...previousState,
            [date]: {
                isFetching: false,
                isCache: true,
                errorMessage: null,
                numFailures: 0
            }
        });

        previousState = {
            [date]: {
                isFetching: false,
                isCache: false,
                errorMessage: 'error',
                numFailures: 3
            }
        };

        newState = dailyMeta(previousState, fetchScheduledRecipesForDaySuccess());

        expect(newState).toEqual({
            [date]: {
                isFetching: false,
                isCache: true,
                errorMessage: null,
                numFailures: 0
            }
        });
    });

    it('should handle FETCH_SCHEDULED_RECIPES_FOR_DAY_FAILURE', () => {

        let previousState = {};

        let newState = dailyMeta(previousState, fetchScheduledRecipesForDayFailure());

        expect(newState).toEqual({
            [date]: {
                isFetching: false,
                isCache: false,
                errorMessage: errorMsg,
                numFailures: 1
            }
        });

        previousState = {
            '2018-08-01': {
                isFetching: false,
                isCache: false,
                errorMessage: 'error',
                numFailures: 3
            }
        };

        newState = dailyMeta(previousState, fetchScheduledRecipesForDayFailure());

        expect(newState).toEqual({
            ...previousState,
            [date]: {
                isFetching: false,
                isCache: false,
                errorMessage: errorMsg,
                numFailures: 1
            }
        });

        previousState = {
            [date]: {
                isFetching: false,
                isCache: false,
                errorMessage: 'error',
                numFailures: 3
            }
        };

        newState = dailyMeta(previousState, fetchScheduledRecipesForDayFailure());

        expect(newState).toEqual({
            [date]: {
                isFetching: false,
                isCache: false,
                errorMessage: errorMsg,
                numFailures: 4
            }
        });
    });
});

describe('getDailyMetaForDate selector', () => {

    describe('when there is no metadata for the given date', () => {

        it('should return undefined', () => {

            let state = {};

            const date = '2018-08-01';

            let dayMeta = getDailyMetaForDate(state, date);

            expect(dayMeta).toBe(undefined);

            state = {
                '2018-07-27': {
                    isFetching: false,
                    isCache: true,
                    errorMessage: null,
                    numFailures: 0
                }
            };

            dayMeta = getDailyMetaForDate(state, date);

            expect(dayMeta).toBe(undefined);
        });
    });

    describe('when there exists metadata for the given date', () => {

        it('should return the metadata', () => {

            const date = '2018-08-01';

            const state = {
                '2018-07-27': {
                    isFetching: false,
                    isCache: true,
                    errorMessage: null,
                    numFailures: 0
                },
                [date]: {
                    isFetching: false,
                    isCache: false,
                    errorMessage: 'error',
                    numFailures: 2
                }
            };

            const dayMeta = getDailyMetaForDate(state, date);

            expect(dayMeta).toEqual({
                isFetching: false,
                isCache: false,
                errorMessage: 'error',
                numFailures: 2
            });
        });
    });
});
