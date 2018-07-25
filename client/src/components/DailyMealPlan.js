import React from 'react';
import Moment from 'moment';
import _ from 'lodash';
import { Box, Tile, Label, Heading, List, ListItem, Button } from 'grommet';
import { ListPlaceholder } from 'grommet-addons';

const DailyMealPlan = ({ moment, scheduledRecipes }) => {

    let list = <ListPlaceholder emptyMessage="No Recipes!" unfilteredTotal={0} />;

    if (scheduledRecipes.length) {

        const recipeListItems = _.map(scheduledRecipes, scheduledRecipe => (

            <ListItem key={scheduledRecipe.id.toString()} pad="none" justify="between">
                <a href={scheduledRecipe.recipe.url} target="_blank">{scheduledRecipe.recipe.name}</a>
                <Button onClick={() => console.log('delete recipe')} plain={true} label={<span className="fas fa-times fa-xs"></span>} />
            </ListItem>
        ));

        list = <List>{recipeListItems}</List>;
    }

    return (
        <Tile size={{ width: 'small', height: 'medium' }} style={{ border: '1px solid #ddd' }} align="start" pad="small" colorIndex={Moment().isSame(moment, 'day') && 'grey-4-a'}>
            <Label size="small" uppercase={true}>{moment.format('ddd')}</Label>
            <Heading tag="h2" strong={true} margin="small" style={{ marginTop: 0 }}>{moment.format('D')}</Heading>
            <Box flex="grow" justify="between" style={{ width: '100%' }}>
                {list}
                <Box direction="row" justify="end">
                    <Button type="button" style={{ float: 'right' }} onClick={() => console.log('add recipes')} plain={true} label={<span className="fas fa-plus fa-xs"></span>} />
                </Box>
            </Box>
        </Tile>
    );
};

export default DailyMealPlan;
