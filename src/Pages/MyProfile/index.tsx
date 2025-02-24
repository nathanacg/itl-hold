import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackRoutes, StackRoutes } from '../../Routes/StackTypes';

import mime from 'mime';
import { Icon } from 'react-native-elements';

import {
  ViewDestackScrowl,
  ViewDestackSquare,
  ViewDestackSquareText,
} from './styles';

import {
  SafeAreaViewContainer,
  Container,
} from '../../Components/elementsComponents';

import ProfileInfo from '../../Components/ProfileInfo';
import ProfileHeader from '../../Components/ProfileHeader';
import DestaksComponents from '../../Components/DestaksComponents';
import PostsProfileGroups from '../../Components/PostsProfileGroups';
import CategoriesFilterPublications from '../../Components/CategoriesFilterPublications';

import { getProfile } from '../../Service/Profile';
import { getHighlightsUser } from '../../Service/Destack';

import useUserProfile from '../../GlobalState/userProfile.zustand';
import useDestackInfoStore from '../../GlobalState/destacksInfo.zustand';

import { Highlights } from '../../Types/destack';

export default function MyProfile() {
  const navigation = useNavigation<StackRoutes>();
  const { user: userProfile, setUser } = useUserProfile();
  const route = useRoute<RouteProp<RootStackRoutes, 'MyProfileScreen'>>();

  const [destaks, setDestaks] = useState<Highlights[]>([]);
  const [filter, setFilter] = useState('');
  const {
    setVerificationDestack,
    setDestackId,
    setDestackName,
    setDestackImage,
  } = useDestackInfoStore();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const response = await getProfile();
      setUser(response.data);
    });

    return unsubscribe;
  }, [navigation, userProfile]);

  const callDestacks = () => {
    getHighlightsUser()
      .then(res => {
        setDestaks(res.data);
      })
      .catch(e => {
        console.warn('MyProfile -- GetDestacks');
        console.error(e);
      });
  };

  useEffect(() => {
    const getDestack = navigation.addListener('focus', () => {
      callDestacks();
    });
    return getDestack;
  }, []);

  useEffect(() => {
    callDestacks();
  }, []);

  return (
    <SafeAreaViewContainer>
      <Container showsVerticalScrollIndicator={false}>
        <ProfileHeader
          userImage={userProfile?.profileImage}
          title={`${userProfile?.userNickname}`}
          actionHeaderElement1={
            <TouchableOpacity onPress={() => navigation.push('ProfileMenu')}>
              <Icon type="feather" name="menu" color={'#081B74'} size={28} />
            </TouchableOpacity>
          }
        />
        {userProfile && (
          <ProfileInfo
            userProfile={userProfile}
            linkSite={userProfile?.site}
            profileImage={userProfile?.profileImage}
            ProfileName={userProfile.userName}
            userId={userProfile?.userId}
            userNickname={userProfile.userNickname}
          />
        )}

        {userProfile && (
          <>
            <ViewDestackSquare>
              <ViewDestackSquareText>Destaques</ViewDestackSquareText>
            </ViewDestackSquare>

            <ViewDestackScrowl>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <DestaksComponents
                  isCreate={false}
                  textTitle="Novo"
                  onPress={() => {
                    setVerificationDestack(true);
                    navigation.navigate('NewDestack', { IdDestack: 0 });
                  }}
                />
                {destaks.map(item => (
                  <DestaksComponents
                    key={'destack' + item.id}
                    source={item.coverUrl}
                    onPress={() => {
                      setDestackId(item.id);
                      setDestackName(item.title);
                      setDestackImage({
                        uri: item.coverUrl,
                        name: `${mime
                          .getType(item.coverUrl)
                          ?.split('/')
                          .pop()}`,
                        mime: '',
                      });
                      navigation.push('StoryDestackComponent', {
                        idProfile: userProfile.userId,
                        profileImage: userProfile.profileImage,
                      });
                    }}
                    textTitle={item.title}
                    isCreate={true}
                  />
                ))}
                <View style={{ width: 15 }} />
              </ScrollView>
            </ViewDestackScrowl>
          </>
        )}
        <CategoriesFilterPublications
          categories={[
            'Filme',
            'Série',
            'Livro',
            'Música',
            'Artigo',
            'Podcast',
          ]}
          textStyle={{ fontSize: 12 }}
          marginLeft={'20px'}
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

        <PostsProfileGroups userId={userProfile.userId} filter={filter} />
      </Container>
    </SafeAreaViewContainer>
  );
}
