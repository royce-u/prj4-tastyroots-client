import React from 'react';
import { Link } from 'react-router-dom'
import FamilyCircleDetails from '../pages/FamilyCircleDetails'
import {Card, CardGroup, Container, Header, Icon, Image, Segment} from 'semantic-ui-react'
import Moment from 'moment'

const RecipeCards = props => {
    if (!props.familyData.familyRecipes){
        return null
    }
    let recipe = props.familyData.familyRecipes.map((r) => {
        let recipeDate = Moment(r.datePosted).format('MM/DD/YYYY')
        let defaultImg = 'https://res.cloudinary.com/tasty-roots/image/upload/v1592160517/tasty-roots/vykzrh9lnhk25axpku2j.jpg'
        console.log(props.familyData.familyRecipes)
        return (
            <Card key={r._id}>
                {(!r.pictures || r.pictures.length < 1) ? <Image src={defaultImg} wrapped /> : <Image src={r.pictures[0]} wrapped />}
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

    if (props.familyData.familyRecipes.length < 1) {
        return (
            <Container className="top-spacing-2" stackable>
                <Header as="h2" dividing>Family Recipes</Header>
                <p>No recipes created yet.</p>
            </Container>
        )
    }
    return (
        <Container className="top-spacing-2">
            <Header as="h2" dividing>Family Recipes</Header>
            <CardGroup itemsPerRow={4}>
                {recipe}
            </CardGroup>
        </Container>
    )
}

export default RecipeCards


