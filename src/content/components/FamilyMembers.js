import React from 'react';
import { Container, List, Header, Image } from 'semantic-ui-react';

const FamilyMembers = props => {

    if (!props.familyData.members) {
        return null
    }

    //map through data to render family member profile pic & name
    let members = props.familyData.members.map((m) => {
        let memberPic
        if (!m.picture){
            memberPic = 'https://res.cloudinary.com/tasty-roots/image/upload/v1592180109/tasty-roots/w3ptru2tsjlosw7rfyi9.jpg'
        }
        else {
            memberPic = m.picture
        }
        return(

        <List.Item key={m._id} >
           <Image src={memberPic} circular size="tiny"></Image>
           <Header textAlign="center" as="h4">{m.firstname}</Header>
        </List.Item>
        )
    })
    //null check to get creatorId object
    if (!props.familyData.creatorId){
        return null
    }

    //if creator does not have pic, display placeholder image (creator of family is not listed in members, must render image and name separately)
    let creatorPic
    if (!props.familyData.creatorId.picture){
        creatorPic = 'https://res.cloudinary.com/tasty-roots/image/upload/v1592180109/tasty-roots/w3ptru2tsjlosw7rfyi9.jpg'
    }
    else {
        creatorPic = props.familyData.creatorId.picture
    }

    return (

        <Container>
        <List horizontal>
        <List.Item>
                    <Image src={creatorPic} circular size="tiny"/>
                    <Header textAlign="center" as="h4">{props.familyData.creatorId.firstname}</Header>
                    </List.Item>
            {members}
        </List>
        </Container>
    )
}

export default FamilyMembers