import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardGroup, Container, Divider, Icon, Image, Header, Grid } from 'semantic-ui-react';
import RecipeAddModal from './RecipeAddModal'
import Moment from 'moment'

const UserRecipes = props => {

    console.log(props.userDetails.recipes)
    
    let recipe = props.userDetails.recipes.map(r => {
        let recipeDate = Moment(r.datePosted).format('MM/DD/YYYY')
        let defaultImg = 'https://res.cloudinary.com/tasty-roots/image/upload/v1592160517/tasty-roots/vykzrh9lnhk25axpku2j.jpg'

        return (
            <Card key={r._id}>
                {(!r.pictures || r.pictures.length < 1) ? <Image src={defaultImg} wrapped /> : <Image src={r.pictures[0]} wrapped/>}
                <Card.Content>
                    <Card.Header as={Link} to={`/recipe/${r._id}`}>{r.recipeName}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{recipeDate}</span>
                    </Card.Meta>
                    <Card.Description>
                        {r.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='user' />Serves {r.servings}
                </Card.Content>
            </Card>
        )
    })

    if (props.userDetails.recipes.length < 1) {
        return (
            <Container className="top-spacing-2" stackable>
                <Grid>
                <Grid.Row>
                    <Grid.Column width={14}>
                        <Header as="h2" dividing>My Recipes</Header>
                    </Grid.Column>
                    <Grid.Column  position="right" width={2}>
                        <RecipeAddModal textAlign="right" userDetails={props.userDetails} updateState = {props.updateState} setUpdateState={props.setUpdateState}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
                <p className="top-spacing">No recipes created yet.</p>
            </Container>
        )
    }
    return (
        <Container className="top-spacing-2">
            <Grid>
                <Grid.Row>
                    <Grid.Column width={14}>
                        <Header as="h2">My Recipes</Header>
                        <Divider />
                    </Grid.Column>
                    <Grid.Column  position="right" width={2}>
                        <RecipeAddModal textAlign="right" userDetails={props.userDetails} updateState = {props.updateState} setUpdateState={props.setUpdateState}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <CardGroup itemsPerRow={4}>
                {recipe}
            </CardGroup>
        </Container>
    )
}

export default UserRecipes