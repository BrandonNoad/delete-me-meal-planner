import { isFetching, isCache, errorMessage, numFailures, nextPage, totalCount, getMetaForDate }
        from './meta';
import * as actionTypes from '../../actions/actionTypes';

const date = '2018-07-27';

const fetchScheduledRecipesForDayRequest = () => ({
    type: actionTypes.FETCH_SCHEDULED_RECIPES_FOR_DAY_REQUEST,
    date
});

const nextPageConst = 2;

const totalCountConst = 101;

const fetchScheduledRecipesForDaySuccess = () => ({
    type: actionTypes.FETCH_SCHEDULED_RECIPES_FOR_DAY_SUCCESS,
    date,
    data: [],
    nextPage: nextPageConst,
    totalCount: totalCountConst
});

const errorMsg = 'Error fetching data!';

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

describe('nextPage reducer', () => {

    describe('when the state arg is undefined', () => {

        it('should return the initial state', () => {

            const newState = nextPage(undefined, {});

            expect(newState).toBe(1);
        });
    });

    it('should set the new state to action.nextPage when the action type is FETCH_SCHEDULED_RECIPES_FOR_DAY_SUCCESS', () => {

        let previousState = 1;

        let newState = nextPage(previousState, fetchScheduledRecipesForDaySuccess());

        expect(newState).toBe(nextPageConst);

        previousState = 4;

        newState = nextPage(previousState, fetchScheduledRecipesForDaySuccess());

        expect(newState).toBe(nextPageConst);
    });
});

describe('totalCount reducer', () => {

    describe('when the state arg is undefined', () => {

        it('should return the initial state', () => {

            const newState = totalCount(undefined, {});

            expect(newState).toBe(0);
        });
    });

    it('should set the new state to action.totalCount when the action type is FETCH_SCHEDULED_RECIPES_FOR_DAY_SUCCESS', () => {

        let previousState = 0;

        let newState = totalCount(previousState, fetchScheduledRecipesForDaySuccess());

        expect(newState).toBe(totalCountConst);

        previousState = 50;

        newState = totalCount(previousState, fetchScheduledRecipesForDaySuccess());

        expect(newState).toBe(totalCountConst);
    });
});

describe('getMetaForDate selector', () => {

    describe('when state is undefined', () => {

        it('should return undefined', () => {

            const state = undefined;

            const dayMeta = getMetaForDate(state);

            expect(dayMeta).toBe(undefined);
        });
    });

    describe('when state is not undefined', () => {

        it('should return the metadata', () => {

            const state = {
                meta: {
                    isFetching: false,
                    isCache: false,
                    errorMessage: 'error',
                    numFailures: 2
                },
                data: []
            };

            const dayMeta = getMetaForDate(state);

            expect(dayMeta).toEqual({
                isFetching: false,
                isCache: false,
                errorMessage: 'error',
                numFailures: 2
            });
        });
    });
});
