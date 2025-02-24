/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { RootStackRoutes, StackRoutes } from '../../Routes/StackTypes';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import {
  FollowersContent,
  GoBackHeader,
  HeaderContainer,
  ProfilePhoto,
  UserName,
} from './style';

import SelectPageButtons from '../../Components/SelectFollowerPage';
import { SafeAreaViewContainer } from '../../Components/elementsComponents';

import useUserProfile from '../../GlobalState/userProfile.zustand';
import useScreenName from '../../GlobalState/screenFollowers.zustand';
import { Icon } from 'react-native-elements';
import { theme } from '../../Theme/theme';
import { Followers } from './Components/Followers';
import { Following } from './Components/Following';

export default function MyFollowers() {
  const navigation = useNavigation<StackRoutes>();
  const route = useRoute<RouteProp<RootStackRoutes, 'MyFollowersScreen'>>();

  useEffect(() => {
    console.log('route on MyFollowers', route.params);
  }, [route.params]);

  const { user: userProfile } = useUserProfile();

  const { screenName } = useScreenName();

  const [selectedPage, setSelectedPage] = useState(
    screenName !== '' ? screenName : 'Seguidores',
  );

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('blur', () => {
  //     //Put your Data loading function here instead of my loadData()
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  useEffect(() => {
    setSelectedPage(screenName);
  }, [screenName]);

  return (
    <>
      <SafeAreaViewContainer>
        <HeaderContainer>
          <GoBackHeader>
            <TouchableOpacity onPress={() => navigation.pop()}>
              <Icon
                name="chevron-small-left"
                type="entypo"
                color={theme.primarycolor}
                size={40}
              />
            </TouchableOpacity>
            <ProfilePhoto source={{ uri: userProfile.profileImage }} />
            <UserName>{userProfile.userNickname}</UserName>
          </GoBackHeader>
        </HeaderContainer>
        <FollowersContent>
          <SelectPageButtons
            button2="Seguindo"
            button1="Seguidores"
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            myFollowers
          />

          {selectedPage === 'Seguidores' && <Followers />}
          {selectedPage === 'Seguindo' && <Following />}
        </FollowersContent>
      </SafeAreaViewContainer>
    </>
  );
}
