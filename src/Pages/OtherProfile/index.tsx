import React, { useEffect, useState } from 'react';

import { Alert, Linking, TouchableOpacity, View } from 'react-native';

import {
  SafeAreaViewContainer,
  Container,
} from '../../Components/elementsComponents';

import { ContainerButtonOptionModal, TextDark, TextLight } from './style';

import ProfileHeader from '../../Components/ProfileHeader';
import ProfileInfo from '../../Components/ProfileInfo';
import DestacksProfile from '../../Components/DestacksProfile';
import CategoriesFilterPublications from '../../Components/CategoriesFilterPublications';

import BottomModal from '../../Components/BottomModal';
import UserProfileOptions from '../../Components/UserProfileOptions';

import { getOtherProfile, getVerfication } from '../../Service/Profile';
import useCreatePost from '../../GlobalState/createPost.zustand';

import { ProfileUser } from '../../Types/User';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackRoutes } from '../../Routes/StackTypes';
import PostsProfileGroups from '../../Components/PostsProfileGroups';

export default function OtherProfile() {
  const [visibleBottonModal, setvisibleBottonModal] = useState<boolean>(false);
  const route = useRoute<RouteProp<RootStackRoutes, 'OtherProfileScreen'>>();
  const [userOptions, setUserOptions] = useState(false);
  const [userRouteName, setUserRouteName] = useState<string | undefined>('');
  const [userProfile, setUserProfile] = useState<ProfileUser>();
  const [verified, setVerified] = useState<number>(0);
  const [filter, setFilter] = useState('');
  const { nickName } = route.params || {};
  // const { nickName } = useCreatePost();

  const fetchProfile = async () => {
    Linking.getInitialURL().then(res => {
      setUserRouteName(res?.split('/').pop());
    });
    try {
      if (userRouteName) {
        const response = await getOtherProfile(userRouteName);
        setUserProfile(response.data);
      } else if (nickName) {
        const response = await getOtherProfile(nickName);
        setUserProfile(response.data);
      }
    } catch (error) {
      console.error('Erro ao obter o perfil:', error);
    }
  };

  const makePhoneCall = () => {
    const numberPhone = userProfile?.userPhone.replace(' ', '');

    Linking.canOpenURL(`tel:${numberPhone}`)
      .then(supported => {
        if (!supported) {
          //  Alert.alert('Numero de telefone não esta disponivel');
        } else {
          return Linking.openURL(`tel:${numberPhone}`);
        }
      })
      .catch(err => console.log(err));
  };

  const sendEmail = () => {
    Linking.openURL(`mailto:${userProfile?.userEmail}`);
  };

  const getVerification = async () => {
    if (userProfile?.userId) {
      getVerfication(userProfile.userId)
        .then(response => {
          const verified = response.data.result[0].user_verified;
          setVerified(verified);
        })
        .catch(e => {
          //console.warn('GetVerfication - OtherProfile')
          console.log(e);
        });
    }
  };

  useEffect(() => {
    fetchProfile();
    getVerification();
  }, [nickName]);

  function limitTextLength(text: string, maxLength: number) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }
  // console.log('############################')
  return (
    <SafeAreaViewContainer>
      <UserProfileOptions
        setvisibleBottonModal={() => setUserOptions(!userOptions)}
        visibleBottonModal={userOptions}
        blockedUserId={userProfile?.userId}
      />
      <BottomModal
        visibleBottonModal={visibleBottonModal}
        setvisibleBottonModal={setvisibleBottonModal}
        title=""
        children={
          <View style={{ gap: 10 }}>
            <ContainerButtonOptionModal onPress={sendEmail}>
              <TextDark>E-mail</TextDark>
              <TextLight>{userProfile?.userEmail}</TextLight>
            </ContainerButtonOptionModal>
            <ContainerButtonOptionModal onPress={() => makePhoneCall()}>
              <TextDark>Telefone</TextDark>
              <TextLight>{userProfile?.userPhone}</TextLight>
            </ContainerButtonOptionModal>
          </View>
        }
      />

      <Container showsVerticalScrollIndicator={false}>
        <ProfileHeader
          verified={verified === 1 ? true : false}
          userImage={userProfile?.profileImage}
          title={userProfile?.userNickname}
          actionHeaderElement1={
            <TouchableOpacity onPress={() => setUserOptions(true)}>
              <SimpleLineIcons
                name="options-vertical"
                color={'#0245F4'}
                size={20}
              />
            </TouchableOpacity>
          }
        />
        {userProfile && (
          <ProfileInfo
            userProfile={userProfile}
            private_account={userProfile.private_account}
            userNickname={userProfile.userNickname}
            userId={userProfile?.userId}
            profileImage={userProfile?.profileImage}
            ProfileName={userProfile?.userName}
            linkSite={userProfile.site}
            otherProfile
            oppenBottonModal={() => setvisibleBottonModal(!visibleBottonModal)}
          />
        )}

        {/*  <DestacksProfile destacks={[]} userId={userProfile?.userId} /> */}
        {userProfile?.private_account != 1 && (
          <CategoriesFilterPublications
            categories={[
              'Filme',
              'Série',
              'Livro',
              'Música',
              'Artigo',
              'Podcast',
            ]}
            textStyle={{ fontSize: 11 }}
            marginLeft={'25px'}
            marginTop={'8px'}
            styleCategoryContent={{
              marginTop: 10,
              marginRight: 8,
              minWidth: 100,
              paddingHorizontal: 6,
              paddingBottom: 2,
              paddingTop: 2,
            }}
            onPressCategoryButton={setFilter}
          />
        )}

        {userProfile?.userId && (
          <PostsProfileGroups
            private_account={userProfile?.private_account}
            userId={userProfile.userId}
            filter={filter}
          />
        )}
      </Container>
    </SafeAreaViewContainer>
  );
}
