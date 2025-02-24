import React, { useEffect, useState } from 'react';
import { FlatList } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"

import {
  Container,
  CardContainer,
  CardAddDestack,
  AddTitleCard,
  CardImage,
  TitleCard
} from './style'
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import StoryContainer from '../Story';
import { getDestacks } from '../../Service/Destack';
import { getUserStories } from '../../Service/Story';
import { StoryList } from '../../Types/storyProps';
import { Destacks } from '../../Types/destack';

interface propsDestack {
  addDestack?: boolean
  destacks: Destacks[]
  userId: number
}


export default function DestacksProfile(props: propsDestack) {
  const navigation = useNavigation<StackRoutes>();
  const [destackData, setDestackData] = useState<any[]>([])
  const [allStories, setAllStories] = useState<StoryList[]>()


  const getAllStories = () => {
    getUserStories(props.userId)
      .then(res => setAllStories(res.data))
      .catch((e) => {
        console.warn('GetUserStories - DestacksProfile')
        console.log(e)
      })
  }

  useEffect(() => {
    if (allStories) {
      props.destacks.map((dest, index) => {
        const destacksId = dest.storiesArchiveds.split(",")
        const selectedStories = allStories.filter(destack => destacksId.some(item => item == destack.postHexId))
        selectedStories.length > 0 &&
          setDestackData([...destackData, {
            user_id: props.userId,
            user_image: dest.imageDestack,
            user_name: dest.title,
            stories: selectedStories.map((res, index) => (
              {
                story_id: index,
                story_image: "../Assets/Images/destack_white.png",
                customProps: res
              }))
          }])
      })
    }
  }, [allStories])

  useEffect(() => {
    getAllStories()
  }, [])

  return (
    <Container horizontal={true} showsHorizontalScrollIndicator={false}>
      {props.addDestack && (
        <CardContainer onPress={() => navigation.push('NewDestack')}>
          <CardAddDestack>
            <Ionicons
              name='add-circle'
              size={32}
              color={"#0245F4"}
            />
          </CardAddDestack>
          <AddTitleCard>Novo</AddTitleCard>
        </CardContainer>
      )}

      {destackData.length > 0 && (
        <StoryContainer data={destackData} ImageType='destaqueList' type={props.addDestack ? 'myDestaque' : 'otherDestaque'} />
      )}

      {/*   {allStories?.map((item, index) => (
        <CardContainer key={index + 1}>
          <CardImage source={require('../../mocks/fastAndFuriosCard.jpeg')} />
          <TitleCard>Lorem</TitleCard>
        </CardContainer>
      ))} */}

    </Container>
  );
};
