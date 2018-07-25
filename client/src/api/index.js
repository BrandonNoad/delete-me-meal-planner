import Axios from 'axios';

// date needs to be formatted as YYYY-MM-DD
export const fetchScheduledRecipesForDay = date =>
        Axios.get('api/v1.0/scheduledRecipes', { params: { date } });
