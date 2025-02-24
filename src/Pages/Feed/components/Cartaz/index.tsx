import React from 'react';
import { Image, View, FlatList } from 'react-native';
import {
  Title,
  CartazContainer,
  StoryRow,
  UserName,
  Container,
  StoryButton,
  AddButton,
  UserNameContainer,
  ProfilePictureContainer,
  StoryText,
} from './style';

import { StackRoutes } from '../../../../Routes/StackTypes';
import { useNavigation } from '@react-navigation/native';

import UserImageStories from '../../../../Components/UserImageStories';

import { gethiddenStoryPerson } from '../../../../Service/Story';

import useStories from '../../../../GlobalState/stories.zustand';
import useUserProfile from '../../../../GlobalState/userProfile.zustand';
import { useEffect, useState } from 'react';
import { DropUsersList } from '../../../../Types/drop.type';

export default function StoryList() {
  const { friendsStories, hasStory, viewStories, setHasStory } = useStories();
  const navigation = useNavigation<StackRoutes>();

  const [hiddenPersons, setHiddenPersons] = useState<number[]>([]);

  const [storyUsers] = useState<DropUsersList[]>([]);

  const { user } = useUserProfile();

  // const getPersonHidden = async () => {
  //   await gethiddenStoryPerson().then(res => {
  //     setHiddenPersons(res?.data.response.usuarios[0].hiddenStoryUsers);
  //   });
  // };

  // useEffect(() => {
  //   // getUserStories(user.userId)
  //   //   .then(res => {
  //   //     setStoryUsers(res.data);
  //   //   })
  //   //   .catch(e => {
  //   //     console.warn('GetUserStories - ProfileInfo');
  //   //     console.log(e);
  //   //   });
  //   // getPersonHidden().then(() => {
  //   //   if (hiddenPersons === null) {
  //   //     setHiddenPersons([]);
  //   //   }
  //   // });
  // }, []);

  function limitNicknameLength(nickname: string, maxLength: number) {
    if (nickname.length > maxLength) {
      return nickname.slice(0, maxLength) + '...';
    }
    return nickname;
  }

  return (
    <CartazContainer>
      <Title>Cartaz</Title>
      <StoryRow>
        <Container>
          <StoryButton
            hasStory={
              hasStory || storyUsers.find(userF => userF.userId === user.userId)
            }
            onPress={() => {
              viewStories(user.userId);
              setHasStory(false);
            }}>
            <UserImageStories url={user.profileImage} size={70} />
          </StoryButton>
          <AddButton
            onPress={() => {
              navigation.push('Camera', {
                nextGaleryRouteName: 'CreateStory',
                routeParams: { type: 'story' },
                galerytAsset: 'All',
              });
            }}>
            <Image
              style={{ width: 14, height: 14, tintColor: 'white' }}
              source={require('../../../../Assets/Icons/add.png')}
            />
          </AddButton>
          <UserNameContainer>
            <UserName>Você</UserName>
          </UserNameContainer>
        </Container>
        <FlatList
          horizontal
          data={friendsStories.filter(
            user => !hiddenPersons || !hiddenPersons.includes(user.userId),
          )}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item.userName + 'story' + index}
          renderItem={({ item, index }) => {
            if (item.userId !== user.userId) {
              return (
                <View key={index}>
                  <ProfilePictureContainer
                    onPress={() => {
                      viewStories(item.userId);
                    }}>
                    <UserImageStories url={item.profileImage} size={70} />
                  </ProfilePictureContainer>
                  <StoryText>
                    {limitNicknameLength(item.userNickname, 7)}
                  </StoryText>
                </View>
              );
            } else {
              return null;
            }
          }}
        />
      </StoryRow>
    </CartazContainer>
  );
}
