import Moment from 'moment';
import { moment } from './addRecipesModal';
import { openAddRecipesModal, closeAddRecipesModal } from '../../actions';

describe('moment reducer', () => {

    describe('when the state arg is undefined', () => {

        it('should return the initial state', () => {

            const newState = moment(undefined, {});

            expect(newState).toBe(null);
        });
    });

    it('should set the new state to null when the action type is CLOSE_ADD_RECIPES_MODAL', () => {

        let previousState = null;

        let newState = moment(previousState, closeAddRecipesModal());

        expect(newState).toBe(null);

        previousState = Moment();

        newState = moment(previousState, closeAddRecipesModal());

        expect(newState).toBe(null);
    });

    it('should set the new state to action.moment when the action type is OPEN_ADD_RECIPES_MODAL', () => {

        let previousState = null;

        const moment1 = Moment();

        let newState = moment(previousState, openAddRecipesModal(moment1));

        expect(newState).toBe(moment1);

        previousState = newState;

        const moment2 = Moment(moment1).add(7, 'days');

        newState = moment(previousState, openAddRecipesModal(moment2));

        expect(newState).toBe(moment2);
    });
});
