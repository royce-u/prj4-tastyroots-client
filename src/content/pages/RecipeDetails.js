import React, { useEffect, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom'
import { Button, Checkbox, Container, Divider, Grid, Header, Image, List, Message, Radio } from 'semantic-ui-react'
import RecipeDetailsSnap from '../components/RecipeDetailsSnap'
import ShareWith from '../components/ShareWith'
import RecipeTwist from '../components/RecipeTwist'


const RecipeDetails = props => {
    let [recipeData, setRecipeData] = useState([])
    let [secretMessage, setSecretMessage] = useState('')
    let [userDetails, setUserDetails] = useState(null)
    let [userFamilies, setUserFamilies] = useState([])
    let [sharedWith, setSharedWith] = useState([])
    let [share, setShare] = useState(false)
    let [updateShare, setUpdateShare] = useState(false)
    let [updateTwist, setUpdateTwist] = useState(false)
    let { id } = useParams()
    let [updateTwist, setUpdateTwist] = useState(false)

    //Fetch recipe details
    useEffect(() => {
        //Get the token from local storage
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'recipe/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Response:', response)
                if (!response.ok) {
                    setSecretMessage('Invalid')
                    return
                }
                //if response is good
                response.json()
                    .then(result => {
                        setRecipeData(result)
                        setSharedWith(result.sharedWith)
                        // setPublicState(result.public)
                        console.log(result)
                       
                    })
                    .catch((innErr) => {
                        console.log('Error in RecipeDetails:', innErr)
                        setSecretMessage(innErr)
                    })
            })
            .catch((err) => {
                setSecretMessage(err)
                console.log(err)
            })
            console.log("WHAT HAPPENING WITH UPDATE SHARE", updateShare)
    }, [updateShare,updateTwist])

    //Fetch user details
    useEffect(() => {
        // Get the token from local storage
        let token = localStorage.getItem('boilerToken')
        // Make a call to a protected route
        fetch(process.env.REACT_APP_SERVER_URL + 'profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Response', response)
                // if not a good response
                if (!response.ok) {
                    return
                }
                // If we get a good response, set the user details
                response.json()
                    .then(result => {
                        setUserDetails(result)
                        setUserFamilies(result.families)
                    })
            })
            .catch(err => {
                console.log("Error in profile", err)
            })
            console.log("WHAT HAPPENING WITH UPDATE SHARE 2", updateShare)
    }, [updateShare,updateTwist])

    if (!recipeData.creatorId) {
        return null
    }
    var recipeIngredients = recipeData.ingredients
    var displayIngredients
    if (recipeIngredients) {
        displayIngredients = recipeIngredients.map((i) => {
            return (
                <List>{i.qty} {i.unit} {i.name}</List>
            )
        })
    }
    var steps = recipeData.steps
    var instructions
    if (steps) {
        instructions = steps.map((s) => {
            return (
                <List.Item as="li">{s}</List.Item>
            )
        })
    }
  

    //********************* Recipe Sharing ************************************
    // If the logged in user is the recipe creator, allow sharing with family circles
    //Toggle sharing popup
    var shareRecipe = () => {
        share ? setShare(false) : setShare(true)
        console.log('share is', share)
    }
    console.log('parent state---->', updateTwist)
   

    let defaultImageArr = [
        'https://res.cloudinary.com/tasty-roots/image/upload/v1592157853/tasty-roots/zglx6vph69ix5trog2js.jpg',
        'https://res.cloudinary.com/tasty-roots/image/upload/v1592160517/tasty-roots/vykzrh9lnhk25axpku2j.jpg',
        'https://res.cloudinary.com/tasty-roots/image/upload/v1592161032/tasty-roots/dsajyspmwi63hbrucebz.jpg',
        'https://res.cloudinary.com/tasty-roots/image/upload/v1592161120/tasty-roots/rt4dyiaqxia9shzup9md.jpg',
        'https://res.cloudinary.com/tasty-roots/image/upload/v1592161324/tasty-roots/wphj0nie7cyy56kff9ex.jpg',
        'https://res.cloudinary.com/tasty-roots/image/upload/v1592161406/tasty-roots/zqlmrmadu0fa2edexuwq.png',
        'https://res.cloudinary.com/tasty-roots/image/upload/v1592161777/tasty-roots/tsuzpiavicimssdb7tft.jpg',
        'https://res.cloudinary.com/tasty-roots/image/upload/v1592161929/tasty-roots/drjgcu4xvqs57yxkmaxy.jpg',
        'https://res.cloudinary.com/tasty-roots/image/upload/v1592162398/tasty-roots/lqrazeqnisqlpqpsbdni.jpg',
        'https://res.cloudinary.com/tasty-roots/image/upload/v1592162536/tasty-roots/cijg4nzovudo1tgomooi.jpg'
    ]
    let randoNum = Math.floor(Math.random() * defaultImageArr.length)
    let defaultImg = defaultImageArr[randoNum]
    
    if (!props.user){
        return (
        <Redirect to="/" />
        )
    }
    return (
        <Container>
            <Grid >
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Grid.Row><h1>{recipeData.recipeName}</h1></Grid.Row>
                        <RecipeDetailsSnap recipeData={recipeData} />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        {(!recipeData.pictures || recipeData.pictures.length < 1) ? <Image src={defaultImg} wrapped /> : <Image src={recipeData.pictures[0]} wrapped />}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className="top-spacing" centered>
                    <Divider horizontal />
                    <Button size="tiny" className="btn-outline" as={Link} to={`/recipe/${recipeData._id}/twist`} >Add Twist</Button>
                
                    {(props.user._id === recipeData.creatorId._id) ? <Button onClick={shareRecipe} size="tiny" className="btn-outline">Share Recipe</Button> : null}
                </Grid.Row>
                {share ? <ShareWith share={share} setShare={setShare} recipeData={recipeData} userFamilies={userFamilies}
                    sharedWith={sharedWith} userDetails={userDetails} updateShare={updateShare} 
                    setUpdateShare={setUpdateShare}/> : ''}
                <Divider horizontal />
                <Grid.Row>
                    <Grid.Column width={8}>
                        <h3>Ingredients</h3>
                        {displayIngredients}
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <h3>Instructions</h3>
                        <List as="ol">{instructions}</List>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <RecipeTwist recipeId={recipeData._id} updateTwist={updateTwist} setUpdateTwist={setUpdateTwist}/>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

export default RecipeDetails