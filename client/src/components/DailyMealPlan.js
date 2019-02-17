import React, { useEffect } from 'react';
import Moment from 'moment';
import _ from 'lodash';
import { Box, Heading, Button } from 'grommet';
import List from './List';
import ListItem from './ListItem';
import { ListPlaceholder } from 'grommet-addons';
import { FETCH_SCHEDULED_RECIPES_LIMIT } from '../constants';

const DailyMealPlan = (props) => {
    const { moment, scheduledRecipes, meta, fetchScheduledRecipes } = props;

    useEffect(() => {
        fetchScheduledRecipes(moment);
    }, [moment]);

    // TODO: move the loading indicator inside the tile
    if (
        meta !== undefined &&
        meta.isFetching &&
        (scheduledRecipes === undefined || !scheduledRecipes.length)
    ) {
        return <p>Loading...</p>;
    }

    // TODO: move the error msg inside the tile
    if (
        meta !== undefined &&
        meta.errorMessage &&
        (scheduledRecipes === undefined || !scheduledRecipes.length)
    ) {
        return <p>{meta.errorMessage}</p>;
    }

    return <MealPlan {...props} />;
};

const MealPlan = ({ moment, scheduledRecipes, meta, openAddRecipesModal }) => {
    const isToday = Moment().isSame(moment, 'day');

    let list = <ListPlaceholder emptyMessage="No Recipes!" unfilteredTotal={0} />;

    if (scheduledRecipes !== undefined && scheduledRecipes.length) {
        const NUM_VISIBLE_LIST_ITEMS = 3;

        const numListItems = Math.min(NUM_VISIBLE_LIST_ITEMS, FETCH_SCHEDULED_RECIPES_LIMIT);

        const recipeListItems = _.map(
            scheduledRecipes.slice(0, numListItems),
            (scheduledRecipe) => (
                <ListItem key={scheduledRecipe.id.toString()} pad="none" justify="between">
                    <a href={scheduledRecipe.recipe.url} target="_blank">
                        {scheduledRecipe.recipe.name}
                    </a>
                    <Button
                        onClick={() => console.log('delete recipe')}
                        plain={true}
                        label={<span className="fas fa-times fa-xs" />}
                    />
                </ListItem>
            )
        );

        if (meta !== undefined && meta.totalCount > numListItems) {
            const numAdditionalRecipes = meta.totalCount - numListItems;

            recipeListItems.push(
                <ListItem key="0" pad="none">
                    <a href="" target="_blank">{`+ ${numAdditionalRecipes} more ${
                        numAdditionalRecipes > 1 ? 'recipes' : 'recipe'
                    }!`}</a>
                </ListItem>
            );
        }

        list = <List>{recipeListItems}</List>;
    }

    return (
        <Box
            size={{ width: 'small', height: 'medium' }}
            style={{ border: '1px solid #ddd' }}
            align="start"
            pad="small"
            colorIndex={(isToday && 'grey-4-a') || undefined}
        >
            {/* <Label size="small" uppercase={true} style={{ color: (isToday && '#e6734b') || undefined }}>{moment.format('ddd')}</Label> */}
            <Heading
                tag="h2"
                strong={true}
                margin="small"
                style={{ marginTop: 0, color: (isToday && '#e6734b') || undefined }}
            >
                {moment.format('D')}
            </Heading>
            <Box flex="grow" justify="between" style={{ width: '100%' }}>
                {list}
                <Box direction="row" justify="end">
                    <Button
                        type="button"
                        style={{ float: 'right' }}
                        onClick={() => openAddRecipesModal(moment)}
                        plain={true}
                        label={<span className="fas fa-plus fa-xs" />}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default DailyMealPlan;
